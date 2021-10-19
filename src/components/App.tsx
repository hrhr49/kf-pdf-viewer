import {useState, useEffect, useRef, useCallback, CSSProperties} from 'react';
import {FullScreen, useFullScreenHandle} from 'react-full-screen';
import {KFPDFViewer} from './KFPDFViewer';
import { CommandPaletteProvider } from './CommandPaletteContext';
import { OutlineSelectorProvider } from './OutlineSelectorContext';
import { InputBoxProvider } from './InputBoxContext';
import {debounce} from 'throttle-debounce';

interface AppProps {
}

const App: React.FC<AppProps> = () => {
  const modalRootRef = useRef(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(document.documentElement.clientWidth);
  const [screenHeight, setScreenHeight] = useState(document.documentElement.clientHeight);

  useEffect(() => {
    const onResize = debounce(250, () => {
      setScreenWidth(document.documentElement.clientWidth);
      setScreenHeight(document.documentElement.clientHeight);
    });
    // TODO: orientationchange event
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    }
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

  const fullScreenCommandCallbacks = {
    fullScreenOn,
    fullScreenOff,
    fullScreenToggle,
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
          <OutlineSelectorProvider
            parentSelector={parentSelector}
          >
            <InputBoxProvider
              parentSelector={parentSelector}
            >
              <div
                style={divStyle}
              >
                <KFPDFViewer
                  fullScreenCommandCallbacks={fullScreenCommandCallbacks}
                  height={screenHeight}
                  width={screenWidth}
                />
              </div>
            </InputBoxProvider>
          </OutlineSelectorProvider>
        </CommandPaletteProvider>
      </div>
    </FullScreen>
  );
}

export {
  App
};
