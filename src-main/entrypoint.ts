import path from 'path';

import {app, BrowserWindow, dialog} from 'electron';
import {isDev} from './env';

import {
  setInputFile,
  getInputFile,
} from './env';
import {initIpcMain} from './ipc-main';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 450,
    titleBarStyle: 'customButtonsOnHover',
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  // mainWindow.loadFile('index.html')
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file:///${__dirname}/../index.html`
  );

  if (isDev) {
    // mainWindow.webContents.openDevTools();
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron'),
      forceHardReset: true,
      hardResetMethod: 'exit',
    });
  }

  mainWindow.webContents.once('did-finish-load', async () => {
    // if (getInputFile()) {
    //   await dialog.showMessageBox(mainWindow, {
    //     type: 'info',
    //     message: `path when load: ${getInputFile()}`,
    //   });
    // }
    // setInputFile(null);
  });

  app.on('open-file', async (event: Electron.Event, path: string) => {
    setInputFile(path);
    event.preventDefault();

    // open new window for opened file.
    // if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    // }

    // if windiw is minimized, restore and focus.
    // if (mainWindow.isMinimized()) mainWindow.restore();
    // mainWindow.focus();

    // await dialog.showMessageBox(mainWindow, {
    //   type: 'info',
    //   message: `path after load: ${getInputFile()}`,
    // });
  });

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.once('will-finish-launching', () => {
  app.once('open-file', (event: Electron.Event, path: string) => {
    event.preventDefault();
    setInputFile(path);
  });
});

initIpcMain();
