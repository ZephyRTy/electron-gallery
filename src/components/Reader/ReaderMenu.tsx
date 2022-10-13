import { Sidebar } from '../Menu';
import { CatalogBtn, GotoGalleryBtn } from './Buttons';

export const ReaderMenu = () => {
	return (
		<Sidebar menuPosition="top">
			<GotoGalleryBtn />
			<CatalogBtn />
		</Sidebar>
	);
};
