/* eslint-disable no-extend-native */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BasicData, Bookmark } from '../../../types/global';
import { FileOperator } from '../../../utils/fileOperator';
import { PageNav } from '../PageNav';
import '../style/gallery.scss';
import { ImgContainer } from './ImgContainer';

//const p = readDirAndSortByDate(root);
export const Gallery = () => {
	const fileOperator = useRef(FileOperator.getInstance()).current;

	const [searchParam] = useSearchParams();
	const [total, setTotal] = useState(0);
	const [packs, setPacks] = useState([] as BasicData[] | Bookmark[]);
	const [refresh, setRefresh] = useState(false);
	let search = searchParam.get('search');
	let stared = searchParam.get('stared');
	let bookmark = searchParam.get('bookmark');
	let directory = searchParam.get('directory');
	const page = parseInt(
		searchParam.get('page') ? (searchParam.get('page') as string) : '1',
		10
	);
	useEffect(() => {
		fileOperator.register(setRefresh);
	}, []);
	useEffect(() => {
		fileOperator.savePrevPage(window.location.href);
		let res: BasicData[] = [];
		if (search) {
			res = fileOperator.searchPacks(search, page);
			setPacks(res);
			setTotal(fileOperator.searchTotal);
		} else if (stared) {
			res = fileOperator.getStared(page);
			setPacks(res);
			setTotal(fileOperator.staredTotal);
		} else if (bookmark) {
			res = fileOperator.getBookmarks(page);
			setPacks(res);
			setTotal(fileOperator.bookmarksTotal);
		} else if (directory) {
			let [res, total] = fileOperator.getDirectory(
				parseInt(directory),
				page
			);
			setPacks(res);
			setTotal(total);
		} else {
			res = fileOperator.getPacksNormally(page);
			setPacks(res);
			setTotal(fileOperator.total);
		}
	}, [page, search, stared, bookmark, directory, refresh]);

	return (
		<div className="gallery">
			{search ? (
				<span className="current-search">{`当前搜索：${search}`}</span>
			) : null}
			<ImgContainer
				packs={packs}
				util={fileOperator}
				refresh={setRefresh}
				inDir={Boolean(directory)}
			/>
			<PageNav total={Math.ceil(total / 20)} current={page} />
		</div>
	);
};
