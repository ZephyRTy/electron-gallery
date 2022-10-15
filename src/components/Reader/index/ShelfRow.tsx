import { useState } from 'react';
import { Book } from '../../../types/global';
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
export const ShelfItem = (props: { bookItem: Book }) => {
	const [stared, setStared] = useState(props.bookItem.stared);
	if (!props.bookItem) {
		return null;
	}
	return (
		<div className={styles['bookshelf-row-item']}>
			<div
				className={
					styles['bookshelf-row-cover'] +
					(stared ? ' ' + styles['bookshelf-stared'] : '')
				}
				onClick={() => {
					readerOperator.mountBook(props.bookItem);
					if (isBookmarkOfBook(props.bookItem)) {
						gotoHash(props.bookItem.url);
						return;
					}
					gotoHash(`#/reader/book/${props.bookItem.id}`);
				}}
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
