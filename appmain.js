const  { app, BrowserWindow, ipcMain } = require('electron')
const path  = require('path')
const url  = require('url')
let wind;

function createWindow() {
 wind = new BrowserWindow({
   width: 1080,
   height: 680,
   center: true,
   frame: true,
   show: false,
   webPreferences: {
     nodeIntegration: true,
     allowRunningInsecureContent: true,
     enableRemoteModule: true
   },
   autoHideMenuBar: true,
 })

  /*wind.webContents.openDevTools()*/
  wind.once('ready-to-show', () => {
    wind.show()
  })
  wind.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/weaver/index.html'),
    protocol: 'file',
    slashes: true
  }))
  wind.on('close', () => {
    wind = null
  })
}


app.on('ready', createWindow)
app.on('window-all-closed', () => {
    app.quit()
})
app.on("activate", createWindow)
