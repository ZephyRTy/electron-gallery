import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchIcon from '../../icon/search.svg';
export const Search = () => {
	const [hidden, setHidden] = useState(true);
	const [, setSearch] = useSearchParams();
	return (
		<div className={'search' + (hidden ? ' hidden' : '')}>
			<button
				onClick={() => {
					setHidden(!hidden);
				}}
				className={'search-btn'}
			>
				<SearchIcon />
			</button>
			<input
				className={'search-input' + (hidden ? ' hidden' : '')}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						setSearch({
							search: (e.target as HTMLInputElement).value,
							page: '1'
						});
						(e.target as HTMLInputElement).value = '';
						setHidden(true);
					}
				}}
			/>
		</div>
	);
};
