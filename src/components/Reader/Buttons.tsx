import { useController } from 'syill';
import { ReactComponent as CatalogIcon } from '../../icon/catalog.svg';
import { ReactComponent as GotoGalleryIcon } from '../../icon/images.svg';
import { catalogVisibleStore } from '../../utils/store';
export const CatalogBtn = () => {
	const [, setVis] = useController(catalogVisibleStore);
	return (
		<button
			className={'btn-catalog icon'}
			onClick={() => {
				setVis(true);
			}}
		>
			<CatalogIcon />
		</button>
	);
};
export const GotoGalleryBtn = () => {
	return (
		<button
			className={'btn-goto-gallery icon'}
			onClick={() => {
				window.location.href = '#/gallery';
			}}
		>
			<GotoGalleryIcon />
		</button>
	);
};
