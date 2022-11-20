import styles from '../style/bookshelf.module.scss';
export const BookTitle = (props: { title: string }) => {
	return (
		<div className={styles['book-item-title-wrap']}>
			<span className={styles['book-item-title']} title={props.title}>
				{props.title.slice(0, 20) +
					(props.title.length > 20 ? '...' : '')}
			</span>
		</div>
	);
};
