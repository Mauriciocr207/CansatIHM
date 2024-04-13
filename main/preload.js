const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('cansatApi', {
  serialOpen: (data) => {
    ipcRenderer.send('serial:open', data);
  },
  serialOnOpen: (id, callback) => {
    ipcRenderer.on(`serial:open:${id}`, callback);
  },
  serialClose: (data) => {
    ipcRenderer.send('serial:close', data);
  },
  serialOnClose: (id, callback) => {
    ipcRenderer.on(`serial:close:${id}`, callback);
  },
  serialListPorts: () => {
    ipcRenderer.send('serial:list-ports');
  },
  serialOnListPorts: (callback) => {
    ipcRenderer.on('serial:list-ports', callback);
  },
  arduinoOnData: (callback) => {
    ipcRenderer.on('arduino:data', callback);
  },
  dbGetAll: (data) => {
    ipcRenderer.send('db:get-all', data);
  },
  dbOnGetAll: (callback) => {
    ipcRenderer.on('db:get-all', callback);
  }
});