import { useData } from 'syill';
import { stylesJoin } from '../../../utils/functions/functions';
import { catalogShowStore, marksShowStore } from '../../../utils/store';
import styles from '../style/catalog.module.scss';
import { SideCatalog } from './Catalog';
import { SideMarkDiv } from './SideMarkDiv';
export const SideEnter3D = (props: { chapter: number }) => {
	const [catalogShow, setCatalogShow] = useData(catalogShowStore);
	const [marksShow, setMarksShow] = useData(marksShowStore);
	return (
		<div
			className={stylesJoin(
				styles['side-wrap-3d-out'],
				marksShow || catalogShow ? '' : styles['hidden']
			)}
		>
			<div
				className={stylesJoin(
					styles['side-wrap-3d'],
					marksShow ? styles['bottom-side'] : styles['top-side']
				)}
			>
				<SideCatalog currentChapter={props.chapter} />
				<SideMarkDiv />
			</div>
		</div>
	);
};
