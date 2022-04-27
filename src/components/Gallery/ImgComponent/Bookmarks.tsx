import { useCallback, useEffect, useState } from 'react';
import { ReactComponent as BookmarkIcon } from '../../../icon/mark.svg';
import { Bookmark, ImageComponent } from '../../../types/global';
import { FileOperator } from '../../../utils/fileOperator';
import styles from '../style/img.module.scss';
export const BookmarkItem: ImageComponent<Bookmark> = (props: {
	src: string;
	data: Bookmark;
	util: FileOperator;
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
			<a href={props.data.url} className={styles['pack-title']}>
				<span
					title={props.data.title}
					className={styles['pack-title-name']}
				>
					{props.data.title}
				</span>
				<span
					title={props.data.title}
					className={styles['pack-title-timestamp']}
				>
					{props.data.timeStamp}
				</span>
			</a>
			<span
				onClick={clickHandler}
				className={
					styles['bookmark-span'] +
					(marked ? ' ' + styles['marked'] : '')
				}
			>
				<BookmarkIcon />
			</span>
		</div>
	);
};
