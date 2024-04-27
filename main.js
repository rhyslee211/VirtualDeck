const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')
const ipc = require('electron').ipcMain

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    frame: false
  })

  win.loadFile('index.html')

  ipc.on('close', () => {
    win.close()
  })


  ipc.on('minimize', () => {
    win.minimize()
  })

  ipc.on('maximize', () => {
    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  })

  ipc.on('resize', () => {
    win.isMaximized() ? win.unmaximize() : win.maximize()
  })

  win.on('maximize', () => {
    win.webContents.send('isMaximized')
  })

  win.on('unmaximize', () => {
    win.webContents.send('isRestored')
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})