import React, {FC, useState, useEffect, useContext, useRef} from 'react';
import {
  pdfjs,
  Document,
  Page,
  Outline,
} from 'react-pdf';
import {FixedSizeList as List} from 'react-window';

import {
  CommandPaletteContext,
} from './CommandPaletteContext';
import {
  InputBoxContext,
} from './InputBoxContext';

import {DropFileArea} from './DropFileArea';
import {LandingPage} from './LandingPage';

import type {
  Keybindings,
} from '../keybindings';

import {useKeybindings} from '../hooks/use-keybindings';
import {useFlag} from '../hooks/use-flag';
import {useClipedValue} from '../hooks/use-cliped-value';

import {
  CommandCallbacks,
  COMMANDS,
  commandToTitle,
} from '../commands';
import type {
  AllCommandList,
} from '../commands';

import {
  ipcRendererApi,
  unwrapIpcResult,
  canUseIpcApi,
} from '../ipc-renderer';

interface KFPDFViewerProps {
  keybindings: Keybindings;
  fullScreenOn: () => void;
  fullScreenOff: () => void;
  fullScreenToggle: () => void;
  height: number;
  width: number;
};

const PageRenderer = ({index, style, data}: any) => {
  // console.log({data});
  const {scale} = data;

  return (
    <div style={style}>
      <Page
        pageNumber={index + 1}
        scale={scale}
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
  const [url, setUrl] = useState('test.pdf');
  const [numPages, setNumPages] = useState(0);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // not scaled width
  const [pageWidthRaw, setPageWidthRaw] = useState(500);
  const [pageHeightRaw, setPageHeightRaw] = useState(1000);

  const [scale, {
    up: scaleUp,
    down: scaleDown,
    default: scaleDefault,
  }] = useClipedValue(1, {min: 0.1, max: 4, step: 0.1});

  const listRef = useRef(null);
  const commandCallbacksRef = useRef<CommandCallbacks | null>(null);

  function onDocumentLoadSuccess(pdf: any) {
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
      setIsLoading(false);
    })();
  }

  function onItemClick({pageNumber}: any) {
    setCurrentPageNumber(pageNumber);
  }

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
  ] = useFlag(true);

  const player = React.useRef<any>();

  const commandPalette = useContext(CommandPaletteContext);
  const inputBox = useContext(InputBoxContext);

  const loadUrl = React.useCallback((newUrl: string) => {
    setUrl(newUrl);
  }, []);

  const onDropFile = React.useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    // console.log({url});
    loadUrl(url);
  }, [loadUrl]);

  const doNothing = () => {};
  const commandCallbacks: CommandCallbacks = {
    doNothing,

    fullScreenOn,
    fullScreenOff,
    fullScreenToggle,

    showInfoOn,
    showInfoOff,
    showInfoToggle,

    scaleUp,
    scaleDown,
    scaleDefault,

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
    <div
      style={{
        background: 'gray',
      }}
    >
      <Document
        file="test.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        options={{
          cMapUrl: 'cmaps/',
          cMapPacked: true,
        }}
        loading={<div>loading...</div>}
      >
        <List
          height={height}
          itemCount={numPages}
          itemSize={pageHeightRaw * scale}
          width={width}
          overscanCount={2}
          itemData={{
            scale,
          }}
          ref={listRef}
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
                currentPageNumber,
                isLoading,
                scale,
                pageWidthRaw,
                pageHeightRaw,
              }, null, '  ')
            }
          </code></pre>
        </div>
      }
    </div>
  );
}

export {
  KFPDFViewer
};
