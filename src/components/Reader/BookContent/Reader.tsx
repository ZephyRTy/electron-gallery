import { useCallback, useEffect } from 'react';
import { readerOperator } from '../../../utils/data/galleryOperator';
import { TextDetail } from '../../../utils/data/TextDetail';
import { OpenInExplorerBtn } from '../../Gallery/Buttons';
import { Sidebar, SidebarContainer } from '../../Menu';
import { Back, CatalogBtn, Find, RegExpBtn, ShowMarksBtn } from '../Buttons';
import styles from '../style/reader.module.scss';
import { TextContent } from './TextContent';
export const Reader = () => {
	// eslint-disable-next-line no-unused-vars
	const menu = useCallback((fn: () => void, book: TextDetail) => {
		return (
			<SidebarContainer>
				<Sidebar menuPosition="middle">
					<Back />
					<RegExpBtn />
					<CatalogBtn />
					<ShowMarksBtn book={book} />
					<Find />
					<OpenInExplorerBtn handleClick={fn} />
				</Sidebar>
			</SidebarContainer>
		);
	}, []);
	useEffect(() => {
		readerOperator.titleUpdate();
	}, [readerOperator.packWillOpen()]);
	return (
		<main className={styles['reader'] + ' main-content'}>
			<TextContent renderMenu={menu} />
		</main>
	);
};
