import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Bookmark, NormalImage } from '../../../types/global';
import { GalleryOperator } from '../../../utils/galleryOperator';
import { FileDrop } from '../FileDrop';
import '../style/gallery.scss';
import { ImgContainer } from './ImgContainer';

//const p = readDirAndSortByDate(root);
export const Gallery = () => {
	const fileOperator = useRef(GalleryOperator.getInstance()).current;
	const [searchParam] = useSearchParams();
	const [total, setTotal] = useState(0);
	const [packs, setPacks] = useState([] as NormalImage[] | Bookmark[]);
	const [refresh, setRefresh] = useState(false);
	const page = parseInt(
		searchParam.get('page') ? (searchParam.get('page') as string) : '1',
		10
	);
	useEffect(() => {
		fileOperator.load();
		fileOperator.register(setRefresh);
	}, []);
	useEffect(() => {
		fileOperator.savePrevPage(window.location.href);
		fileOperator.getPacks(page, window.location.href).then((res) => {
			fileOperator.titleUpdate();
			setPacks(res[0]);
			setTotal(res[1]);
		});
	}, [window.location.href, refresh]);
	return (
		<div className="main-content">
			<FileDrop />
			<ImgContainer
				inDir={window.location.href.includes('/directory/')}
				packs={packs}
				page={page}
				refresh={setRefresh}
				total={total}
				util={fileOperator}
			/>
		</div>
	);
};
