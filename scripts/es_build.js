/* eslint-disable no-undef */
const svgrPlugin = require('esbuild-plugin-svgr');
const sassPlugin = require('esbuild-plugin-sass');
const { ScssModulesPlugin } = require('../plugins/sassModulePlugin');
require('esbuild')
	.build({
		entryPoints: ['./src/index.tsx'],
		bundle: true,
		outdir: './dist',
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
		]
	})
	.catch(() => process.exit(1));
