import { useCallback, useEffect, useRef } from 'react';
import { BookDetail } from '../../../utils/BookDetail';
import { readerOperator } from '../../../utils/galleryOperator';
import { OpenInExplorerBtn } from '../../Gallery/Buttons';
import { Toast } from '../../Gallery/Toast';
import { Sidebar, SidebarContainer } from '../../Menu';
import { Back, Find, MarkBtn, RegExpBtn } from '../Buttons';
import styles from '../style/reader.module.scss';
import { BookContent } from './Content';
export const Reader = () => {
	// eslint-disable-next-line no-unused-vars
	const bookmarkToast = useRef((arg: boolean) => {});
	const menu = useCallback((fn: () => void, book: BookDetail) => {
		return (
			<SidebarContainer>
				<Sidebar menuPosition="middle">
					<Back />
					<RegExpBtn />
					<MarkBtn book={book} bookmarkToast={bookmarkToast} />
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
			<BookContent renderMenu={menu} />
		</main>
	);
};
