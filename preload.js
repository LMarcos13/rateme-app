const os = require('os');
const path = require('path');
const fs = require('fs');
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('os', {
    homedir: () => os.homedir(),
});

contextBridge.exposeInMainWorld('path', {
    join: (...args) => path.join(...args),
});

contextBridge.exposeInMainWorld('fs', {
    readFileSync: (...args) => fs.readFileSync(...args),
    writeFileSync: (...args) => fs.writeFileSync(...args),
});
