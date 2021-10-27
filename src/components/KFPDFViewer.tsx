import {
  FC,
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react';
import {
  Document,
} from 'react-pdf';

import type {DropzoneRef} from 'react-dropzone';

import {
  getPdfTexts,
  outlineNodeToPageNumber,
} from '../pdf';
import type {
  PDFDocumentProxy,
  OutlineNode,
} from '../pdf';

import {FixedSizeList as List} from 'react-window';

import {CommandPaletteContext, } from './CommandPaletteContext';
import {OutlineSelectorContext, } from './OutlineSelectorContext';
import {InputBoxContext, } from './InputBoxContext';

import {DropFileArea} from './DropFileArea';
import {LandingPage} from './LandingPage';

import {SideBar} from './SideBar';
import {PageRenderer} from './PageRenderer';
import type {PageRendererDataType} from './PageRenderer';

import {defaultKeybindings} from '../keybindings';
import type {Keybindings} from '../keybindings';

import {useKeybindings} from '../hooks/use-keybindings';
import {useRepeatCommand} from '../hooks/use-repeat-command';

import {
  startScroll,
  stopScroll,
} from '../scroll';

import {
  CommandCallback,
  CommandCallbacks,
  COMMANDS,
  commandToTitle,
} from '../commands';
import type {
  AllCommandList,
  FullScreenCommand,
} from '../commands';

import {isDev} from '../env';

interface KFPDFViewerProps {
  fullScreenCommandCallbacks: Record<FullScreenCommand, CommandCallback>;
  height: number;
  width: number;
  paddingSize?: number;
  scrollStep?: number;
  scrollHalfPageStep?: number;
  scaleMax?: number;
  scaleMin?: number;
  scaleStep?: number;
  invertColorRateStep?: number;
  histroyMaxSize?: number;
};

const KFPDFViewer: FC<KFPDFViewerProps> = ({
  fullScreenCommandCallbacks,
  height,
  width,
  paddingSize = 5,
  scrollStep = 25,
  scrollHalfPageStep = 60,
  scaleMax = 4,
  scaleMin = 0.1,
  scaleStep = 0.1,
  invertColorRateStep = 0.05,
  histroyMaxSize = 999,
}) => {

  // state
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [outline, setOutline] = useState<OutlineNode[] | null>(null);

  const [keybindings] = useState<Keybindings>(defaultKeybindings);
  const [url, setUrl] = useState(isDev ? 'test.pdf' : '');
  const [numPages, setNumPages] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);

  const [pageWidthRaw, setPageWidthRaw] = useState(500);
  const [pageHeightRaw, setPageHeightRaw] = useState(1000);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isColorInverted, setIsColorInverted] = useState(false);
  const [invertColorRate, setInvertColorRate] = useState(1);
  const [showInfo, setShowInfo] = useState(isDev);

  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);

  const [keyword, setKeyword] = useState('');
  const [isKeywordHighlighted, setIsKeywordHighlighted] = useState(true);
  const [pdfTexts, setPdfTexts] = useState<string[]>([]);
  const [keywordHitPages, setKeywordHitPages] = useState<Set<number>>(new Set([]));

  const [pageHistory, setPageHistory] = useState<number[]>([]);
  const [pageHistoryIndex, setPageHistoryIndex] = useState<number>(-1);

  const pushPageHistory = (pageNumber: number) => {
    setPageHistory([...pageHistory.slice(0, pageHistoryIndex + 1), pageNumber].slice(-histroyMaxSize));
    setPageHistoryIndex(pageHistoryIndex + 1);
  };

  // ref
  const listRef = useRef<List | null>(null);
  // NOTE: use outer element of <List> for scrolling.
  // call `Element.scrollBy` method for scrolling
  const listOuterRef = useRef<HTMLDivElement | null>(null);

  const startListOuterScroll = (offset: {top: number} | {left: number}) => {
    if (listOuterRef.current) {
      startScroll(listOuterRef.current, offset);
      setIsScrolling(true);
    }
  };

  const docRef = useRef<any | null>(null);
  const commandCallbacksRef = useRef<CommandCallbacks | null>(null);
  const dropzoneRef = useRef<DropzoneRef | null>(null);

  // context
  const commandPalette = useContext(CommandPaletteContext);
  const outlineSelector = useContext(OutlineSelectorContext);
  const inputBox = useContext(InputBoxContext);
  const isModalOpen = [commandPalette, outlineSelector, inputBox].some((mdl) => mdl.isOpen);

  // custom hooks

  const [repeatCount, resetRepeatCount] = useRepeatCommand();
  const repeatCount1 = Math.max(repeatCount, 1);

  const pageHeight = ((rotate / 90) % 2 === 0) ? pageHeightRaw * scale : pageWidthRaw * scale;
  const pageWidth = ((rotate / 90) % 2 === 0) ? pageWidthRaw * scale : pageHeightRaw * scale;
  const itemSize = pageHeight + paddingSize;

  const onDocumentLoadSuccess = (pdf: PDFDocumentProxy) => {
    setPdf(pdf);
    setNumPages(pdf.numPages);

    setPageHistory([1]);
    setPageHistoryIndex(0);

    (async () => {
      // TODO: consider variable page size.
      const page = await pdf.getPage(1);
      const [x1, y1, x2, y2] = page.view;
      setPageWidthRaw(x2 - x1);
      setPageHeightRaw(y2 - y1);
      setPdfTexts(await getPdfTexts(pdf));
    })();
  };

  const goToOutline = async ({
    outline, recursive,
  }: {outline: OutlineNode[] | null, recursive: boolean}) => {
    if (!pdf || !outline || isModalOpen) return;
    const result = await outlineSelector.showQuickPick(
      outline.map((outlineNode) => ({
        name: outlineNode.title,
        content: outlineNode
      }))
    );
    if (!result) return;
    if (recursive && result.content.items?.length) {
      goToOutline({outline: result.content.items, recursive: true});
    } else {
      const targetPageNumber = await outlineNodeToPageNumber({
        pdf, outlineNode: result.content
      });
      jumpPage(targetPageNumber);
    }
  };

  const search = async () => {
    if (!pdf || isModalOpen || pdfTexts.length === 0) return;
    const newKeyword = await inputBox.showInputBox({
      prompt: 'input word to search'
    });
    if (newKeyword) {
      const hittedPages = pdfTexts
        .map((text, idx) => text.includes(keyword) ? idx + 1 : -1)
        .filter((i) => i > 0);

      if (hittedPages.length > 0) {
        setKeyword(keyword);
        setKeywordHitPages(new Set(hittedPages));
      } else {
        alert(`can not find keyword: ${keyword}`);
      }
    }
  };

  const searchNext = async (direction: 'forward' | 'backward') => {
    const step = {forward: 1, backward: -1}[direction];
    let tmpPageNumber = currentPageNumber + step;
    while (
      1 <= tmpPageNumber && tmpPageNumber <= numPages
      && !keywordHitPages.has(tmpPageNumber)) {
      tmpPageNumber += step;
    }
    if (tmpPageNumber < 1 || tmpPageNumber > numPages) {
      alert('can not find next search result');
    } else {
      jumpPage(tmpPageNumber);
    }
  };

  useEffect(() => {
    const keyupHandler = () => {
      stopScroll();
      setIsScrolling(false);
    };
    document.addEventListener('keyup', keyupHandler);
    return () => {
      document.removeEventListener('keyup', keyupHandler);
    };
  }, [setIsScrolling]);

  const currentPageNumber = Math.floor((scrollOffset + height / 2) / itemSize) + 1;

  const jumpPage = (targetPageNumber: number, options?: {
    isPushHistory?: boolean
  }) => {
    const {
      isPushHistory = true,
    } = options ?? {};
    if (!Number.isInteger(targetPageNumber)) return;

    if (targetPageNumber < 0) {
      // -1 -> numPages
      targetPageNumber += numPages + 1;
    }
    targetPageNumber = Math.max(1, Math.min(numPages, targetPageNumber));

    if (isPushHistory) {
      pushPageHistory(targetPageNumber);
    }
    listRef.current?.scrollToItem(targetPageNumber - 1);
  };

  const setScaleAndScroll = (newScale: number) => {
    listRef.current?.scrollTo(scrollOffset * newScale / scale);
    setScale(newScale);
  };

  const scrollMax = numPages * itemSize + paddingSize - height;

  const notImplemented = () => alert('sorry not implemented yet');

  const commandCallbacks: CommandCallbacks = {
    doNothing: () => {},

    ...fullScreenCommandCallbacks,

    showInfoOn: () => setShowInfo(true),
    showInfoOff: () => setShowInfo(false),
    showInfoToggle: () => setShowInfo(!showInfo),

    prevPage: () => listRef.current?.scrollTo(Math.max(0, scrollOffset - repeatCount1 * itemSize))
    ,
    nextPage: () => listRef.current?.scrollTo(Math.min(scrollMax, scrollOffset + repeatCount1 * itemSize)),
    firstPage: () => jumpPage(repeatCount1),
    lastPage: () => jumpPage(repeatCount >= 1 ? repeatCount : -1),
    goToPage: async () => {
      if (isModalOpen) return;
      jumpPage(Number(await inputBox.showInputBox({
        prompt: 'input page number to go',
      })));
    },

    zoomReset: () => setScaleAndScroll(1),
    zoomIn: () => setScaleAndScroll(Math.min(scale + repeatCount1 * scaleStep, scaleMax)),
    zoomOut: () => setScaleAndScroll(Math.max(scale - repeatCount1 * scaleStep, scaleMin)),
    zoomFitWidth: () => setScaleAndScroll(width / (pageWidth / scale)),
    zoomFitHeight: () => setScaleAndScroll(height / (pageHeight / scale)),

    scrollLeft: () => startListOuterScroll({left: repeatCount1 * -scrollStep}),
    scrollRight: () => startListOuterScroll({left: repeatCount1 * scrollStep}),
    scrollUp: () => startListOuterScroll({top: repeatCount1 * -scrollStep}),
    scrollDown: () => startListOuterScroll({top: repeatCount1 * scrollStep}),
    scrollHalfPageUp: () => startListOuterScroll({top: repeatCount1 * -scrollHalfPageStep}),
    scrollHalfPageDown: () => startListOuterScroll({top: repeatCount1 * scrollHalfPageStep}),
    scrollTop: () => listRef.current?.scrollTo(paddingSize + itemSize * (currentPageNumber - 1)),
    scrollBottom: () => listRef.current?.scrollTo(paddingSize - height + itemSize * currentPageNumber),

    scrollReset: notImplemented,

    rotateRight: () => setRotate((rotate + 90) % 360),
    rotateLeft: () => setRotate((rotate + 360 - 90) % 360),

    colorInvert: () => setIsColorInverted(!isColorInverted),
    invertColorRateUp: () => setInvertColorRate(Math.min(invertColorRate + repeatCount1 * invertColorRateStep, 1)),
    invertColorRateDown: () => setInvertColorRate(Math.max(invertColorRate - repeatCount1 * invertColorRateStep, 0)),

    search,
    searchNext: () => searchNext('forward'),
    searchPrev: () => searchNext('backward'),
    pickSearchList: notImplemented,
    highlightToggle: () => setIsKeywordHighlighted(!isKeywordHighlighted),

    goToOutline: () => goToOutline({outline, recursive: false}),
    goToOutlineRecursive: () => goToOutline({outline, recursive: true}),

    sidebarToggle: () => setIsSidebarOpen(!isSidebarOpen),

    forwardPageHistory: () => {
      if (pageHistory.length > 0 && pageHistoryIndex + 1 < pageHistory.length) {
        setPageHistoryIndex(pageHistoryIndex + 1);
        jumpPage(pageHistory[pageHistoryIndex + 1], {
          isPushHistory: false,
        });
      }
    },
    backwardPageHistory: () => {
      if (pageHistory.length > 0 && pageHistoryIndex - 1 >= 0) {
        setPageHistoryIndex(pageHistoryIndex - 1);
        jumpPage(pageHistory[pageHistoryIndex - 1], {
          isPushHistory: false,
        });
      }
    },

    commandPaletteOpen: async () => {
      if (isModalOpen) return;
      const items = COMMANDS.map((command) => ({
        name: commandToTitle(command),
        command,
        keys: keybindings[command],
      }));

      const item = await commandPalette.showQuickPick(items);
      if (item?.command) {
        commandCallbacksRef.current?.[item.command]?.();
      }
    },

    fileOpen: () => dropzoneRef?.current?.open(),
  };

  commandCallbacksRef.current = commandCallbacks;
  useKeybindings<AllCommandList>({
    keybindings, commandCallbacks, commands: COMMANDS,
    onAfterCommand: resetRepeatCount,
    enabled: !isModalOpen,
  });

  const itemData: PageRendererDataType = {
    scale,
    rotate,
    isKeywordHighlighted,
    keyword,
    paddingSize,
    isScrolling,
    pageWidth,
  };

  if (!url) {
    return (
      <DropFileArea
        onDropFile={(file: File) => setUrl(URL.createObjectURL(file))}
        dropzoneRef={dropzoneRef}
      >
        <LandingPage
          keybindings={keybindings}
        />
      </DropFileArea>
    );
  }
  return (
    <DropFileArea
      onDropFile={(file: File) => setUrl(URL.createObjectURL(file))}
      dropzoneRef={dropzoneRef}
    >
      <div
        style={{
          background: 'gray',
          filter: isColorInverted ? `invert(${invertColorRate})` : '',
        }}
      >
        <Document
          inputRef={docRef}
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          options={{
            cMapUrl: 'cmaps/',
            cMapPacked: true,
          }}
          loading={<div>loading...</div>}
          onItemClick={({pageNumber}) => {jumpPage(Number(pageNumber))}}
        >
          <SideBar
            onItemClick={({pageNumber}) => {jumpPage(Number(pageNumber))}}
            onLoadSuccess={(outline: OutlineNode[]) => {setOutline(outline)}}
            isOpen={isSidebarOpen}
          />
          <List
            height={height}
            itemCount={numPages}
            itemSize={itemSize}
            width={width}
            overscanCount={2}
            itemData={itemData}
            onScroll={({scrollOffset}) => setScrollOffset(scrollOffset)}
            ref={listRef}
            outerRef={listOuterRef}
          >
            {PageRenderer}
          </List>
        </Document>
        {
          showInfo
          &&
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            <pre><code>
              state = {
                JSON.stringify({
                  url,
                  height,
                  width,
                  page: `${currentPageNumber}/${numPages}`,
                  scale,
                  pageWidthRaw,
                  pageHeightRaw,
                  pageHeight,
                  isSidebarOpen,
                  pdfLoaded: pdf !== null,
                  scrollOffset,
                  isColorInverted,
                  invertColorRate,
                  rotate,
                  repeatCount,
                  isModalOpen,
                  pageHistoryIndex,
                  pageHistory: JSON.stringify(pageHistory),
                }, null, '  ')
              }
            </code></pre>
          </div>
        }
      </div>
    </DropFileArea>
  );
}

export {
  KFPDFViewer
};
