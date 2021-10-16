type IpcResult<T> = {
  isOk: true,
  data: T
} | {
  isOk: false,
  err: Error,
};

const ipcResultOk = <T>(data: T): IpcResult<T> => ({isOk: true, data});
const ipcResultErr = <T>(err: unknown): IpcResult<T> => {
  if (err instanceof Error) {
    return {isOk: false, err};
  } else {
    return {isOk: false, err: new Error(String(err))};
  }
}

const IPC_CHANNELS = [
  'inputFileData',
  'loadKeybindings',
] as const;

const IPC_API_NAME = 'ipcApi';

type IpcChannelList = typeof IPC_CHANNELS;
type IpcChannel = IpcChannelList[number];

// const wrapReturnWithResult = <T>(func: (...args: any[]) => T): (...args: any[]) => IpcResult<T> => {
//   return (...args: any[]) => ipcResultOk(func(args));
// };

interface FileData {
  data: Uint8Array;
  mime: string;
}

interface _IpcApi {
  inputFileData: () => Promise<IpcResult<FileData | null>>;
  // check type in renderer process.
  loadKeybindings: () => Promise<IpcResult<unknown | null>>;
}

// NOTE:
// all api function should return promise to use
// same type defition in `ipcMain.handle()` and `ipcRenderer.invoke()`.
type IpcApi = {
  [K in IpcChannel]: _IpcApi[K];
} & Record<IpcChannel, (...args: any[]) => Promise<IpcResult<any>>>;

export {
  IPC_API_NAME,
  IPC_CHANNELS,
  ipcResultOk,
  ipcResultErr,
};

export type {
  IpcApi,
  IpcChannel,
  IpcResult,
};
