import { useCallback, useEffect, useState } from 'react';
import { ReactComponent as BookmarkIcon } from '../../../icon/mark.svg';
import { Bookmark, ImageComponent } from '../../../types/global';
import { GalleryOperator } from '../../../utils/galleryOperator';
import styles from '../style/img.module.scss';
export const BookmarkItem: ImageComponent<Bookmark> = (props: {
	src: string;
	data: Bookmark;
	util: GalleryOperator;
}) => {
	const [marked, setMarked] = useState(true);
	const [changed, setChanged] = useState(false);
	useEffect(() => {
		if (changed) {
			props.util.bookmarksUpdate(props.data, marked);
		}
	}, [changed, marked, props.data, props.util]);
	const clickHandler = useCallback(() => {
		setMarked((v) => !v);
		setChanged(true);
	}, []);
	return (
		<div className={styles.img}>
			<div className={styles['img-wrapper']}>
				<a href={props.data.url}>
					<img alt="" src={props.src}></img>
				</a>
			</div>
			<a className={styles['pack-title']} href={props.data.url}>
				<span
					className={styles['pack-title-name']}
					title={props.data.title}
				>
					{props.data.title}
				</span>
				<span
					className={styles['pack-title-timestamp']}
					title={props.data.title}
				>
					{props.data.timeStamp}
				</span>
			</a>
			<span
				className={
					styles['bookmark-span'] +
					(marked ? ' ' + styles['marked'] : '')
				}
				onClick={clickHandler}
			>
				<BookmarkIcon />
			</span>
		</div>
	);
};
export default BookmarkItem;
