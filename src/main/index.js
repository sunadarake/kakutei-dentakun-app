const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // 入力中に閉じようとしたら確認ダイアログを表示
  mainWindow.on("close", async (e) => {
    const input = await mainWindow.webContents.executeJavaScript(
      'document.getElementById("input").value.trim()',
    );
    if (input) {
      e.preventDefault();
      const { response } = await dialog.showMessageBox(mainWindow, {
        type: "question",
        buttons: ["閉じる", "キャンセル"],
        defaultId: 1,
        message: "入力中のデータがあります。閉じてもよいですか？",
      });
      if (response === 0) {
        mainWindow.destroy();
      }
    }
  });

  // パッケージ済みの場合はビルド済みファイルを読み込む
  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, "../../dist/renderer/index.html"));
  } else {
    mainWindow.loadURL("http://localhost:5173");
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
