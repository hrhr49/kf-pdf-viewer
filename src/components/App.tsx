import {useState, useEffect, useRef, useCallback, CSSProperties} from 'react';
import {FullScreen, useFullScreenHandle} from 'react-full-screen';
import {KFPDFViewer} from './KFPDFViewer';
import { CommandPaletteProvider } from './CommandPaletteContext';
import { InputBoxProvider } from './InputBoxContext';
import { defaultKeybindings, isPartialKeybindings } from '../keybindings';
import {
  ipcRendererApi,
  unwrapIpcResult,
  canUseIpcApi,
} from '../ipc-renderer';

interface AppProps {
}

const App: React.FC<AppProps> = () => {
  const modalRootRef = useRef(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(document.documentElement.clientWidth);
  const [screenHeight, setScreenHeight] = useState(document.documentElement.clientHeight);
  const [keybindings, setKeybindings] = useState(defaultKeybindings);

  useEffect(() => {
    const onResize = () => {
      setScreenWidth(document.documentElement.clientWidth);
      setScreenHeight(document.documentElement.clientHeight);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (!canUseIpcApi()) return;
      try {
        const rawObj = unwrapIpcResult(await ipcRendererApi.loadKeybindings());

        // console.log({rawObj});
        if (rawObj) {
          if (isPartialKeybindings(rawObj)) {
            setKeybindings({
              ...defaultKeybindings,
              ...rawObj,
            });
          }
        }
      } catch (e) {
        console.error(e);
        alert(`error occrus while loading keybindings.\n${String(e)}`);
      }
    })();
  }, []);

  const fullScrenHandle = useFullScreenHandle();

  const fullScreenOn = useCallback(() => {
    if (!fullScreen) {
      fullScrenHandle.enter();
    }
  }, [fullScreen, fullScrenHandle]);

  const fullScreenOff = useCallback(() => {
    if (fullScreen) {
      fullScrenHandle.exit();
    }
  }, [fullScreen, fullScrenHandle]);

  const fullScreenToggle = useCallback(() => {
    if (fullScreen) {
      fullScrenHandle.exit();
    } else {
      fullScrenHandle.enter();
    }
  }, [fullScreen, fullScrenHandle]);

  const divStyle: CSSProperties = fullScreen
    ? {
      width: '100%',
      height: '100%',
    }
    : {
      width: screenWidth,
      height: screenHeight,
    };

  const parentSelector = () => {
    if(modalRootRef.current) {
      return modalRootRef.current;
    } else {
      return document.body;
    }
  };

  return (
    <FullScreen
      handle={fullScrenHandle}
      onChange={setFullScreen}
    >
      <div ref={modalRootRef}>
        <CommandPaletteProvider
          parentSelector={parentSelector}
        >
          <InputBoxProvider
            parentSelector={parentSelector}
          >
            <div
              style={divStyle}
            >
              <KFPDFViewer
                keybindings={keybindings}
                fullScreenOn={fullScreenOn}
                fullScreenOff={fullScreenOff}
                fullScreenToggle={fullScreenToggle}
                height={screenHeight}
                width={screenWidth}
              />
            </div>
          </InputBoxProvider>
        </CommandPaletteProvider>
      </div>
    </FullScreen>
  );
}

export {
  App
};
