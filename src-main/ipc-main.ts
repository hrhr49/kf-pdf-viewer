import fs from 'fs/promises';
import path from 'path';
import os from 'os';

import mime from 'mime-types';
import {ipcMain} from 'electron';

import {getInputFile} from './env';

import {
  IPC_CHANNELS,
  ipcResultOk,
  ipcResultErr,
} from '../src-common/ipc-common';
import {
  SUPPORTED_EXTENSIONS_WITH_COMMA,
} from '../src-common/file';

import type {
  IpcApi,
  IpcChannel,
} from '../src-common/ipc-common';

const isErrnoException = (obj: any): obj is NodeJS.ErrnoException => {
  return (
    obj instanceof Error
  );
};

const ipcMainApi: IpcApi = {
  inputFileData: async () => {
    const inputFile = getInputFile();
    if (!inputFile) {
      return ipcResultOk(null);
    }

    const extension = path.extname(inputFile);

    if (!SUPPORTED_EXTENSIONS_WITH_COMMA.includes(extension)) {
      throw Error(`input file extension is not supported ${extension}`);
    }
    const mimeType = mime.lookup(extension);
    if (!mimeType) {
      throw Error(`can not detect mime type of extension: ${extension}`);
    }

    const uint8arrayData = new Uint8Array(await fs.readFile(inputFile));
    return ipcResultOk({
      data: uint8arrayData,
      mime: mimeType,
    });

  },

  loadKeybindings: async () => {
    const configDirPath = path.join(os.homedir(), '.config', 'kf-pdf-viewer');

    // NOTE: Calling fsPromises.mkdir() when path is a directory that exists results in a rejection only when recursive is false.
    fs.mkdir(configDirPath, {recursive: true});

    const keybindingsFilePath = path.join(configDirPath, 'keybindings.json');

    try {
      const jsonStr = (await fs.readFile(keybindingsFilePath)).toString();
      const json: unknown = JSON.parse(jsonStr);

      return ipcResultOk(json);
    } catch (e) {
      if (isErrnoException(e) && e?.code === 'ENOENT') {
        // if file does not exists, supress error and return null;
        return ipcResultOk(null);
      }
      throw e;
    }
  },
};

const initIpcMain = () => {
  IPC_CHANNELS.forEach((ipcChannel: IpcChannel) => {
    ipcMain.handle(ipcChannel, async (_event: Electron.IpcMainInvokeEvent, ...args: any[]) => {
      try {
        // NOTE:
        // this is type safe. because main process and renderer process are using same type definition of api;
        return await (ipcMainApi[ipcChannel] as any)(...args);
      } catch(e) {
        console.error(e);
        return ipcResultErr(e);
      }
    });
  });
}

export {
  initIpcMain,
};
