// Módulos de electron
import { BrowserWindow, app } from "electron";
import serve from "electron-serve";
import sequelize from "./Database/init.js";
import log from "electron-log";
import {fileURLToPath} from "url";
import path from "path";

function createWindow() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  return new BrowserWindow({
    backgroundColor: "#121212",
    width: 1500,
    height: 800,
    // titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: "#000000",
      symbolColor: "#ffffff",
    },
    webPreferences: {
      preload: path.join(__dirname, '/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })
}

(async () => {
  try {
    const isDev = process.env.NODE_ENV === "development";

    if (isDev) {
      app.setPath("userData", `${app.getPath("userData")} (development)`);
    } else {
      serve({ directory: "app" });
    }
  
    await app.whenReady();
    await sequelize.authenticate();
    await sequelize.sync();
  
    const mainWindow = createWindow();
  
    if (isDev) {
      await mainWindow.loadURL("http://localhost:5173/home");
      mainWindow.webContents.openDevTools();
    } else {
      await mainWindow.loadURL("app://../home");
      mainWindow.webContents.openDevTools();
    }
  
    // MacOS
    app.on("activate", () =>
      BrowserWindow.getAllWindows().length === 0 ? createWindow() : false
    );
  
    app.on("window-all-closed", () => {
      app.quit();
    });
  
    log.info('cargado correctamente el server');
  } catch (error) {
    log.info("hay un error");
    log.info(error);
  }
})();


// ipcMain.on("serial:open", ipcMainController.serialConnectionOpen);
// ipcMain.on("serial:close", ipcMainController.serialConnectionClose);
// ipcMain.on("serial:list-ports", ipcMainController.serialListPorts);
// ipcMain.on("db:get-all", ipcMainController.getDbData);