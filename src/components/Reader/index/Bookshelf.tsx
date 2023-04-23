import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useController } from 'syill';
import { magicCode, readerConfig } from '../../../types/constant';
import { MetaBook } from '../../../types/global';
import { readerOperator as readerOp } from '../../../utils/data/galleryOperator';
import {
	isBookDir,
	isBookmarkOfBook
} from '../../../utils/functions/typeAssertion';
import { dialogActive, dirMapVisibleStore } from '../../../utils/store';
import { ClearConfirmDialog, Config, DirMap } from '../../Dialog';
import {
	Add,
	Back,
	ClearBtn,
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

const path = window.require('path');
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
		const { ipcRenderer } = window.require('electron');
		ipcRenderer.on('open-url', (event, url: string) => {
			if (path.extname(url) === '.txt') {
				readerOp.addNewPack(
					[{ path: url, title: path.basename(url, '.txt') }],
					false
				);
			}
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
	const TopMenu = useCallback(() => {
		return (
			<Sidebar menuPosition="top">
				<Back inSelect={inSelect} setInSelect={setInSelect} />
				{window.localStorage.getItem('magicCode') === magicCode ? (
					<GotoGalleryBtn />
				) : (
					<></>
				)}
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
	const BottomMenu = useCallback(() => {
		return (
			<Sidebar menuPosition="bottom">
				<Add util={readerOperator} />
				<ConfigBtn />
			</Sidebar>
		);
	}, []);
	const dirMap = useMemo(() => {
		return <DirMap setInSelect={setInSelect} util={readerOperator} />;
	}, []);
	return (
		<div className={styles['bookshelf'] + ' main-content'}>
			{dirMap}
			<ClearConfirmDialog util={readerOperator} />
			<Config oldConfig={readerConfig} type="reader" />
			<SidebarContainer>
				<TopMenu /> <Menu type="reader" />
				<BottomMenu />
			</SidebarContainer>
			<FileDrop itemType="file" operator={readerOperator} />
			<Refresh util={readerOperator} />
			{readerOperator.getMode() === 'Bookmark' ? (
				<ClearBtn util={readerOperator} />
			) : null}
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
								isNew={!!window.sessionStorage.getItem(e.path)}
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
