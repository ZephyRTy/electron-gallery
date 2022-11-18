import { Book } from 'epubjs';
import { useEffect, useState } from 'react';
import { ReactComponent as BookmarkIcon } from '../../../icon/mark.svg';
import { BookmarkOfBook } from '../../../types/global';
import { readerOperator } from '../../../utils/data/galleryOperator';
import { gotoHash, stylesJoin } from '../../../utils/functions/functions';
import { epubCoverCache } from '../../../utils/models';
import styles from '../style/bookshelf.module.scss';
import { BookTitle } from './BookTitle';
export const ShelfBookmark = (props: { bookItem: BookmarkOfBook }) => {
	const [marked, setMarked] = useState(true);
	const [src, setSrc] = useState(
		'D:\\webDemo\\desktop-reader\\public\\bookmark-cover.jpg'
	);
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
				<img className={styles['book-cover']} src={src}></img>
			</div>
			<BookTitle title={props.bookItem.title} />
			<span className={styles['icon-span']}>
				<BookmarkIcon
					className={stylesJoin(
						styles['icon'],
						styles['icon--bookmark'],
						marked ? styles['icon--bookmark__marked'] : ''
					)}
					onClick={() => {
						setMarked(!marked);
						readerOperator.UpdateBookmark(props.bookItem, !marked);
					}}
				/>
			</span>
		</div>
	);
};
