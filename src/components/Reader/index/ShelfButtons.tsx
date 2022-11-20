import { ReactComponent as DeleteIcon } from '../../../icon/delete.svg';
import styles from '../style/bookshelf.module.scss';
export const DeleteBtn = () => {
	return (
		<button className={styles['btn-delete']}>
			<DeleteIcon />
		</button>
	);
};
