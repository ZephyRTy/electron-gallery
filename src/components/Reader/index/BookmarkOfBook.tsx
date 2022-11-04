import { useState } from 'react';
import { BookmarkOfBook } from '../../../types/global';
import { gotoHash } from '../../../utils/functions';
import { readerOperator } from '../../../utils/galleryOperator';
import styles from '../style/bookshelf.module.scss';
import { ShelfBookTitle } from './ShelfRow';
export const ShelfBookmark = (props: { bookItem: BookmarkOfBook }) => {
	const [marked, setMarked] = useState(true);
	return (
		<div
			className={styles['bookshelf-row-item']}
			title={props.bookItem.title}
		>
			<div
				className={
					styles['bookshelf-row-cover'] +
					(marked ? ' ' + styles['bookshelf-bookmark'] : '')
				}
				onClick={() => {
					readerOperator.mountBook(props.bookItem);
					gotoHash(props.bookItem.url);
					return;
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
				className={styles['bookshelf-bookmark-button']}
				onClick={() => {
					setMarked(!marked);
					readerOperator.UpdateBookmark(props.bookItem, !marked);
				}}
			></button>
		</div>
	);
};
