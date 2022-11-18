import { BookDirectory } from '../../../types/global';
import styles from '../style/bookshelf.module.scss';
import { BookTitle } from './BookTitle';
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
				<img
					className={styles['book-cover']}
					src="D:\webDemo\desktop-reader\public\folder-cover.jpg"
				></img>
			</div>
			<BookTitle title={props.bookItem.title} />
		</div>
	);
};
