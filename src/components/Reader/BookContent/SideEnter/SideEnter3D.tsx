/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useData } from 'syill';
import { stylesJoin } from '../../../../utils/functions/functions';
import { catalogShowStore, marksShowStore } from '../../../../utils/store';
import styles from '../../style/catalog.module.scss';
import { SideCatalog } from './Catalog';
// eslint-disable-next-line no-undef
export const SideEnter3D = (props: {
	// eslint-disable-next-line no-unused-vars
	renderMarkDiv: (...args: any[]) => JSX.Element;
	renderCatalog?: (...args: any[]) => JSX.Element;
}) => {
	const [catalogShow] = useData(catalogShowStore);
	const [marksShow] = useData(marksShowStore);
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
				<SideCatalog />
				<props.renderMarkDiv />
			</div>
		</div>
	);
};
