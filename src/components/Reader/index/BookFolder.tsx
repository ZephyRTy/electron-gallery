import { BookDirectory } from '../../../types/global';
import styles from '../style/bookshelf.module.scss';
import { ShelfBookTitle } from './ShelfRow';
export const ShelfBookFolder = (props: { bookItem: BookDirectory }) => {
	return (
		<div
			className={styles['bookshelf-row-item']}
			title={props.bookItem.title}
		>
			<div
				className={
					styles['bookshelf-row-cover'] +
					' ' +
					styles['bookshelf-row-folder']
				}
				onClick={() => {
					window.location.href =
						'#/reader?' + `directory=${props.bookItem.id}&page=1`;
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
			<button className={styles['bookshelf-folder-button']}></button>
		</div>
	);
};
