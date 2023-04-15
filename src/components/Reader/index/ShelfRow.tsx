import { Book } from 'epubjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import favoriteCover from '../../../assets/cover/favorite.jpg';
import txtCover from '../../../assets/cover/Txt.jpg';
import { ReactComponent as DeleteIcon } from '../../../icon/cross.svg';
import { ReactComponent as StarIcon } from '../../../icon/star.svg';
import { ReactComponent as TrashIcon } from '../../../icon/trash.svg';
import { MetaBook, Mode } from '../../../types/global';
import { readerOperator } from '../../../utils/data/galleryOperator';
import { gotoHash, stylesJoin } from '../../../utils/functions/functions';
import { isBookmarkOfBook } from '../../../utils/functions/typeAssertion';
import { epubCoverCache } from '../../../utils/models';
import styles from '../style/bookshelf.module.scss';
import { BookTitle } from './BookTitle';
import { NewPackDot } from './NewPackDot';
export const ShelfBookTitle = (props: { title: string; index: number }) => {
	return (
		<span
			className={
				styles['book-item-title'] + ' ' + styles[`line-${props.index}`]
			}
		>
			{props.title}
		</span>
	);
};
export const ShelfItem = (props: {
	bookItem: MetaBook;
	isNew?: boolean;
	inSelect?: number;
	setInSelect?: any;
}) => {
	const { bookItem, inSelect, isNew, setInSelect } = props;
	const [stared, setStared] = useState(bookItem.stared);
	const flag = useRef({ id: null as any, isDown: false, holding: false });
	const id = useRef(null as any);
	const [confirmed, setConfirmed] = useState(false);

	const [src, setSrc] = useState(bookItem.stared ? favoriteCover : txtCover);
	const up = useCallback(
		(e: any) => {
			flag.current.isDown = false;
			clearTimeout(flag.current.id);
			if (!flag.current.holding && !inSelect && e.button === 0) {
				if (window.sessionStorage.getItem(bookItem.path)) {
					window.sessionStorage.removeItem(bookItem.path);
				}
				readerOperator.mountBook(bookItem);
				if (isBookmarkOfBook(bookItem)) {
					gotoHash(bookItem.url);
					return;
				}
				gotoHash(
					readerOperator.getProgress(bookItem.id) ||
						`#/reader/book/${bookItem.id}`
				);
			}
		},
		[bookItem.id, inSelect]
	);
	const down = useCallback(() => {
		if (readerOperator.getMode() === Mode.DirContent) {
			return;
		}
		flag.current.isDown = true;
		flag.current.holding = false;
		flag.current.id = setTimeout(() => {
			if (flag.current.isDown && !inSelect) {
				setInSelect(1);
				flag.current.holding = true;
			}
		}, 700);
	}, [props]);
	useEffect(() => {
		if (bookItem) setStared(bookItem.stared);
	}, [bookItem?.stared]);
	useEffect(() => {
		if (bookItem.path.endsWith('.epub')) {
			if (!epubCoverCache.has(bookItem.id)) {
				const e = new Book();
				e.open(bookItem.path).then(() => {
					e.coverUrl().then((url) => {
						setSrc(url || src);
						epubCoverCache.set(bookItem.id, url || src);
					});
				});
			} else {
				setSrc(epubCoverCache.get(bookItem.id)!);
			}
		}
	}, [bookItem]);
	const selectHandler = useCallback(
		(e: any) => {
			readerOperator.updateSelection(bookItem.id, e.target.checked);
		},
		[bookItem.id]
	);
	useEffect(() => {
		if (!bookItem.path.endsWith('.epub')) {
			setSrc(bookItem.stared ? favoriteCover : txtCover);
		}
	}, [stared]);
	if (!bookItem) {
		return null;
	}
	return (
		<div className={styles['bookshelf-row-item']}>
			<div
				className={stylesJoin(
					styles['bookshelf-row-cover'],
					stared ? styles['bookshelf-stared'] : '',
					'cool-div'
				)}
				onMouseDown={down}
				onMouseUp={up}
				title={bookItem.title}
			>
				<img
					className={stylesJoin(styles['book-cover'])}
					src={src}
				></img>
				<input
					className={stylesJoin(styles['check-box'], 'img__checkbox')}
					disabled={Boolean(bookItem.parent) || !inSelect}
					id={bookItem.id.toString()}
					onChange={selectHandler}
					style={{
						display: inSelect ? 'initial' : 'none'
					}}
					title={
						Boolean(bookItem.parent) || !inSelect
							? readerOperator.searchParentName(bookItem.parent)
							: undefined
					}
					type="checkbox"
				/>
				{isNew && <NewPackDot />}
			</div>
			<BookTitle title={bookItem.title} />
			<span className={styles['icon-span']}>
				<TrashIcon
					className={stylesJoin(
						styles['icon'],
						styles['icon--trash'],
						confirmed ? styles['icon--trash__confirmed'] : ''
					)}
					onClick={() => {
						if (confirmed) {
							readerOperator.removePack(bookItem);
							if (id) {
								clearTimeout(id.current);
								id.current = null;
							}
						} else {
							setConfirmed(true);
							id.current = setTimeout(() => {
								setConfirmed(false);
							}, 2000);
						}
					}}
				/>
				<StarIcon
					className={stylesJoin(
						styles['icon'],
						styles['icon--star'],
						stared ? styles['icon--star__stared'] : ''
					)}
					onClick={() => {
						setStared(!stared);
						readerOperator.updateStared(bookItem);
					}}
				/>
				{readerOperator.getMode() === Mode.DirContent ? (
					<DeleteIcon
						className={stylesJoin(
							styles['icon'],
							styles['icon--cross']
						)}
						onClick={() => {
							readerOperator.removeFileFromDir(
								bookItem.id,
								bookItem.parent!
							);
						}}
					/>
				) : null}
			</span>
		</div>
	);
};
