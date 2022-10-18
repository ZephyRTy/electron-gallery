import { useEffect, useMemo, useRef } from 'react';
import { readerOperator } from '../../../utils/galleryOperator';
import { Toast } from '../../Gallery/Toast';
import { Sidebar, SidebarContainer } from '../../Menu';
import { AddBookmark, Back, CatalogBtn } from '../Buttons';
import styles from '../style/reader.module.scss';
import { BookContent } from './Content';
export const Reader = () => {
	// eslint-disable-next-line no-unused-vars
	const bookmarkToast = useRef((arg: boolean) => {});
	const menu = useMemo(() => {
		return (
			<SidebarContainer>
				<Sidebar menuPosition="middle">
					<Back />
					<CatalogBtn />
					<AddBookmark bookmarkToast={bookmarkToast} />
				</Sidebar>
			</SidebarContainer>
		);
	}, []);
	useEffect(() => {
		readerOperator.titleUpdate();
	}, [readerOperator.current()]);
	return (
		<main className={styles['reader'] + ' main-content'}>
			{menu}
			<Toast handler={bookmarkToast} message="添加书签成功！" />
			<BookContent />
		</main>
	);
};
