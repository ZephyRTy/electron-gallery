import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useController } from 'syill';
import { readerConfig } from '../../../types/constant';
import { MetaBook } from '../../../types/global';
import { readerOperator as readerOp } from '../../../utils/data/galleryOperator';
import {
	isBookDir,
	isBookmarkOfBook
} from '../../../utils/functions/typeAssertion';
import { dialogActive, dirMapVisibleStore } from '../../../utils/store';
import { Config, DirMap } from '../../Dialog';
import {
	Add,
	Back,
	ConfigBtn,
	Refresh,
	SelectPacks
} from '../../Gallery/Buttons';
import { FileDrop } from '../../Gallery/FileDrop';
import { PageNav } from '../../Gallery/PageNav';
import { Menu, Sidebar, SidebarContainer } from '../../Menu';
import { GotoGalleryBtn } from '../Buttons';
import styles from '../style/bookshelf.module.scss';
import { ShelfBookFolder } from './BookFolder';
import { ShelfBookmark } from './BookmarkOfBook';
import { ShelfItem } from './ShelfRow';
export const Bookshelf = () => {
	const [books, setBooks] = useState([] as MetaBook[]);
	const [total, setTotal] = useState(0);
	const readerOperator = useRef(readerOp).current;
	const [searchParam] = useSearchParams();
	const [refresh, setRefresh] = useState(false);
	const [inSelect, setInSelect] = useState(0);

	const [, setDirMapVis] = useController(dirMapVisibleStore);
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
		document.querySelector('main')!.scrollTop = 0;
		readerOperator.savePrevPage(window.location.href);
		readerOperator.getPacks(page, window.location.href).then((res) => {
			readerOperator.titleUpdate();
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
				<Back inSelect={inSelect} setInSelect={setInSelect} />
				<GotoGalleryBtn />
				<SelectPacks
					handleClick={() => {
						if (dialogActive.active) {
							return;
						}
						dialogActive.setActive(true);
						setDirMapVis(true);
					}}
					inSelect={inSelect}
				/>
			</Sidebar>
		);
	}, [inSelect]);
	const dirMap = useMemo(() => {
		return <DirMap setInSelect={setInSelect} util={readerOperator} />;
	}, []);
	return (
		<div className={styles['bookshelf'] + ' main-content'}>
			{dirMap}
			<Config oldConfig={readerConfig} type="reader" />
			<SidebarContainer>
				{topMenu} <Menu type="reader" />
			</SidebarContainer>
			<FileDrop itemType="file" operator={readerOperator} />
			<main className={styles['bookshelf-container']}>
				<div className={styles['bookshelf-grid']}>
					{books.map((e) => {
						if (isBookmarkOfBook(e)) {
							return <ShelfBookmark bookItem={e} key={e.id} />;
						} else if (isBookDir(e)) {
							return <ShelfBookFolder bookItem={e} key={e.id} />;
						}
						return (
							<ShelfItem
								bookItem={e}
								inSelect={inSelect}
								key={e.id}
								setInSelect={setInSelect}
							/>
						);
					})}
				</div>
			</main>
			<PageNav current={page} total={Math.ceil(total / 20)} />
		</div>
	);
};
