import { contextBridge, ipcRenderer } from 'electron';
import {
  IPC_API_NAME,
  IPC_CHANNELS,
} from '../src-common/ipc-common';
import type {
  IpcApi,
  IpcChannel,
} from '../src-common/ipc-common';

const initIpcRenderer = (): IpcApi => {
  // NOTE:
  // this is type safe. because main process and renderer process are using same type definition of api;
  const ipcRendererApi: any = {};
  IPC_CHANNELS.forEach((ipcChannel: IpcChannel) => {
    ipcRendererApi[ipcChannel] = (...args: any[]) => ipcRenderer.invoke(ipcChannel, ...args);
  });
  return ipcRendererApi as IpcApi;
}

const ipcRendererApi: IpcApi = initIpcRenderer();

contextBridge.exposeInMainWorld(IPC_API_NAME, ipcRendererApi);
