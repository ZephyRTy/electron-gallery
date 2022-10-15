import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Book } from '../../../types/global';
import { isBookmarkOfBook } from '../../../utils/functions';
import { readerOperator as readerOp } from '../../../utils/galleryOperator';
import { Add, ConfigBtn, Refresh } from '../../Gallery/Buttons';
import { FileDrop } from '../../Gallery/FileDrop';
import { PageNav } from '../../Gallery/PageNav';
import { Menu, Sidebar, SidebarContainer } from '../../Menu';
import { GotoGalleryBtn } from '../Buttons';
import styles from '../style/bookshelf.module.scss';
import { ShelfBookmark } from './BookmarkOfBook';
import { ShelfItem } from './ShelfRow';
export const Bookshelf = () => {
	const [books, setBooks] = useState([] as Book[]);
	const [total, setTotal] = useState(0);
	const readerOperator = useRef(readerOp).current;
	const [searchParam] = useSearchParams();
	const [refresh, setRefresh] = useState(false);
	const page = parseInt(
		searchParam.get('page') ? (searchParam.get('page') as string) : '1',
		10
	);
	useEffect(() => {
		readerOperator.switchMainTable('book_list').then(() => {
			readerOperator.register(setRefresh);
		});
	}, []);
	useEffect(() => {
		readerOperator.savePrevPage(window.location.href);
		readerOperator.getPacks(page, window.location.href).then((res) => {
			setBooks([...res[0]]);
			setTotal(res[1]);
		});
	}, [window.location.href, refresh]);
	const topMenu = useMemo(() => {
		return (
			<Sidebar menuPosition="top">
				<Refresh util={readerOperator} />
				<Add util={readerOperator} />
				<ConfigBtn />
				<GotoGalleryBtn />
			</Sidebar>
		);
	}, []);
	return (
		<div className={styles['bookshelf'] + ' main-content'}>
			<SidebarContainer>
				{topMenu} <Menu type="reader" />
			</SidebarContainer>
			<FileDrop itemType="file" operator={readerOperator} />
			<main className={styles['bookshelf-container']}>
				<div className={styles['bookshelf-grid']}>
					{books.map((e, i) => {
						if (isBookmarkOfBook(e)) {
							return <ShelfBookmark bookItem={e} key={i} />;
						}
						return <ShelfItem bookItem={e} key={i} />;
					})}
				</div>
			</main>
			<PageNav current={page} total={Math.ceil(total / 20)} />
		</div>
	);
};
