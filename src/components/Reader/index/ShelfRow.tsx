import { Book } from '../../../types/global';
import styles from '../style/bookshelf.module.scss';
export const ShelfRow = (props: { bookItems: Book[] }) => {
	return (
		<div className={styles['bookshelf-row']}>
			{props.bookItems.map((e, i) => (
				<ShelfRowItem bookItem={e} key={i} />
			))}
		</div>
	);
};

export const ShelfRowItem = (props: { bookItem: Book }) => {
	return (
		<div className={styles['bookshelf-row-item']}>
			<div className={styles['bookshelf-row-cover']}>
				<span
					className={
						styles['book-item-title'] + ' ' + styles['line-1']
					}
				>
					{props.bookItem.title.slice(0, 8)}
				</span>
				<span
					className={
						styles['book-item-title'] + ' ' + styles['line-2']
					}
				>
					{props.bookItem.title.slice(8, 16)}
				</span>
				<span
					className={
						styles['book-item-title'] + ' ' + styles['line-3']
					}
				>
					{props.bookItem.title.slice(20)}
				</span>
			</div>
			<div className={styles['bookshelf-title-container']}></div>
		</div>
	);
};
