import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BasicData, Bookmark } from '../../../types/global';
import { FileOperator } from '../../../utils/fileOperator';
import { FileDrop } from '../FileDrop';
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
		fileOperator.getPacks(page, window.location.href).then((res) => {
			setPacks(res[0]);
			setTotal(res[1]);
		});
	}, [window.location.href, refresh]);
	return (
		<div className="gallery">
			<FileDrop util={fileOperator} />
			<ImgContainer
				inDir={window.location.href.includes('/directory/')}
				packs={packs}
				refresh={setRefresh}
				util={fileOperator}
			/>

			<PageNav current={page} total={Math.ceil(total / 20)} />
		</div>
	);
};
