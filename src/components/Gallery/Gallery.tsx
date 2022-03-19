/* eslint-disable no-extend-native */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as HomePage } from '../../icon/homepage.svg';
import { ReactComponent as Refresh } from '../../icon/refresh.svg';
import { useMysql } from '../../utils/useMysql';
import { ImgContainer } from './Img';
import { PageNav } from './PageNav';
import { Search } from './Search';
import './style/gallery.scss';

const fs = window.require('fs');
const { ipcRenderer } = window.require('electron');
const dialog = window.require('@electron/remote').dialog;
let flag = false;
const root = String.raw`D:\img\show_img\图片`;
// eslint-disable-next-line no-unused-vars
const cacheFunction = (): [(path: string) => string[], () => void] => {
	let pathInCache = '';
	let filesInCache: string[] = [];
	let fn = (path: string) => {
		if (pathInCache === path) {
			return filesInCache;
		}
		pathInCache = path;
		let files: string[] = fs.readdirSync(path);
		let content: { name: any; time: any }[] = [];
		files.forEach((v: any) => {
			let time = fs.statSync(path + `\\${v}`).mtime;
			content.push({ name: v, time: time });
		});
		content.sort((a, b) => (a.time > b.time ? -1 : 1));
		filesInCache = content.map((v) => v.name);
		return filesInCache;
	};
	let reset = () => {
		pathInCache = '';
		filesInCache = [];
	};
	return [fn, reset];
};
const [readDir, reset] = cacheFunction();
//const p = readDirAndSortByDate(root);
export const Gallery = () => {
	const [path, setPath] = useState(root);
	const [searchParam] = useSearchParams();
	const [total, setTotal] = useState(0);
	const [isShow, setIsShow] = useState(true);
	let search = searchParam.get('search');
	const p = useParams().page;
	const page = parseInt(
		searchParam.get('page')
			? (searchParam.get('page') as string)
			: p ?? '1',
		10
	);
	const [packs, setPacks] = useState([] as string[]);
	useMysql(page, setPacks, setTotal, search);

	useEffect(() => {
		ipcRenderer.on('action', (event: any, arg: string) => {
			if (flag) {
				return;
			}
			if (arg === 'open') {
				dialog
					.showOpenDialog({
						properties: ['openDirectory']
					})
					.then((res: { filePaths: string[] }) => {
						console.log(res.filePaths);
						setPath(res.filePaths[0]);
					});
			}
		});
		return () => {
			ipcRenderer.removeAllListeners('action');
		};
	}, []);
	return (
		<div className="gallery">
			<Search />
			<button
				className="homepage-btn icon"
				onClick={() => {
					setIsShow(false);
					window.location.href = '#/';
				}}
			>
				<HomePage></HomePage>
			</button>
			<button className="refresh-btn icon">
				<Refresh />
			</button>
			{search || !isShow ? (
				<span className="current-search">{`当前搜索：${search}`}</span>
			) : null}
			<ImgContainer packs={packs} path={path} />
			<PageNav total={Math.ceil(total / 20)} current={page} />
		</div>
	);
};
