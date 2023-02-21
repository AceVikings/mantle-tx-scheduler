const { BrowserWindow, app, Notification } = require("electron");
const path = require("path");
const { ipcMain } = require("electron");
const ethers = require("ethers");
const cron = require("node-cron");
const { Contract } = require("ethers");
require("dotenv").config();
require("@electron/remote/main").initialize();

const provider = new ethers.JsonRpcProvider("https://rpc.testnet.mantle.xyz/");

let job = [];
let activeJobs = [];
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

function showNotification(title, body) {
  new Notification({
    title: title,
    body: body,
  }).show();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", async () => {
  if (process.platform === "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

//arg[0]: address, arg[1]: abi,arg[2]:cron expression
ipcMain.on("Create:Job", async (event, arg) => {
  const address = arg[0];
  const abi = [arg[1]];
  const expression = arg[2];
  const params = arg[3];
  const signer = new ethers.Wallet(arg[5], provider);
  console.log("Test called");
  const contract = new Contract(address, abi, signer);

  job.push({
    address: arg[0],
    abi: [arg[1]],
    expression: arg[2],
    params: arg[3],
    name: arg[4],
  });

  console.log(job);
  const getJob = cron.schedule(expression, async () => {
    console.log("Cron entered");
    try {
      let tx = await contract[abi[0]](params);
      console.log(tx);
      showNotification(`${arg[4]} Transaction executed!`, tx.hash);
    } catch (err) {
      showNotification(`${arg[4]} Transaction failed!`, err);
      console.log(err);
    }
  });

  activeJobs.push(getJob);
  event.sender.send("Return:Jobs", job);
});

ipcMain.on("Stop:Job", async (event, arg) => {
  const index = arg[0];
  activeJobs[index].stop();
});

ipcMain.on("Request:JobCount", async (event, arg) => {
  event.sender.send("Return:JobCount", activeJobs.length);
});

ipcMain.on("Request:JobInfo", async (event, arg) => {
  console.log(arg[0]);
  console.log(job[arg[0]]);
  event.sender.send("Return:JobInfo", [arg[0], job[arg[0]]]);
});

ipcMain.on("Request:Jobs", async (event, arg) => {
  event.sender.send("Return:Jobs", job);
});
