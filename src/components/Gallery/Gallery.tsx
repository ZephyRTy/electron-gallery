/* eslint-disable no-extend-native */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as HomePage } from '../../icon/homepage.svg';
import { ReactComponent as Refresh } from '../../icon/refresh.svg';
import { ImgContainer } from './Img';
import { PageNav } from './PageNav';
import { Search } from './Search';
import './style/gallery.scss';

const fs = window.require('fs');
// const { ipcRenderer } = window.require('electron');
// const dialog = window.require('@electron/remote').dialog;
// let flag = false;
const root = String.raw`D:\img\show_img\图片`;
//const p = readDirAndSortByDate(root);
export const Gallery = () => {
	const cache = useRef({
		index: [] as number[],
		packs: [] as string[][],
		total: 0,
		searchParams: { key: '', res: [] as string[], total: 0 },
		get(index: number) {
			if (this.index.includes(index)) {
				return this.packs[this.index.indexOf(index)];
			}
			let files = fs
				.readFileSync(
					'D:\\webDemo\\desktop-reader\\catalog.txt',
					'utf-8'
				)
				.split('\n');
			if (this.total === 0) {
				this.total = files.length;
			}
			this.index = [];
			this.packs = [];
			for (let page = index; page < index + 5; page++) {
				this.packs.push(files.slice((page - 1) * 20, page * 20));
				this.index.push(page);
			}
			return this.packs[0];
		},
		search(key: string, page: number) {
			if (this.searchParams.key === key) {
				return this.searchParams.res.slice((page - 1) * 20, page * 20);
			}
			this.searchParams.key = key;
			this.searchParams.res = [];
			let files: string[] = fs
				.readFileSync(
					'D:\\webDemo\\desktop-reader\\catalog.txt',
					'utf-8'
				)
				.split('\n');
			let result = files.filter((item: string | string[]) =>
				item.includes(key)
			);
			this.searchParams.res = result;
			this.searchParams.total = result.length;
			return result.slice((page - 1) * 20, page * 20);
		}
	});
	const [path] = useState(root);
	const [searchParam] = useSearchParams();
	const [total, setTotal] = useState(0);
	const [packs, setPacks] = useState([] as string[]);
	let search = searchParam.get('search');
	const p = useParams().page;
	const page = parseInt(
		searchParam.get('page')
			? (searchParam.get('page') as string)
			: p ?? '1',
		10
	);
	useEffect(() => {
		// if (!isShow) {
		// 	setIsShow(true);
		// 	return;
		// }
		let res = [];
		if (search) {
			res = cache.current.search(search, page);
			setTotal(cache.current.searchParams.total);
			setPacks(res);
		} else {
			res = cache.current.get(page);
			setPacks(res);
			setTotal(cache.current.total);
		}
	}, [page, search]);
	// useEffect(() => {
	// 	ipcRenderer.on('action', (event: any, arg: string) => {
	// 		if (flag) {
	// 			return;
	// 		}
	// 		if (arg === 'open') {
	// 			dialog
	// 				.showOpenDialog({
	// 					properties: ['openDirectory']
	// 				})
	// 				.then((res: { filePaths: string[] }) => {
	// 					console.log(res.filePaths);
	// 					setPath(res.filePaths[0]);
	// 				});
	// 		}
	// 	});
	// 	return () => {
	// 		ipcRenderer.removeAllListeners('action');
	// 	};
	// }, []);
	return (
		<div className="gallery">
			<Search />
			<button
				className="homepage-btn icon"
				onClick={() => {
					window.location.href = '#/';
				}}
			>
				<HomePage></HomePage>
			</button>
			<button className="refresh-btn icon">
				<Refresh />
			</button>
			{search ? (
				<span className="current-search">{`当前搜索：${search}`}</span>
			) : null}
			<ImgContainer packs={packs} path={path} />
			<PageNav total={Math.ceil(total / 20)} current={page} />
		</div>
	);
};
