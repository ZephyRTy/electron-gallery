import { ReactComponent as SearchIcon } from '../../icon/search.svg';
import styles from './style/header.module.scss';

export const WindowSearch = () => {
	return (
		<div className={styles['search']}>
			<span>
				<SearchIcon />
			</span>
			<input
				className={styles['search-input']}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						window.location.href =
							'#/gallery?search=' +
							(e.target as HTMLInputElement).value;
						(e.target as HTMLInputElement).value = '';
					}
				}}
			/>
		</div>
	);
};
