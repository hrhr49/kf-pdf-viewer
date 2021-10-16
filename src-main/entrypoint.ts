import path from 'path';

import {app, BrowserWindow} from 'electron';
import {isDev}  from './env';

import {
  setInputFile,
} from './env';
import {initIpcMain} from './ipc-main';

function createWindow () {
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

app.on('open-file', (event: Electron.Event, path: string) => {
  event.preventDefault();
  setInputFile(path);
});

initIpcMain();
