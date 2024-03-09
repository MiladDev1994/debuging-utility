import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import scanDirectory from './controllers/ScanDirectory';
const fs = require("fs")
const {Directory, DB, DBFilter, Keys, Test} = require("./DB/Singleton")
const connectDB = require("./Utils/connectDB")
const getFilesData = require("./controllers/getFilesData")
const renameExe = require("./controllers/renameExeController")

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;


if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 700,
    width: 1230,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.removeMenu();
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // mainWindow.webContents.openDevTools();

  ipcMain.handle('dialog:selectedDir', async (event) => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
    })
    if (canceled) {
      return
    } else {
      const directory = filePaths?.shift() as string
      // connectDB();
      const scanFolders = scanDirectory(directory);
      const readData = getFilesData(0, "first");

      return event.sender.send("walk_chanel" , {
        status: scanFolders.status, 
        files: scanFolders.status ? scanFolders.data?.allRecord : [],
        message: scanFolders.message,
        data: readData.data,
        directory
      });
      // return filePaths?.shift()
    }
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
  }
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////


ipcMain.on("walk", (event, req) => {

  const {directory} = req
  // connectDB();
  const scanFolders = scanDirectory(directory);
  const readData = getFilesData(0, "first");

  return event.sender.send("walk_chanel" , {
    status: scanFolders.status, 
    files: scanFolders.status ? scanFolders.data?.allRecord : [],
    message: scanFolders.message,
    data: readData.data,
  });

})


ipcMain.on("getData", (event, values) => {
  
  const {id, type} = values;
  if (!Directory.get() || !DBFilter.get()) return event.sender.send("getData_chanel" , {status: false, message: "please select a directory"});

  const readeDBFile = DBFilter.get();
  const findIndex = readeDBFile.findIndex((item: any) => item.id === id);
  const fileIndex = type === "first" ? (+findIndex) : type === "next" ? (+findIndex+1) : type === "previous" ? (+findIndex-1) : 0;
  const readData = getFilesData(fileIndex, type);

  return event.sender.send("getData_chanel", {
    status: readData.status,
    data: readData.status ? readData.data : [],
    message: readData.message,
  })
})


ipcMain.on("count", (event, req) => {
  if (!Directory.get() || !Object.keys(DB.get())) return event.sender.send("count_chanel", {status: false, message: "please select a directory"})
  return event.sender.send("count_chanel", {status: true, data: DB.get().count})
})


ipcMain.on("filter", (event, req) => {
  if (!Directory.get() || !Object.keys(DB.get())) return event.sender.send("filter_chanel", {status: false, message: "please select a directory"})
  const {top, down, status} = req;
  const allFilterKeys = Object.keys(req);
  const filteredData = DB.get().allRecord.length ? DB.get().allRecord.filter((item: any) => 
    (allFilterKeys.includes("top") ? item.hasTop === top : true) &&
    (allFilterKeys.includes("down") ? item.hasDown === down : true) &&
    item.status.toUpperCase().includes(status.toUpperCase())
  ) : []
  DBFilter.set(filteredData)
  
  return event.sender.send("filter_chanel", {status: true, data: filteredData})
})


ipcMain.on("xmlKeyCreate", (event, req) => {
  if (!req) return event.sender.send("xmlKeyCreate_chanel", {status: false, message: "key is required"});
  const getAllKeys = Keys.get();
  const checkExist = getAllKeys.find((item: any) => item.value === req);
  if (checkExist)  return event.sender.send("xmlKeyCreate_chanel", {status: false, message: "This key has already been added"});

  Keys.add(req)

  // fs.writeFile(`.\\src\\DB\\keys.json`, JSON.stringify(Keys.get(), null, 4), function(err: any, result: any) {
  //   if(err) console.error("error");
  // });
  return event.sender.send("xmlKeyCreate_chanel", {status: true, data: Keys.get()})
})

ipcMain.on("xmlKeyRead", (event, type) => {
  if (!Directory.get() || !DB.get()) return event.sender.send("xmlKeyRead_chanel", {status: false, message: "please select a directory"});
  if (type === "all") return event.sender.send("xmlKeyRead_chanel", {status: true, data: Keys.get()});
  else if (type === "active") {
    const activeKeys = Keys.get().length ? Keys.get().filter((item: any) => item.act) : [];
    return event.sender.send("xmlKeyRead_chanel", {status: true, data: activeKeys});
  } 
})

ipcMain.on("xmlKeyUpdate", (event, id) => {
  Keys.update(id)
  return event.sender.send("xmlKeyUpdate_chanel", {status: true, data: Keys.get()})
})

ipcMain.on("xmlKeyDelete", (event, id) => {
  Keys.delete(id)
  return event.sender.send("xmlKeyDelete_chanel", {status: true, data: Keys.get()})
})

ipcMain.on("xmlKeyUpdateAll", (event, status) => {
  Keys.updateAll(status)
  return event.sender.send("xmlKeyUpdateAll_chanel", {status: true, data: Keys.get()})
})

ipcMain.on("xmlKeyDelete", (event, id) => {
  Keys.delete(id)
  return event.sender.send("xmlKeyDelete_chanel", {status: true, data: Keys.get()})
})

ipcMain.on('renameExe', function(event, valueSentFromFront: any) : any {
  const {path, name} = valueSentFromFront;
  const rename = renameExe(name)
  return event.sender.send("renameExe_chanel", {
    status: rename.state, 
    data: rename.state ? rename.data : "",
    message: rename.message, 
  })
})