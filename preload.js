const os = require('os');
const path = require('path');
const fs = require('fs');
const { contextBridge, BrowserWindow } = require('electron');

contextBridge.exposeInMainWorld('os', {
    homedir: () => os.homedir(),
});

contextBridge.exposeInMainWorld('path', {
    join: (...args) => path.join(...args),
});

contextBridge.exposeInMainWorld('fs', {
    readFileSync: (...args) => fs.readFileSync(...args),
    writeFileSync: (...args) => fs.writeFileSync(...args),
    mkdir: (...args) => fs.mkdir(...args),
    existsSync: (...args) => fs.existsSync(...args),
});

contextBridge.exposeInMainWorld('electron', {
    BrowserWindow: (...args) => electron.BrowserWindow(...args),
});