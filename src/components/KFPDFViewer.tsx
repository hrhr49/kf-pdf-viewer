// import {throttle} from 'throttle-debounce';
import {FC, useState, useContext, useRef, useCallback} from 'react';
import {
  Document,
} from 'react-pdf';

import type {
  PDFDocumentProxy,
} from '../pdf';

import {FixedSizeList as List} from 'react-window';

import { CommandPaletteContext, } from './CommandPaletteContext';
import { OutlineSelectorContext, } from './OutlineSelectorContext';
import { InputBoxContext, } from './InputBoxContext';

import {DropFileArea} from './DropFileArea';
import {LandingPage} from './LandingPage';

import {SideBar} from './SideBar';
import {PageRenderer} from './PageRenderer';
import type {PageRendererDataType} from './PageRenderer';

import { defaultKeybindings } from '../keybindings';
import type { Keybindings } from '../keybindings';

import {useKeybindings} from '../hooks/use-keybindings';
import {useFlag} from '../hooks/use-flag';
import {useRepeatCommand} from '../hooks/use-repeat-command';

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

import { isDev } from '../env';

import {useColorCommand} from '../hooks/sub-command/use-color';
import {useRotateCommand} from '../hooks/sub-command/use-rotate';
import {useZoomCommand} from '../hooks/sub-command/use-zoom';
import {useShowInfoCommand} from '../hooks/sub-command/use-show-info';
import {usePageCommand} from '../hooks/sub-command/use-page';
import {useScrollCommand} from '../hooks/sub-command/use-scroll';
import {useSearchCommand} from '../hooks/sub-command/use-search';
import {useOutlineCommand} from '../hooks/sub-command/use-outline';
import {useIpcApi} from '../hooks/use-ipc-api';

interface KFPDFViewerProps {
  fullScreenCommandCallbacks: Record<FullScreenCommand, CommandCallback>;
  height: number;
  width: number;
  paddingSize?: number;
  scrollStep?: number;
  scrollHalPageStep?: number;
};

const KFPDFViewer: FC<KFPDFViewerProps> = ({
  fullScreenCommandCallbacks,
  height,
  width,
  paddingSize = 5,
  scrollStep = 25,
  scrollHalPageStep = 60,
}) => {

  // state
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [keybindings, setKeybindings] = useState<Keybindings>(defaultKeybindings);
  const [url, setUrl] = useState(isDev ? 'test.pdf' : '');
  const [numPages, setNumPages] = useState(0);
  const [rotate, rotateCommandCallbacks] = useRotateCommand();
  const [pageWidthRaw, setPageWidthRaw] = useState(500);
  const [pageHeightRaw, setPageHeightRaw] = useState(1000);

  // ref
  const listRef = useRef<List | null>(null);
  // NOTE: use outer element of <List> for scrolling.
  // call `Element.scrollBy` method for scrolling
  const listOuterRef = useRef<HTMLDivElement | null>(null);
  const docRef = useRef<any | null>(null);
  const commandCallbacksRef = useRef<CommandCallbacks | null>(null);

  // context
  const commandPalette = useContext(CommandPaletteContext);
  const outlineSelector = useContext(OutlineSelectorContext);
  const inputBox = useContext(InputBoxContext);

  // custom hooks
  const [isSidebarOpen, {
    toggle: sidebarToggle,
  }] = useFlag(false);

  const [repeatCount, resetRepeatCount] = useRepeatCommand();

  const [
    {isColorInverted, invertColorRate},
    colorCommandCallbacks,
  ] = useColorCommand({repeatCount});

  const [
    {scale, /* pageWidth, */ pageHeight},
    zoomCommandCallbacks,
  ] = useZoomCommand({repeatCount, width, height, pageWidthRaw, pageHeightRaw, rotate});
  useIpcApi({setUrl, setKeybindings});

  const [
    showInfo,
    showInfoCommandCallbacks,
  ] = useShowInfoCommand(isDev);


  const onDocumentLoadSuccess = (pdf: PDFDocumentProxy) => {
    setPdf(pdf);
    setNumPages(pdf.numPages);

    (async () => {
      // TODO: consider variable page size.
      const page = await pdf.getPage(1);
      const [x1, y1, x2, y2] = page.view;
      const pageWidthRaw = x2 - x1;
      const pageHeightRaw = y2 - y1;
      setPageWidthRaw(pageWidthRaw);
      setPageHeightRaw(pageHeightRaw);
    })();
  };

  const isModalOpen = (
    commandPalette.isOpen
    || outlineSelector.isOpen
    || inputBox.isOpen
  );

  const onDropFile = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setUrl(url);
  }, []);

  const [
    {
      isScrolling,
      scrollOffset,
      currentPageNumber,
    },
    scrollCommandCallbacks,
    {onScroll}
  ] = useScrollCommand({
    repeatCount,
    list: listRef.current,
    listOuterDiv: listOuterRef.current,
    scrollStep,
    scrollHalPageStep,
    paddingSize,
    pageHeight,
    height,
  });

  const [
    _,
    pageCommandCallbacks,
    {jumpPage},
  ] = usePageCommand({
    repeatCount,
    list: listRef.current, pageHeight, height,
    paddingSize, scrollOffset,
    numPages, isModalOpen, inputBox,
  });

  const [
    {keyword, isKeywordHighlighted},
    searchCommandCallbacks,
  ] = useSearchCommand({
    pdf,
    isModalOpen,
    inputBox,
    currentPageNumber,
    numPages,
    jumpPage,
  });

  const [
    _dummy,
    outlineCommandCallbacks,
    {onOutlineLoadSuccess},
  ] = useOutlineCommand({
    pdf,
    isModalOpen,
    jumpPage,
    outlineSelector,
  });

  const doNothing = useCallback(() => {
  }, []);

  const notImplemented = useCallback(() => {
    alert('sorry not implemented yet');
  }, []);

  const commandCallbacks: CommandCallbacks = {
    doNothing,

    ...fullScreenCommandCallbacks,
    ...showInfoCommandCallbacks,
    ...pageCommandCallbacks,
    ...zoomCommandCallbacks,
    ...scrollCommandCallbacks,
    ...rotateCommandCallbacks,
    ...colorCommandCallbacks,
    ...searchCommandCallbacks,
    ...outlineCommandCallbacks,

    sidebarToggle,

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
    },
  };

  commandCallbacksRef.current = commandCallbacks;
  useKeybindings<AllCommandList>({
    keybindings, commandCallbacks, commands: COMMANDS,
    onAfterCommand: resetRepeatCount,
  });

  const itemData: PageRendererDataType = {
    scale,
    rotate,
    isKeywordHighlighted,
    keyword,
    paddingSize,
    isScrolling,
  };

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
              onLoadSuccess={onOutlineLoadSuccess}
              isOpen={isSidebarOpen}
          />
          <List
            height={height}
            itemCount={numPages}
            itemSize={pageHeight + paddingSize}
            width={width}
            overscanCount={2}
            itemData={itemData}
            onScroll={onScroll}
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
