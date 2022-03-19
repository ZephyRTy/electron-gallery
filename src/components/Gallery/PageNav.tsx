import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as LeftArrow } from '../../icon/leftArrow.svg';
import { ReactComponent as LeftDoubleArrow } from '../../icon/leftDoubleArrow.svg';
import { ReactComponent as RightArrow } from '../../icon/rightArrow.svg';
import { ReactComponent as RightDoubleArrow } from '../../icon/rightDoubleArrow.svg';
import './style/nav.scss';
export const range = (start: number, end: number) => {
	if (start === end) {
		return [start];
	}
	let arr = [];
	for (let i = start; i <= end; i++) {
		arr.push(i);
	}
	return arr;
};
const PageSpan = (props: {
	search: string | null;
	page: number;
	current: number;
	special?: string;
	icon?: React.ReactElement;
	disable?: boolean;
}) => {
	return (
		<li
			className={'page-span' + (props.special ? ' ' + props.special : '')}
		>
			<a
				onClick={(e) => {
					if (props.disable) {
						e.preventDefault();
					}
				}}
				href={`#/${
					props.search
						? `?search=${props.search}&page=${props.page}`
						: 'gallery/' + props.page
				}`}
				className={
					(props.current === props.page ? 'active' : '') +
					' page-link' +
					(props.disable ? ' disable' : '')
				}
			>
				{props.icon ? props.icon : props.page}
			</a>
		</li>
	);
};
export const PageNav = (props: { total: number; current: number }) => {
	let pages = useMemo(
		() =>
			props.current <= 3
				? range(1, props.total < 5 ? props.total : 5)
				: props.current >= props.total - 2
				? range(props.total - 4, props.total)
				: range(props.current - 2, props.current + 2),
		[props]
	);
	const [searchParam, setSearch] = useSearchParams();
	let search = searchParam.get('search');
	return (
		<nav>
			<ul className="page-nav">
				<PageSpan
					icon={<LeftDoubleArrow />}
					search={search}
					page={1}
					current={props.current}
					special="first"
				/>

				<PageSpan
					icon={<LeftArrow />}
					search={search}
					page={props.current - 1}
					current={props.current}
					special="prev"
					disable={props.current === 1}
				/>
				{pages.map((v, i) => {
					return (
						<PageSpan
							current={props.current}
							page={v}
							key={i}
							search={search}
						/>
					);
				})}
				<span>...</span>
				<PageSpan
					search={search}
					page={props.total}
					current={props.current}
					special="total"
				/>
				<PageSpan
					icon={<RightArrow />}
					search={search}
					page={props.current + 1}
					current={props.current}
					special="next"
					disable={props.current === props.total}
				/>
				<PageSpan
					icon={<RightDoubleArrow />}
					search={search}
					page={props.total}
					current={props.current}
					special="last"
				/>
				<li className="page-span jump">
					<span>跳转至第</span>
					<input
						className="jump-input"
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								let value = (e.target as HTMLInputElement)
									.value;
								if (parseInt(value) > props.total) {
									value = props.total.toString();
								} else if (value < '1') {
									value = '1';
								}
								if (search) {
									(e.target as HTMLInputElement).value = '';
									(
										document.activeElement as HTMLElement
									).blur();
									setSearch({
										search: search,
										page: value
									});
									return;
								}
								window.location.href = `#/gallery/${value}`;
								(e.target as HTMLInputElement).value = '';
								(document.activeElement as HTMLElement).blur();
							}
						}}
					/>
					<span>页</span>
				</li>
			</ul>
		</nav>
	);
};
