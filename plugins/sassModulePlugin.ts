/* eslint-disable no-undef */
// Modified from: https://github.com/indooorsman/esbuild-css-modules-plugin
// eff4a500c56a45b1550887a8f7c20f57b01a46b7
// MIT License

import cssnano from 'cssnano';
import type * as esbuild from 'esbuild';
import postcss from 'postcss';
import * as postcssModules from 'postcss-modules';
import * as sass from 'sass';
const path = require('path');
const crypto = require('crypto');
const fsp = require('fs/promises');
const PLUGIN = 'esbuild-scss-modules-plugin';
const chalk = require('chalk');
type CssModulesOptions = Parameters<postcssModules>[0];
export type PluginOptions = {
	inject: boolean;
	minify: boolean;
	cache: boolean;

	localsConvention: CssModulesOptions['localsConvention'];
	generateScopedName: CssModulesOptions['generateScopedName'];

	scssOptions: sass.Options<'sync'>;
	cssCallback?: (css: string, map: { [className: string]: string }) => void;
};
const DefaultOptions: PluginOptions = {
	inject: true,
	minify: false,
	cache: true,

	localsConvention: 'camelCaseOnly',
	generateScopedName: undefined,

	scssOptions: {},
	cssCallback: undefined
};

async function buildScss(
	scssFullPath: string,
	sassOptions: sass.Options<'sync'>
): Promise<sass.CompileResult> {
	console.log(chalk.green(`Compiling ${scssFullPath}...`));
	return await sass.compile(scssFullPath);
}

async function buildScssModulesJS(
	scssFullPath: string,
	options: PluginOptions
): Promise<{ className: string; style: string }> {
	const css = (await buildScss(scssFullPath, options.scssOptions)).css;
	let cssModulesJSON = {};
	const result = await postcss([
		postcssModules({
			localsConvention: options.localsConvention,
			generateScopedName: options.generateScopedName,
			getJSON(cssSourceFile, json) {
				cssModulesJSON = { ...json };
				return cssModulesJSON;
			}
		}),
		...(options.minify
			? [
					cssnano({
						preset: 'default'
					})
			  ]
			: [])
	]).process(css, {
		from: scssFullPath,
		map: false
	});

	if (options.cssCallback)
		await options.cssCallback(result.css, cssModulesJSON);

	const classNames = JSON.stringify(cssModulesJSON);

	const hash = crypto.createHash('sha256');
	hash.update(result.css);
	if (result.css.startsWith('@charset')) {
		result.css = result.css.replace(/^@charset[^;]*;/, '');
	}
	const digest = hash.digest('hex');
	return {
		className: `
	const digest = '${digest}';
	const classes = ${classNames};
	export default classes;
	export { digest, classes };
	  `,
		style: result.css
	};
}

export const ScssModulesPlugin = (options: Partial<PluginOptions> = {}) =>
	({
		name: PLUGIN,
		setup(build) {
			const { outdir, bundle } = build.initialOptions;
			const results = new Map();
			const fullOptions = { ...DefaultOptions, ...options };

			build.onResolve(
				{ filter: /\.modules?\.scss$/, namespace: 'file' },
				async (args) => {
					const sourceFullPath = path.resolve(
						args.resolveDir,
						args.path
					);
					if (results.has(sourceFullPath))
						return results.get(sourceFullPath);

					const result = await (async () => {
						const sourceExt = path.extname(sourceFullPath);
						const sourceBaseName = path.basename(
							sourceFullPath,
							sourceExt
						);
						if (bundle) {
							return {
								path: args.path,
								namespace: PLUGIN,
								pluginData: {
									sourceFullPath
								}
							};
						}

						if (outdir) {
							const isOutdirAbsolute = path.isAbsolute(outdir);
							const absoluteOutdir = isOutdirAbsolute
								? outdir
								: path.resolve(args.resolveDir, outdir);
							const isEntryAbsolute = path.isAbsolute(args.path);
							const entryRelDir = isEntryAbsolute
								? path.dirname(
										path.relative(
											args.resolveDir,
											args.path
										)
								  )
								: path.dirname(args.path);

							const targetSubpath =
								absoluteOutdir.indexOf(entryRelDir) === -1
									? path.join(
											entryRelDir,
											`${sourceBaseName}.css.js`
									  )
									: `${sourceBaseName}.css.js`;
							const target = path.resolve(
								absoluteOutdir,
								targetSubpath
							);

							const jsContent = await buildScssModulesJS(
								sourceFullPath,
								fullOptions
							);
							await fsp.mkdir(path.dirname(target), {
								recursive: true
							});
							await fsp.writeFile(target, jsContent);
						}

						return {
							path: sourceFullPath,
							namespace: PLUGIN,
							pluginData: { sourceFullPath }
						};
					})();

					if (fullOptions.cache) results.set(sourceFullPath, result);
					return result;
				}
			);

			build.onLoad(
				{ filter: /\.modules?\.scss$/, namespace: PLUGIN },
				async (args) => {
					const { sourceFullPath } = args.pluginData;
					const { className: contents, style } =
						await buildScssModulesJS(sourceFullPath, fullOptions);
					const cssOutPath = path.resolve(outdir, '_modules.css');
					try {
						await fsp.appendFile(
							path.resolve(outdir, '_modules.css'),
							style
						);
					} catch {
						await fsp.writeFile(
							cssOutPath,
							'@charset "UTF-8";' + style
						);
					}

					return {
						contents,
						loader: 'js',
						watchFiles: [sourceFullPath]
					};
				}
			);
		}
	} as esbuild.Plugin);

export default ScssModulesPlugin;

//@ts-expect-error
declare module '*.modules.scss' {
	interface IClassNames {
		[className: string]: string;
	}
	const classes: IClassNames;
	const digest: string;
	const css: string;

	export default classes;
	export { classes, digest, css };
}
