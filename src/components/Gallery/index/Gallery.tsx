import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ImageBookmark, NormalImage } from '../../../types/global';
import { GalleryOperator } from '../../../utils/data/galleryOperator';
import '../../style/global.scss';
import { FileDrop } from '../FileDrop';
import { ImgContainer } from './ImgContainer';

//const p = readDirAndSortByDate(root);
export const Gallery = () => {
	const galleryOperator = useRef(GalleryOperator.getInstance()).current;
	const [searchParam] = useSearchParams();
	const [total, setTotal] = useState(0);
	const [packs, setPacks] = useState([] as NormalImage[] | ImageBookmark[]);
	const [refresh, setRefresh] = useState(false);
	const page = parseInt(
		searchParam.get('page') ? (searchParam.get('page') as string) : '1',
		10
	);
	useEffect(() => {
		galleryOperator.switchMainTable('pack_list').then(() => {
			galleryOperator.register(setRefresh);
		});
	}, []);
	useEffect(() => {
		galleryOperator.savePrevPage(window.location.href);
		galleryOperator.getPacks(page, window.location.href).then((res) => {
			galleryOperator.titleUpdate();
			setPacks(res[0]);
			setTotal(res[1]);
		});
	}, [window.location.href, refresh]);
	return (
		<div className="main-content">
			<FileDrop itemType="folder" operator={galleryOperator} />
			<ImgContainer
				inDir={window.location.href.includes('/directory/')}
				packs={packs}
				page={page}
				refresh={setRefresh}
				total={total}
				util={galleryOperator}
			/>
		</div>
	);
};
