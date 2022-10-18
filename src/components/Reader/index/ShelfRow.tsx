import { useCallback, useEffect, useRef, useState } from 'react';
import { Book, Mode } from '../../../types/global';
import { gotoHash, isBookmarkOfBook } from '../../../utils/functions';
import { readerOperator } from '../../../utils/galleryOperator';
import styles from '../style/bookshelf.module.scss';

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
	bookItem: Book;
	inSelect?: number;
	setInSelect?: any;
}) => {
	const [stared, setStared] = useState(props.bookItem.stared);
	const flag = useRef({ id: null as any, isDown: false, holding: false });
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
				gotoHash(`#/reader/book/${props.bookItem.id}`);
			}
		},
		[props.bookItem.id, props.inSelect]
	);
	const down = useCallback(() => {
		if (readerOperator.getMode() === Mode.InDir) {
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
	const selectHandler = useCallback(
		(e: any) => {
			readerOperator.selectionUpdate(props.bookItem.id, e.target.checked);
		},
		[props.bookItem.id]
	);
	if (!props.bookItem) {
		return null;
	}
	return (
		<div
			className={styles['bookshelf-row-item']}
			title={props.bookItem.title}
		>
			<div
				className={
					styles['bookshelf-row-cover'] +
					(stared ? ' ' + styles['bookshelf-stared'] : '')
				}
				// onClick={() => {
				// 	readerOperator.mountBook(props.bookItem);
				// 	if (isBookmarkOfBook(props.bookItem)) {
				// 		gotoHash(props.bookItem.url);
				// 		return;
				// 	}
				// 	gotoHash(`#/reader/book/${props.bookItem.id}`);
				// }}
				onMouseDown={down}
				onMouseUp={up}
			>
				<ShelfBookTitle
					index={1}
					title={props.bookItem?.title.slice(0, 8)}
				/>
				<ShelfBookTitle
					index={2}
					title={props.bookItem?.title.slice(8, 16)}
				/>
				<ShelfBookTitle
					index={3}
					title={props.bookItem?.title.slice(16)}
				/>
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
			<div className={styles['bookshelf-row-bar']}></div>
			<button
				className={styles['bookshelf-star-button']}
				onClick={() => {
					setStared(!stared);
					readerOperator.staredUpdate(props.bookItem);
				}}
			></button>
		</div>
	);
};
