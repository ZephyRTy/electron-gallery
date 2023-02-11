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
	inSelect?: number;
	setInSelect?: any;
}) => {
	const [stared, setStared] = useState(props.bookItem.stared);
	const flag = useRef({ id: null as any, isDown: false, holding: false });
	const id = useRef(null as any);
	const [confirmed, setConfirmed] = useState(false);
	const [src, setSrc] = useState(
		props.bookItem.stared ? favoriteCover : txtCover
	);
	const up = useCallback(
		(e: any) => {
			flag.current.isDown = false;
			clearTimeout(flag.current.id);
			if (!flag.current.holding && !props.inSelect && e.button === 0) {
				readerOperator.mountBook(props.bookItem);
				if (isBookmarkOfBook(props.bookItem)) {
					gotoHash(props.bookItem.url);
					return;
				}
				gotoHash(
					readerOperator.getProgress(props.bookItem.id) ||
						`#/reader/book/${props.bookItem.id}`
				);
			}
		},
		[props.bookItem.id, props.inSelect]
	);
	const down = useCallback(() => {
		if (readerOperator.getMode() === Mode.DirContent) {
			return;
		}
		flag.current.isDown = true;
		flag.current.holding = false;
		flag.current.id = setTimeout(() => {
			if (flag.current.isDown && !props.inSelect) {
				props.setInSelect(1);
				flag.current.holding = true;
			}
		}, 700);
	}, [props]);
	useEffect(() => {
		if (props.bookItem) setStared(props.bookItem.stared);
	}, [props.bookItem?.stared]);
	useEffect(() => {
		if (props.bookItem.path.endsWith('.epub')) {
			if (!epubCoverCache.has(props.bookItem.id)) {
				const e = new Book();
				e.open(props.bookItem.path).then(() => {
					e.coverUrl().then((url) => {
						setSrc(url || src);
						epubCoverCache.set(props.bookItem.id, url || src);
					});
				});
			} else {
				setSrc(epubCoverCache.get(props.bookItem.id)!);
			}
		}
	}, [props.bookItem]);
	const selectHandler = useCallback(
		(e: any) => {
			readerOperator.updateSelection(props.bookItem.id, e.target.checked);
		},
		[props.bookItem.id]
	);
	useEffect(() => {
		if (!props.bookItem.path.endsWith('.epub')) {
			setSrc(props.bookItem.stared ? favoriteCover : txtCover);
		}
	}, [stared]);
	if (!props.bookItem) {
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
				title={props.bookItem.title}
			>
				<img className={styles['book-cover']} src={src}></img>
				<input
					className={styles['check-box'] + ' img__checkbox'}
					disabled={Boolean(props.bookItem.parent) || !props.inSelect}
					id={props.bookItem.id.toString()}
					onChange={selectHandler}
					style={{
						display: props.inSelect ? 'initial' : 'none'
					}}
					title={
						Boolean(props.bookItem.parent) || !props.inSelect
							? readerOperator.searchParentName(
									props.bookItem.parent
							  )
							: undefined
					}
					type="checkbox"
				/>
			</div>
			<BookTitle title={props.bookItem.title} />
			<span className={styles['icon-span']}>
				<TrashIcon
					className={stylesJoin(
						styles['icon'],
						styles['icon--trash'],
						confirmed ? styles['icon--trash__confirmed'] : ''
					)}
					onClick={() => {
						if (confirmed) {
							readerOperator.removePack(props.bookItem);
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
						readerOperator.updateStared(props.bookItem);
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
								props.bookItem.id,
								props.bookItem.parent!
							);
						}}
					/>
				) : null}
			</span>
		</div>
	);
};
