// 引入electron并创建一个BrowserWindow

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow;
module.exports = { mainWindow: mainWindow };
function createWindow() {
	//创建浏览器窗口,宽高自定义具体大小你开心就好
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 900,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
			webSecurity: false
		}
	});
	if (!app.isPackaged) {
		mainWindow.webContents.openDevTools({ mode: 'detach' });
		mainWindow.loadURL('http://localhost:8097/');
	} else {
		mainWindow.loadURL(
			url.format({
				pathname: path.join(__dirname, 'build', 'index.html'),
				protocol: 'file:',
				slashes: true
			})
		);
	}
	// 关闭window时触发下列事件.
	mainWindow.on('closed', function () {
		mainWindow = null;
	});
}
// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.disableHardwareAcceleration();
app.on('ready', createWindow);
// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
	// macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

if (!app.isPackaged) {
	const {
		default: installExtension,
		REACT_DEVELOPER_TOOLS
	} = require('electron-devtools-installer');
	app.whenReady().then(() => {
		installExtension(REACT_DEVELOPER_TOOLS)
			.then((name) => console.log(`Added Extension:  ${name}`))
			.catch((err) => console.log('An error occurred: ', err));
	});
}
ipcMain.on('min', () => mainWindow.minimize());
ipcMain.on('max', () => {
	if (mainWindow.isMaximized()) {
		mainWindow.restore();
	} else {
		mainWindow.maximize();
	}
});
ipcMain.on('close', () => mainWindow.close());
