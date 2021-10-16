import {
  IPC_API_NAME,
  IPC_CHANNELS,
} from 'src-common/ipc-common';
import type {
  IpcApi,
  IpcChannel,
  IpcResult,
} from 'src-common/ipc-common';

const canUseIpcApi = () => IPC_API_NAME in window;

declare global {
  interface Window {
    ipcApi: IpcApi;
  }
}

const createDummyIpcRendererApi = (): IpcApi => {
  const ipcRendererApi: any = {};
  IPC_CHANNELS.forEach((ipcChannel: IpcChannel) => {
    ipcRendererApi[ipcChannel] = async (..._args: any[]) => {
      throw Error(`can not use IPC API : ${ipcChannel}`);
    }
  });
  return ipcRendererApi as IpcApi;
};

const ipcRendererApi: IpcApi = canUseIpcApi() ? window[IPC_API_NAME] : createDummyIpcRendererApi();

const unwrapIpcResult = <T>(result: IpcResult<T>): T => {
  if (result.isOk) {
    return result.data;
  } else {
    // alert(result.err);
    // error handling is implemented in caller.
    throw result.err;
  }
};

export {
  canUseIpcApi,
  ipcRendererApi,
  unwrapIpcResult,
};
