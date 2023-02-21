const { BrowserWindow, app } = require("electron");
const path = require("path");
const { ipcMain } = require("electron");
const ethers = require("ethers");
require("@electron/remote/main").initialize();

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1200,
    minHeight: 800,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      height: 30,
    },
    icon: path.join(__dirname, "/logo.icns"),
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL("http://localhost:3000");
}

app.on("ready", createWindow);

app.on("window-all-closed", async () => {
  if (process.platform === "darwin") {
    db.close();
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
