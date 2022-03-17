const { ipcRenderer, remote } = require('electron');

// 判断文件是否保存
let isSave = false;
// 文件已经保存的路径
// 文件名称
document.title = '无标题';

// 临听上下文菜单
document.addEventListener('contextmenu', function (e) {
	e.preventDefault();
	ipcRenderer.send('contextMenu');
});

// 监听点击应用菜单
ipcRenderer.on('action', function (e, action) {
	switch (action) {
		case 'new':
			document.title = '';
			break;
		case 'open':
			// 返回打开的文件路径
			console.log('打开文件');
			break;
		case 'save':
			// 保存当前文件
			alert('保存文件');
			break;
		case 'quit':
			// 询问是否保存
			askSaveDialog();
			// 通知主进程完成退出
			ipcRenderer.send('quit-app');
			break;
		default:
			break;
	}
});

// 判断文件是否保存
function askSaveDialog() {
	if (!isSave) {
		let result = remote.dialog.showMessageBoxSync({
			type: 'question',
			message: '是否需要保存文件?',
			buttons: ['Yes', 'No']
		});
		// 保存文档
		if (result === 0) {
			alert('保存文件');
		} else {
			isSave = false;
		}
	}
}
