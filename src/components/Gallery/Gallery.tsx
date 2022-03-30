/* eslint-disable no-extend-native */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as Add } from '../../icon/add.svg';
import { ReactComponent as Back } from '../../icon/back.svg';
import { ReactComponent as HomePage } from '../../icon/homepage.svg';
import { ReactComponent as Refresh } from '../../icon/refresh.svg';
import { ReactComponent as Stared } from '../../icon/stared.svg';
import { Data, FileOperator } from '../../utils/fileOperator';
import { ImgContainer } from './Img';
import { Menu } from './Menu';
import { PageNav } from './PageNav';
import { Search } from './Search';
import './style/gallery.scss';

//const p = readDirAndSortByDate(root);
export const Gallery = () => {
	const fileOperator = useRef(FileOperator.getInstance()).current;
	const fileInput = useRef(null);
	const [searchParam] = useSearchParams();
	const [total, setTotal] = useState(0);
	const [refresh, setRefresh] = useState(false);
	const [packs, setPacks] = useState([] as Data[]);
	let search = searchParam.get('search');
	let stared = searchParam.get('stared');
	const navigate = useNavigate();
	const page = parseInt(
		searchParam.get('page') ? (searchParam.get('page') as string) : '1',
		10
	);
	useLayoutEffect(() => {
		(fileInput.current as any).setAttribute('webkitdirectory', '');
		(fileInput.current as any).setAttribute('directory', '');
	}, []);
	useEffect(() => {
		fileOperator.savePrevPage(window.location.href);
		let res: Data[] = [];
		if (search) {
			res = fileOperator.search(search, page);
			setTotal(fileOperator.searchTotal);
			setPacks(res);
		} else if (stared) {
			res = fileOperator.getStared(page);
			setPacks(res);
			setTotal(fileOperator.staredTotal);
		} else {
			res = fileOperator.get(page);
			setPacks(res);
			setTotal(fileOperator.total);
		}
	}, [page, search, stared, refresh]);

	return (
		<div className="gallery">
			<Search />
			<Menu>
				<button
					className="homepage-btn icon"
					onClick={() => {
						window.location.href = '#/';
					}}
				>
					<HomePage />
				</button>
				<button
					className="back-btn icon"
					onClick={() => {
						navigate(-1);
					}}
				>
					<Back />
				</button>
				<button
					className="stared-btn icon"
					onClick={() => {
						window.location.href = '#/gallery?stared=true&page=1';
					}}
				>
					<Stared />
				</button>
				<input
					id="file-input"
					type={'file'}
					onChange={(e) => {
						let path = (e.target as any).files[0].path
							?.split('\\')
							.slice(0, -1)
							.join('\\');
						let cover = (e.target as any).files[0].name;
						let title = path.split('\\').pop();
						fileOperator.addNewPack({ path, cover, title });
						setRefresh(!refresh);
					}}
					ref={fileInput}
				/>

				<button className="add-btn icon">
					<label htmlFor="file-input">
						<Add />
					</label>
				</button>
				<button
					className="refresh-btn icon"
					onClick={() => {
						fileOperator.refresh();
						setRefresh(!refresh);
					}}
				>
					<Refresh />
				</button>
			</Menu>

			{search ? (
				<span className="current-search">{`当前搜索：${search}`}</span>
			) : null}
			<ImgContainer packs={packs} util={fileOperator} />
			<PageNav total={Math.ceil(total / 20)} current={page} />
		</div>
	);
};
