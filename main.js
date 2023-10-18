const path = require('path');
const { app, BrowserWindow } = require('electron');

const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'RateMe',
        width: isDev ? 2800 : 1400,
        height: 900
    });

    // Open dev tools if in dev environment

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname,'./rateme-app/html/mainWindow.html'));
}

app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit()
    }
})