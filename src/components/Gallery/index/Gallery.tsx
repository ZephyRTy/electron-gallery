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
	const page = parseInt(
		searchParam.get('page') ? (searchParam.get('page') as string) : '1',
		10
	);
	useEffect(() => {
		fileOperator.register(setRefresh);
	}, []);
	useEffect(() => {
		fileOperator.savePrevPage(window.location.href);
		(async () => {
			let [res, total] = await fileOperator.getPacks(
				page,
				window.location.href
			);
			setPacks(res);
			setTotal(total);
		})();
	}, [window.location.href, refresh]);
	return (
		<div className="gallery">
			<ImgContainer
				packs={packs}
				util={fileOperator}
				refresh={setRefresh}
				inDir={window.location.href.includes('/directory/')}
			/>
			<PageNav total={Math.ceil(total / 20)} current={page} />
		</div>
	);
};
