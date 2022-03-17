/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { ImgContainer } from './Img';
import { PageNav } from './PageNav';
import './style/gallery.scss';
const fs = window.require('fs');
const { ipcRenderer } = window.require('electron');
const dialog = window.require('@electron/remote').dialog;
let flag = false;
const root = String.raw`D:\img\show_img\图片`;
const cacheFunction = () => {
	let pathInCache = '';
	let filesInCache = [];
	return (path: string) => {
		if (pathInCache === path) {
			return filesInCache;
		}
		pathInCache = path;
		let files = fs.readdirSync(path);
		let content = [];
		files.forEach((v: any) => {
			let time = fs.statSync(path + `\\${v}`).mtime;
			content.push({ name: v, time: time });
		});
		content.sort((a, b) => (a.time > b.time ? -1 : 1));
		filesInCache = content.map((v) => v.name);
		return filesInCache;
	};
};
const readDirAndSortByDate = cacheFunction();
//const p = readDirAndSortByDate(root);
export const Gallery = () => {
	const [path, setPath] = useState(root);
	let packs = useMemo(() => readDirAndSortByDate(path), [path]);
	const page = parseInt(useParams().page ?? '1', 10);
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
	// useEffect(() => {
	// 	setPacks(fs.readdirSync(path));
	// 	console.log(path);
	// }, [path]);
	return (
		<div className="gallery">
			<ImgContainer
				packs={packs.slice(20 * (page - 1), 20 * page)}
				path={path}
			/>
			<PageNav total={Math.ceil(packs.length / 20)} current={page} />
		</div>
	);
};
