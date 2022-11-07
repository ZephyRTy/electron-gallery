import { useState } from 'react';
import { ReactComponent as RegExpIcon } from '../icon/regexp.svg';
import { ReactComponent as SearchIcon } from '../icon/search.svg';
import { setSearchParams } from '../utils/functions/functions';
import { currentOperator } from '../utils/store';
import styles from './style/header.module.scss';

export const GallerySearch = () => {
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
						if (!currentOperator.op) {
							return false;
						}
						currentOperator.op.reg = reg;
						window.location.href = setSearchParams(
							window.location.href.includes('#/reader')
								? '#/reader'
								: '#/gallery',
							{
								search: (e.target as HTMLInputElement).value,
								regexp: reg ? 'true' : '',
								mode: currentOperator.op.getMode()
							}
						);
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
