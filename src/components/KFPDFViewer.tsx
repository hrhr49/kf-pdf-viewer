import React, {FC, useState, useEffect, useContext, useRef, useCallback} from 'react';
import {
  // pdfjs,
  Document,
  Page,
  Outline,
} from 'react-pdf';

import {
  outlineNodeToPageNumber,
} from '../pdf';

import type {
  PDFDocumentProxy,
  OutlineNode,
} from '../pdf';

import {FixedSizeList as List} from 'react-window';

import { CommandPaletteContext, } from './CommandPaletteContext';
import { OutlineSelectorContext, } from './OutlineSelectorContext';
import { InputBoxContext, } from './InputBoxContext';

import {DropFileArea} from './DropFileArea';
import {LandingPage} from './LandingPage';

import {SideBar} from './SideBar';

import type { Keybindings, } from '../keybindings';

import {useKeybindings} from '../hooks/use-keybindings';
import {useFlag} from '../hooks/use-flag';
import {useClipedValue} from '../hooks/use-cliped-value';
import {useCyclicValue} from '../hooks/use-cyclic-value';

import {
  CommandCallbacks,
  COMMANDS,
  commandToTitle,
} from '../commands';
import type { AllCommandList, } from '../commands';

import {
  ipcRendererApi,
  unwrapIpcResult,
  canUseIpcApi,
} from '../ipc-renderer';

import { isDev } from '../env';

interface KFPDFViewerProps {
  keybindings: Keybindings;
  fullScreenOn: () => void;
  fullScreenOff: () => void;
  fullScreenToggle: () => void;
  height: number;
  width: number;
};

// TODO: to customizable
const PADDING_SIZE = 5;

const PageRenderer = ({index, style, data}: any) => {
  // console.log({data});
  const {
    scale,
    rotate,
  } = data;

  return (
    <div style={{
      ...style,
      top: `${parseFloat(style.top) + PADDING_SIZE}px`,
    }}
    >
      <Page
        pageNumber={index + 1}
        scale={scale}
        rotate={rotate}
      />
    </div>
  );
};

const KFPDFViewer: FC<KFPDFViewerProps> = ({
  keybindings,
  fullScreenOn,
  fullScreenOff,
  fullScreenToggle,
  height,
  width,
}) => {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [outline, setOutline] = useState<OutlineNode[] | null>(null);
  const [url, setUrl] = useState('test.pdf');
  const [numPages, setNumPages] = useState(0);
  // const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [rotate, {
    next: rotateRight,
    prev: rotateLeft,
  }] = useCyclicValue(0, 90, 180, 270);

  // not scaled width
  const [pageWidthRaw, setPageWidthRaw] = useState(500);
  const [pageHeightRaw, setPageHeightRaw] = useState(1000);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isColorInverted, {
    toggle: colorInvert,
  }] = useFlag(false);

  const [invertColorRate, {
    up: invertColorRateUp,
    down: invertColorRateDown,
  }] = useClipedValue(1, {min: 0.05, max: 1, step: 0.05});

  const [scale, {
    up: zoomIn,
    down: zoomOut,
    default: zoomReset,
    set: zoomSet,
  }] = useClipedValue(1, {min: 0.1, max: 4, step: 0.1});

  // const pageWidth = pageWidthRaw * scale;
  const pageHeight = ((rotate / 90) % 2 === 0) ? pageHeightRaw * scale : pageWidthRaw * scale;
  const pageWidth = ((rotate / 90) % 2 === 0) ? pageWidthRaw * scale : pageHeightRaw * scale;

  const [isSidebarOpen, {
    toggle: sidebarToggle,
  }] = useFlag(false);

  const listRef = useRef<List | null>(null);
  const docRef = useRef<any | null>(null);

  const commandCallbacksRef = useRef<CommandCallbacks | null>(null);

  const onDocumentLoadSuccess = (pdf: PDFDocumentProxy) => {
    console.log('loaded pdf successfully');
    console.log({pdf});

    setPdf(pdf);
    setNumPages(pdf.numPages);

    (async () => {
      // TODO: consider variable page size.
      const page = await pdf.getPage(1);
      // const pageWidthRaw = page.view[2];
      // const pageHeightRaw = page.view[3];
      const [x1, y1, x2, y2] = page.view;
      const pageWidthRaw = x2 - x1;
      const pageHeightRaw = y2 - y1;
      console.log({page});
      // const pageWidthRaw = page.view[2];
      // const pageHeightRaw = page.view[3];
      setPageWidthRaw(pageWidthRaw);
      setPageHeightRaw(pageHeightRaw);
    })();
  };

  const onOutlineLoadSuccess = (outline: OutlineNode[]) => {
    console.log('loaded outline successfully');
    console.log({outline});

    setOutline(outline);
  };

  useEffect(() => {
    (async () => {
      if (!canUseIpcApi()) return;
      try {
        const fileData = unwrapIpcResult(await ipcRendererApi.inputFileData());
        if (fileData) {
          const {
            data,
            mime,
          } = fileData;
          const blob = new Blob([data.buffer], {type: mime});
          const newUrl = URL.createObjectURL(blob);
          setUrl(newUrl);
        }
      } catch (e) {
        console.log(e);
        alert(e);
      }
    })();
  }, []);

  const [
    showInfo,
    {
      on: showInfoOn,
      off: showInfoOff,
      toggle: showInfoToggle,
    }
  ] = useFlag(isDev);

  const commandPalette = useContext(CommandPaletteContext);
  const outlineSelector = useContext(OutlineSelectorContext);
  const inputBox = useContext(InputBoxContext);

  const isModalOpen = (
    commandPalette.isOpen
    || outlineSelector.isOpen
    || inputBox.isOpen
  );

  const loadUrl = useCallback((newUrl: string) => {
    setUrl(newUrl);
  }, []);

  const onDropFile = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    // console.log({url});
    loadUrl(url);
  }, [loadUrl]);

  const jumpPage = useCallback((targetPageNumber: number) => {
    if (!Number.isInteger(targetPageNumber)) return;

    if (targetPageNumber < 0) {
      // -1 -> numPages
      targetPageNumber += numPages + 1;
    }
    targetPageNumber = Math.max(1, Math.min(numPages, targetPageNumber));
    listRef.current?.scrollToItem(targetPageNumber - 1);
  }, [numPages]);

  const firstPage = useCallback(() => {
    jumpPage(1);
  }, [jumpPage]);

  const lastPage = useCallback(() => {
    jumpPage(-1);
  }, [jumpPage]);

  const goToPage = async () => {
    if (isModalOpen) return;
    const targetPageNumberStr = await inputBox.showInputBox({
      prompt: 'input page number to go',
    });
    try {
      const targetPageNumber = Number(targetPageNumberStr);
      jumpPage(targetPageNumber);
    } catch (e) {
      // do noting if input is invalid.
    }
  };

  const goToOutline = async () => {
    if (!pdf || !outline) return;
    if (isModalOpen) return;

    const result = await outlineSelector.showQuickPick(
      outline
        .map((outlineNode) => ({name: outlineNode.title, content: outlineNode})),
      {});
    if (!result) return;

    const targetPageNumber = await outlineNodeToPageNumber({
      pdf,
      outlineNode: result.content
    });
    jumpPage(targetPageNumber);
  };

  const goToOutlineRecursive = async () => {
    if (!pdf || !outline) return;
    if (isModalOpen) return;

    let outlineNode: OutlineNode | null = null;
    let items: OutlineNode[] = outline;

    // while outline has 'items', select item recursively.
    while (items?.length) {
      const result = await outlineSelector.showQuickPick(
        items
          .map((outlineNode) => ({name: outlineNode.title, content: outlineNode})),
        {});
      if (!result) return;

      outlineNode = result.content;
      items = outlineNode.items;
    }

    if (!outlineNode) return;

    const targetPageNumber = await outlineNodeToPageNumber({
      pdf,
      outlineNode,
    });
    jumpPage(targetPageNumber);
  };

  // const scrollLeft = () => {
  //   // TODO
  // }
  // const scrollRight = () => {
  //   // TODO
  // }

  const scrollUp = useCallback(() => {
    listRef.current?.scrollTo(scrollOffset - 30);
  }, [scrollOffset]);

  const scrollDown = useCallback(() => {
    listRef.current?.scrollTo(scrollOffset + 30);
  }, [scrollOffset]);

  const scrollHalfPageUp = useCallback(() => {
    // docRef.current?.scrollBy?.(0, -30);
    listRef.current?.scrollTo(scrollOffset - (pageHeight + PADDING_SIZE) / 2);
  }, [scrollOffset, pageHeight]);

  const scrollHalfPageDown = useCallback(() => {
    // docRef.current?.scrollBy?.(0, 30);
    listRef.current?.scrollTo(scrollOffset + (pageHeight + PADDING_SIZE) / 2);
  }, [scrollOffset, pageHeight]);

  const calcCurrentPageNumber = useCallback((): number => {
    return Math.floor((scrollOffset + height / 2) / (pageHeight + PADDING_SIZE)) + 1;
  }, [scrollOffset, height, pageHeight]);

  const scrollTop = useCallback(() => {
    const pageNumber = calcCurrentPageNumber();
    listRef.current?.scrollTo(PADDING_SIZE + (pageHeight + PADDING_SIZE) * (pageNumber - 1));
  }, [calcCurrentPageNumber, pageHeight]);

  const scrollBottom = useCallback(() => {
    const pageNumber = calcCurrentPageNumber();
    listRef.current?.scrollTo(PADDING_SIZE - height + (pageHeight + PADDING_SIZE) * pageNumber);
  }, [calcCurrentPageNumber, height, pageHeight]);

  const nextPage = useCallback(() => {
    listRef.current?.scrollTo(scrollOffset + (pageHeight + PADDING_SIZE));
  }, [scrollOffset, pageHeight]);

  const prevPage = useCallback(() => {
    listRef.current?.scrollTo(scrollOffset - (pageHeight + PADDING_SIZE));
  }, [scrollOffset, pageHeight]);

  const fitWidth = useCallback(() => {
    zoomSet(width / (pageWidth / scale));
  }, [zoomSet, width, pageWidth, scale]);

  const fitHeight = useCallback(() => {
    zoomSet(height / (pageHeight / scale));
  }, [zoomSet, height, pageHeight, scale]);

  const doNothing = useCallback(() => {
  }, []);

  const notImplemented = useCallback(() => {
    alert('sorry not implemented yet');
  }, []);

  const onScroll = useCallback(({scrollOffset}: {scrollOffset: number}) => {
    setScrollOffset(scrollOffset);
  }, []);

  const commandCallbacks: CommandCallbacks = {
    doNothing,

    fullScreenOn,
    fullScreenOff,
    fullScreenToggle,

    showInfoOn,
    showInfoOff,
    showInfoToggle,

    prevPage,
    nextPage,
    firstPage,
    lastPage,
    goToPage,

    zoomReset,

    zoomIn,
    zoomOut,

    fitWidth,
    fitHeight,
    scrollLeft: notImplemented,
    scrollRight: notImplemented,
    scrollUp,
    scrollDown,
    scrollHalfPageDown,
    scrollHalfPageUp,
    scrollTop,
    scrollBottom,
    scrollReset: notImplemented,
    rotateRight,
    rotateLeft,

    colorInvert,
    invertColorRateUp,
    invertColorRateDown,

    highlightToggle: notImplemented,
    sidebarToggle,

    goToOutline,
    goToOutlineRecursive,

    search: notImplemented,
    pickSearchList: notImplemented,
    forwardPageHistory: notImplemented,
    backwardPageHistory: notImplemented,

    commandPaletteOpen: async () => {
      if (inputBox.isOpen || commandPalette.isOpen) {
        return;
      }
      const items = COMMANDS.map((command) => {
        return {
          name: commandToTitle(command),
          command,
          keys: keybindings[command],
        };
      });
      const item = await commandPalette.showQuickPick(items);
      if (item !== null && item.command) {
        const command = item.command;
        commandCallbacksRef.current?.[command]?.();
      }
      // commandPaletteOpen({commandCallbacks}),
    },
    loadUrl: async () => {
      if (inputBox.isOpen || commandPalette.isOpen) {
        return;
      }
      const newUrl = await inputBox.showInputBox({
        prompt: 'input URL to laod',
      });

      if (newUrl) {
        loadUrl(newUrl);
      }
    },
  };

  commandCallbacksRef.current = commandCallbacks;
  useKeybindings<AllCommandList>({
    keybindings, commandCallbacks, commands: COMMANDS
  });

  if (!url) {
    return (
      <DropFileArea
        onDropFile={onDropFile}
      >
        <LandingPage
          keybindings={keybindings}
        />
      </DropFileArea>
    );
  }
  return (
    <DropFileArea
      onDropFile={onDropFile}
    >
      <div
        ref={docRef}
        style={{
          background: 'gray',
          filter: isColorInverted ? `invert(${invertColorRate})` : '',
        }}
      >
        <Document
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
              onLoadSuccess={onOutlineLoadSuccess}
              isOpen={isSidebarOpen}
          />
          <List
            height={height}
            itemCount={numPages}
            itemSize={pageHeight + PADDING_SIZE}
            width={width}
            overscanCount={2}
            itemData={{
              scale,
              rotate,
            }}
            ref={listRef}
            onScroll={onScroll}
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
                  numPages,
                  scale,
                  pageWidthRaw,
                  pageHeightRaw,
                  pageHeight,
                  isSidebarOpen,
                  pdfLoaded: pdf !== null,
                  outlineLoaded: outline !== null,
                  outlineLength: outline?.length,
                  scrollOffset,
                  isColorInverted,
                  invertColorRate,
                  rotate,
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
