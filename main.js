/* eslint-disable no-undef */
// 引入electron并创建一个BrowserWindow

const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const path = require('path');
const url = require('url');
const remote = require('@electron/remote/main');
let tray = null;
// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow;

remote.initialize();
module.exports = { mainWindow: mainWindow };
function createWindow() {
	//创建浏览器窗口,宽高自定义具体大小你开心就好
	tray = new Tray('D:\\webDemo\\desktop-reader\\public\\photos.ico'); // 用ico图标格式
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
	remote.enable(mainWindow.webContents);
	if (!app.isPackaged) {
		mainWindow.webContents.openDevTools({ mode: 'detach' });
		mainWindow.loadURL('http://localhost:8097/');
	} else {
		//mainWindow.webContents.openDevTools({ mode: 'detach' });
		mainWindow.loadURL(
			url.format({
				pathname: path.join(__dirname, 'build', 'index.html'),
				protocol: 'file:',
				slashes: true
			})
		);
	}
	const contextMenu = Menu.buildFromTemplate([
		{
			// 应用退出
			label: '退出',
			click: () => {
				mainWindow.destroy();
			}
		}
	]);
	tray.setContextMenu(contextMenu);
	tray.setToolTip('好东西');
	tray.on('click', () => {
		// 这里模拟桌面程序点击通知区图标实现显示或隐藏应用的功能
		mainWindow.show();
		// 		mainWindow.setSkipTaskbar(true);
	});
	// 关闭window时触发下列事件.
	mainWindow.on('closed', function () {
		mainWindow = null;
	});
}
// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
	app.quit();
} else {
	app.on('second-instance', (event, commandLine, workingDirectory) => {
		// 当运行第二个实例时,将会聚焦到mainWindow这个窗口
		if (mainWindow) {
			if (mainWindow.isMinimized()) {
				mainWindow.restore();
			}
			mainWindow.focus();
			mainWindow.show();
		}
	});
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
	ipcMain.on('hide', () => {
		// if (mainWindow.isMaximized()) {
		// 	mainWindow.restore();
		// } else {
		// 	mainWindow.maximize();
		// }
		mainWindow.hide();
		mainWindow.setSkipTaskbar(false);
	});
	ipcMain.on('close', () => {
		mainWindow.close();
	});
	ipcMain.on('console', () =>
		mainWindow.webContents.openDevTools({ mode: 'detach' })
	);
	ipcMain.on('relaunch', () => {
		app.relaunch();
		app.exit();
	});
}
// 创建 myWindow, 加载应用的其余部分, etc...
// app.on('ready', () => {
// })
