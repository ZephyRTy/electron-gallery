// ipcMain.js
const { Menu, BrowserWindow, shell, ipcMain, app } = require('electron');
const { mainWindow } = require('../../main');
let template = [
	{
		label: '文件',
		submenu: [
			{
				label: '新建',
				accelerator: 'Ctrl+N',
				click: function () {
					// 通知渲染进程新建文件
					BrowserWindow.getFocusedWindow().webContents.send(
						'action',
						'new'
					);
				}
			},
			{
				label: '打开',
				accelerator: 'Ctrl+O',
				click: function () {
					// 通知渲染进程打开文件
					BrowserWindow.getFocusedWindow().webContents.send(
						'action',
						'open'
					);
				}
			},
			{
				label: '保存',
				accelerator: 'Ctrl+S',
				click: function () {
					// 通知渲染进程打开文件
					BrowserWindow.getFocusedWindow().webContents.send(
						'action',
						'save'
					);
				}
			},
			{ type: 'separator' },
			{
				label: '打印',
				accelerator: 'Ctrl+P',
				click: function () {
					// 调用打印功能
				}
			},
			{
				label: '退出',
				accelerator: 'Ctrl+Q',
				click: function () {
					// 主进程通知渲染进程执行退出的操作
					BrowserWindow.getFocusedWindow().webContents.send(
						'action',
						'quit'
					);
				}
			}
		]
	},
	{
		label: '编辑',
		submenu: [
			{ label: '加载', role: 'reload' },
			{ label: '恢复', role: 'redo' },
			{ type: 'separator' },
			{ label: '截切', role: 'cut' },
			{ label: '复制', role: 'copy' },
			{ label: '黏贴', role: 'paste' },
			{ label: '删除', role: 'delete' },
			{ label: '全选', role: 'selectall' }
		]
	},
	{
		label: '视图',
		submenu: [
			{ label: '缩小', role: 'zoomin' },
			{ label: '放大', role: 'zoomout' },
			{ label: '重置缩放', role: 'resetzoom' },
			{ type: 'separator' },
			{ label: '全屏', role: 'togglefullscreen' }
		]
	},
	{
		label: '帮助',
		submenu: [
			{
				label: '关于',
				click() {
					shell.openExternal('https://www.baidu.com');
				}
			}
		]
	}
];
let mainMenu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(mainMenu);

// 右键菜单
const contextMenuTemplate = [
	{ label: '撤销', role: 'undo' },
	{ label: '恢复', role: 'redo' },
	{ type: 'separator' },
	{ label: '截切', role: 'cut' },
	{ label: '复制', role: 'copy' },
	{ label: '黏贴', role: 'paste' },
	{ type: 'separator' },
	{ label: '全选', role: 'selectall' }
];

let contextMenu = Menu.buildFromTemplate(contextMenuTemplate);

// 监听右键事件
ipcMain.on('contextMenu', function () {
	contextMenu.popup(BrowserWindow.getFocusedWindow());
});

// 监听客户端传来的退出指令
ipcMain.on('quit-app', () => {
	app.quit();
});
