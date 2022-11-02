import { useCallback, useEffect, useRef } from 'react';
import { readerOperator } from '../../../utils/galleryOperator';
import { OpenInExplorerBtn } from '../../Gallery/Buttons';
import { Toast } from '../../Gallery/Toast';
import { Sidebar, SidebarContainer } from '../../Menu';
import { AddBookmark, Back, CatalogBtn, Find } from '../Buttons';
import styles from '../style/reader.module.scss';
import { BookContent } from './Content';
export const Reader = () => {
	// eslint-disable-next-line no-unused-vars
	const bookmarkToast = useRef((arg: boolean) => {});
	const menu = useCallback((fn: () => void) => {
		return (
			<SidebarContainer>
				<Sidebar menuPosition="middle">
					<Back />
					<CatalogBtn />
					<AddBookmark bookmarkToast={bookmarkToast} />
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
			<Toast handler={bookmarkToast} message="添加书签成功！" />
			<BookContent renderMenu={(fn) => menu(fn)} />
		</main>
	);
};
