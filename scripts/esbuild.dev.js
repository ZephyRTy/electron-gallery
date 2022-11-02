/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
// esbuild.config.js文件
const esbuild = require('esbuild');
const serve = require('koa-static');
const Koa = require('koa');
const path = require('path');
const fse = require('fs-extra');
const app = new Koa();
const svgrPlugin = require('esbuild-plugin-svgr');
const sassPlugin = require('esbuild-plugin-sass');
const { ScssModulesPlugin } = require('../plugins/sassModulePlugin');
const chalk = require('chalk').default;
// 启动编译好后自动刷新浏览器
const livereload = require('livereload');
const lrserver = livereload.createServer();
lrserver.watch(__dirname);
console.log(path.join(__dirname));
// 使用静态服务
app.use(serve(path.join(__dirname)));
const logLocalhostUrl = () => {
	console.log(chalk.bold.underline.cyanBright('http://localhost:3000/'));
};

const logBuildSuccess = (message) => {
	console.log(chalk.bgRgb(37, 120, 181).bold(message));
};
if (!fse.existsSync(path.join('./dev'))) {
	fse.mkdirSync(path.join('./dev'));
}
esbuild
	.build({
		// 入口
		entryPoints: ['src/index.tsx'],
		// 启动sourcemap
		sourcemap: true,
		// 打包
		bundle: true,
		// 输出的目录
		outdir: './dev',
		// 定义环境变量
		define: {
			'process.env.NODE_ENV': '"development"',
			'process.env.DEBUG': true
		},
		// 启动轮询的监听模式
		watch: {
			onRebuild(error) {
				console.clear();
				if (error) {
					console.log(error.errors);
					console.log(chalk`{red.bold *} {bold.bgRed Build failed:}`);
					console.log(chalk.white.bold(error.message));
					console.log(error.stack);
				} else {
					// 这里来自动打开浏览器并且更新浏览器
					logBuildSuccess('watch build succeeded');
					logLocalhostUrl();
				}
			}
		},
		plugins: [
			ScssModulesPlugin({
				inject: true,
				minify: false,
				bundle: false,
				localsConvention: 'dashes'
			}),
			sassPlugin(),
			svgrPlugin({
				svgoConfig: {
					plugins: {
						removeViewBox: false
					}
				},
				namedExport: 'ReactComponent',
				exportType: 'named'
			})
		]
	})
	.then(async () => {
		logBuildSuccess('build succeeded');
		const fileName = path.join('./dev/index.html');
		// 创建文件，如果文件不存在直接创建，存在不做任何事情
		await fse.ensureFile(fileName);
		// 把下面内容写入dist中的index.html文件中
		await fse.writeFileSync(
			fileName,
			`
 <!DOCTYPE html>
 <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" href="./index.css">
	<link rel="stylesheet" href="./_modules.css">
  </head>
  <body>
    <div id="root">  </div>
  </body>
  <script type="module" src="./index.js"></script>
  <script>
    document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
    ':35729/livereload.js?snipver=1"></' + 'script>')
  </script>
  </script>
 </html>
 `
		);
		app.listen(3000, () => {
			logLocalhostUrl();
		});
	})
	.catch((e) => {
		console.log(e);
	});
