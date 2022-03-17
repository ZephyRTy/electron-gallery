import { useMemo } from 'react';
import './style/nav.scss';
export const range = (start: number, end: number) => {
	let arr = [];
	for (let i = start; i <= end; i++) {
		arr.push(i);
	}
	return arr;
};

export const PageNav = (props: { total: number; current: number }) => {
	let pages = useMemo(
		() =>
			props.current <= 3
				? range(1, 5)
				: range(props.current - 2, props.current + 2),
		[props]
	);

	return (
		<nav>
			<ul className="page-nav">
				<li className="page-span">
					<a
						href={`#/gallery/${props.current - 1}`}
						className={'page-link'}
					>
						{'<<'}
					</a>
				</li>
				{pages.map((v, i) => {
					return (
						<li className="page-span" key={i}>
							<a
								href={`#/gallery/${v}`}
								className={
									(props.current === v ? 'active' : '') +
									' page-link'
								}
							>
								{v}
							</a>
						</li>
					);
				})}
				<li className="page-span">
					<a
						href={`#/gallery/${props.current + 1}`}
						className={'page-link'}
					>
						{'>>'}
					</a>
				</li>
			</ul>
		</nav>
	);
};
