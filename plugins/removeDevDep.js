/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// Modified from: https://github.com/indooorsman/esbuild-css-modules-plugin
// eff4a500c56a45b1550887a8f7c20f57b01a46b7
// MIT License

const fsp = require('fs/promises');
const path = require('path');
const PLUGIN = 'remove-useless-dep';
const RemoveDevDepPlugin = {
	name: PLUGIN,
	setup(build) {
		build.onResolve({ filter: /\.(tsx)$/ }, (args) => {
			const sourceFullPath = path.join(args.resolveDir, args.path);
			if (args.path.includes('react-devtools')) {
				console.log(args.path);
			}
			return {
				path: args.path,
				namespace: 'useless-dep',
				pluginData: { sourceFullPath }
			};
		});
		build.onLoad(
			{ filter: /\.(tsx)$/, namespace: 'useless-dep' },
			async (args) => {
				const { sourceFullPath } = args.pluginData;
				let jsContent = await fsp.readFile(sourceFullPath, 'utf8');
				const flag = jsContent.includes('react-devtools');
				jsContent = jsContent.replace(/import.*react-devtools.*\s/, '');
				// if (flag) {
				// 	console.log(jsContent);
				// }
				console.log(path.dirname(args.path));
				return {
					contents: jsContent,
					loader: 'tsx',
					resolveDir: path.dirname(args.path),
					watchFiles: [sourceFullPath]
				};
			}
		);
	}
};

//export default ScssModulesPlugin;
module.exports = {
	RemoveDevDepPlugin
};
