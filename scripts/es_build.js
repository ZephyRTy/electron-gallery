/* eslint-disable no-undef */
const svgrPlugin = require('esbuild-plugin-svgr');
const sassPlugin = require('esbuild-plugin-sass');
const { ScssModulesPlugin } = require('../plugins/sassModulePlugin');
const { RemoveDevDepPlugin } = require('../plugins/removeDevDep');
const fse = require('fs-extra');
const path = require('path');
if (!fse.existsSync(path.join('./dist'))) {
	fse.mkdirSync(path.join('./dist'));
}
require('esbuild')
	.build({
		entryPoints: ['./src/index.tsx'],
		bundle: true,
		outdir: './dist',
		loader: {
			'.png': 'file',
			'.jpg': 'file',
			'.gif': 'file',
			'.webp': 'file',
			'.ttf': 'file',
			'.woff': 'file',
			'.woff2': 'file',
			'.otf': 'file'
		},
		define: {
			'process.env.NODE_ENV': '"production"',
			'process.env.DEBUG': false
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
			//RemoveDevDepPlugin
		]
	})
	.then(async () => {
		const fileName = path.join('./dist/index.html');
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
  </script>
 </html>
 `
		);
	})
	.catch(() => process.exit(1));
