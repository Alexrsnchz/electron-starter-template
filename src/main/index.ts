import { fileURLToPath } from 'url';
import path from 'path';
import { app, BrowserWindow } from 'electron';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
    const win = new BrowserWindow({
        width: 1024,
        height: 675,
        webPreferences: {
            preload: path.join(__dirname,'../preload/index.mjs'),
            sandbox: false,
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    if (!app.isPackaged && process.env['ELECTRON_RENDERER_URL']) {
        win.loadURL(process.env['ELECTRON_RENDERER_URL']).catch(console.error);
    } else {
        win.loadFile(path.join(__dirname, '../renderer/index.html')).catch(console.error);
    }
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
