// import { contextBridge, ipcRenderer } from 'electron';
const { contextBridge, ipcRenderer } = require('electron');

// exposeInMainWorld를 사용하여 렌더러 프로세스에서 main 프로세스와 상호작용
contextBridge.exposeInMainWorld('electron', {
  store: {
    get(key) {
      return ipcRenderer.sendSync('electron-store-get', key);
    },
    set(property, val) {
      ipcRenderer.send('electron-store-set', property, val);
    },
    delete(key) {
      ipcRenderer.send('electron-store-delete', key);
    },
  },
});
