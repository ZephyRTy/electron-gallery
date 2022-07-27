import { useState } from 'react';
import { ReactComponent as RegExpIcon } from '../../icon/regexp.svg';
import { ReactComponent as SearchIcon } from '../../icon/search.svg';
import { FileOperator } from '../../utils/fileOperator';
import styles from './style/header.module.scss';

export const WindowSearch = () => {
	const [reg, setReg] = useState(false);
	return (
		<div className={styles['search']}>
			<span className={styles['header__span--search']}>
				<SearchIcon />
			</span>
			<input
				className={styles['header__input--search']}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						FileOperator.getInstance().reg = reg;
						window.location.href =
							'#/gallery?search=' +
							(e.target as HTMLInputElement).value +
							`${reg ? '&regexp=true' : ''}`;
						(e.target as HTMLInputElement).value = '';
					}
				}}
			/>
			<input
				className={styles['header__input--regexp']}
				id={'regexp'}
				type="checkbox"
			/>
			<label
				className={styles['header__label--regexp']}
				htmlFor={'regexp'}
			>
				<span className={styles['header__span--regexp']}>
					<RegExpIcon
						onClick={() => {
							reg ? setReg(false) : setReg(true);
						}}
					/>
				</span>
			</label>
		</div>
	);
};
