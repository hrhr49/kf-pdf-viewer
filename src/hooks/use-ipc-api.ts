import {useEffect} from 'react';
import {defaultKeybindings, isPartialKeybindings} from '../keybindings';
import type {Keybindings} from '../keybindings';

import {
  isAvailableIpcApi,
  unwrapIpcResult,
  ipcRendererApi,
} from '../ipc-renderer';

const useIpcApi = ({
  setUrl,
  setKeybindings,
}: {
  setUrl: (newUrl: string) => void;
  setKeybindings: (newKeybindings: Keybindings) => void;
}) => {
  useEffect(() => {
    (async () => {
      if (!isAvailableIpcApi()) return;

      // load input file
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
        alert(`error occurred while loading input file.\n${String(e)}`);
      }

      // load keybindings
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
        alert(`error occurred while loading keybindings.\n${String(e)}`);
      }
    })();
  }, [setUrl, setKeybindings]);
};

export {
  useIpcApi,
};
