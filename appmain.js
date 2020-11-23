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

  const pathName = path.resolve('weaver/index.html') // production build
  // const pathName = path.resolve('dist/weaver/index.html') // development machine
  wind.loadFile(
    pathName,
  )
  wind.on('close', () => {
    wind = null
  })
}


app.on('ready', createWindow)
app.on('window-all-closed', () => {
    app.quit()
})
app.on("activate", createWindow)
