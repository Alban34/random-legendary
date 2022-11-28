const {app, BrowserWindow} = require('electron');
require('../dist/out-tsc/src/server');

function createWindow() {
    const mainWindow = new BrowserWindow({show: false});
    mainWindow.maximize();
    mainWindow.loadURL('http://localhost:3000').then(() => {
            mainWindow.show();
        }
    );
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        // On macOS, it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
