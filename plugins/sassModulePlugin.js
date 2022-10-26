"use strict";
/* eslint-disable no-undef */
// Modified from: https://github.com/indooorsman/esbuild-css-modules-plugin
// eff4a500c56a45b1550887a8f7c20f57b01a46b7
// MIT License
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.ScssModulesPlugin = void 0;
var cssnano_1 = require("cssnano");
var postcss_1 = require("postcss");
var postcssModules = require("postcss-modules");
var sass = require("sass");
var path = require('path');
var crypto = require('crypto');
var fs = require('fs/promises');
var PLUGIN = 'esbuild-scss-modules-plugin';
var DefaultOptions = {
    inject: true,
    minify: false,
    cache: true,
    localsConvention: 'camelCaseOnly',
    generateScopedName: undefined,
    scssOptions: {},
    cssCallback: undefined
};
function buildScss(scssFullPath, sassOptions) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Compiling ".concat(scssFullPath, "..."));
                    return [4 /*yield*/, sass.compile(scssFullPath)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function buildScssModulesJS(scssFullPath, options) {
    return __awaiter(this, void 0, void 0, function () {
        var css, cssModulesJSON, result, classNames, hash, digest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, buildScss(scssFullPath, options.scssOptions)];
                case 1:
                    css = (_a.sent()).css;
                    cssModulesJSON = {};
                    return [4 /*yield*/, (0, postcss_1["default"])(__spreadArray([
                            postcssModules({
                                localsConvention: options.localsConvention,
                                generateScopedName: options.generateScopedName,
                                getJSON: function (cssSourceFile, json) {
                                    cssModulesJSON = __assign({}, json);
                                    return cssModulesJSON;
                                }
                            })
                        ], (options.minify
                            ? [
                                (0, cssnano_1["default"])({
                                    preset: 'default'
                                })
                            ]
                            : []), true)).process(css, {
                            from: scssFullPath,
                            map: false
                        })];
                case 2:
                    result = _a.sent();
                    if (!options.cssCallback) return [3 /*break*/, 4];
                    return [4 /*yield*/, options.cssCallback(result.css, cssModulesJSON)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    classNames = JSON.stringify(cssModulesJSON);
                    hash = crypto.createHash('sha256');
                    hash.update(result.css);
                    digest = hash.digest('hex');
                    return [2 /*return*/, "\n\tconst digest = '".concat(digest, "';\n\tconst classes = ").concat(classNames, ";\n\tconst css = `").concat(result.css, "`;\n\t").concat(options.inject &&
                            "\n\t(function() {\n\t  if (!document.getElementById(digest)) {\n\t    var ele = document.createElement('style');\n\t    ele.id = digest;\n\t    ele.textContent = css;\n\t    document.head.appendChild(ele);\n\t  }\n\t})();\n\t", "\n\texport default classes;\n\texport { css, digest, classes };\n\t  ")];
            }
        });
    });
}
var ScssModulesPlugin = function (options) {
    if (options === void 0) { options = {}; }
    return ({
        name: PLUGIN,
        setup: function (build) {
            var _this = this;
            var _a = build.initialOptions, outdir = _a.outdir, bundle = _a.bundle;
            var results = new Map();
            var fullOptions = __assign(__assign({}, DefaultOptions), options);
            build.onResolve({ filter: /\.modules?\.scss$/, namespace: 'file' }, function (args) { return __awaiter(_this, void 0, void 0, function () {
                var sourceFullPath, result;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            sourceFullPath = path.resolve(args.resolveDir, args.path);
                            if (results.has(sourceFullPath))
                                return [2 /*return*/, results.get(sourceFullPath)];
                            return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                                    var sourceExt, sourceBaseName, isOutdirAbsolute, absoluteOutdir, isEntryAbsolute, entryRelDir, targetSubpath, target, jsContent;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                sourceExt = path.extname(sourceFullPath);
                                                sourceBaseName = path.basename(sourceFullPath, sourceExt);
                                                if (bundle) {
                                                    return [2 /*return*/, {
                                                            path: args.path,
                                                            namespace: PLUGIN,
                                                            pluginData: {
                                                                sourceFullPath: sourceFullPath
                                                            }
                                                        }];
                                                }
                                                if (!outdir) return [3 /*break*/, 4];
                                                isOutdirAbsolute = path.isAbsolute(outdir);
                                                absoluteOutdir = isOutdirAbsolute
                                                    ? outdir
                                                    : path.resolve(args.resolveDir, outdir);
                                                isEntryAbsolute = path.isAbsolute(args.path);
                                                entryRelDir = isEntryAbsolute
                                                    ? path.dirname(path.relative(args.resolveDir, args.path))
                                                    : path.dirname(args.path);
                                                targetSubpath = absoluteOutdir.indexOf(entryRelDir) === -1
                                                    ? path.join(entryRelDir, "".concat(sourceBaseName, ".css.js"))
                                                    : "".concat(sourceBaseName, ".css.js");
                                                target = path.resolve(absoluteOutdir, targetSubpath);
                                                return [4 /*yield*/, buildScssModulesJS(sourceFullPath, fullOptions)];
                                            case 1:
                                                jsContent = _a.sent();
                                                return [4 /*yield*/, fs.mkdir(path.dirname(target), {
                                                        recursive: true
                                                    })];
                                            case 2:
                                                _a.sent();
                                                console.log("Writing ".concat(target, "..."));
                                                return [4 /*yield*/, fs.writeFile(target, jsContent)];
                                            case 3:
                                                _a.sent();
                                                _a.label = 4;
                                            case 4: return [2 /*return*/, {
                                                    path: sourceFullPath,
                                                    namespace: PLUGIN,
                                                    pluginData: { sourceFullPath: sourceFullPath }
                                                }];
                                        }
                                    });
                                }); })()];
                        case 1:
                            result = _a.sent();
                            if (fullOptions.cache)
                                results.set(sourceFullPath, result);
                            return [2 /*return*/, result];
                    }
                });
            }); });
            build.onLoad({ filter: /\.modules?\.scss$/, namespace: PLUGIN }, function (args) { return __awaiter(_this, void 0, void 0, function () {
                var sourceFullPath, contents;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            sourceFullPath = args.pluginData.sourceFullPath;
                            return [4 /*yield*/, buildScssModulesJS(sourceFullPath, fullOptions)];
                        case 1:
                            contents = _a.sent();
                            return [2 /*return*/, {
                                    contents: contents,
                                    loader: 'js',
                                    watchFiles: [sourceFullPath]
                                }];
                    }
                });
            }); });
        }
    });
};
exports.ScssModulesPlugin = ScssModulesPlugin;
exports["default"] = exports.ScssModulesPlugin;
