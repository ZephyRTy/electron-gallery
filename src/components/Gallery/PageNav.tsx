/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
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
	let arr: number[] = [];
	for (let i = start; i <= end; i++) {
		arr.push(i);
	}
	return arr;
};
const parseQueryString = (url: string, page: number) => {
	let href = '#';
	if (url.includes('#')) {
		href += url.split('#')[1];
	}
	if (!url.includes('page')) {
		if (url.includes('?')) {
			return href + '&page=' + page;
		}
		return href + '?page=' + page;
	}
	return href.replace(/page=[0-9]+/, 'page=' + page);
};
export const PageSpan = (props: {
	params: {
		search?: string | null;
		stared?: string | null;
		pack?: string;
	};
	page: number;
	currentPage: number;
	special?: string;
	icon?: React.ReactElement;
	disable?: boolean;
}) => {
	return (
		<li
			className={'page-span' + (props.special ? ' ' + props.special : '')}
		>
			<a
				className={
					(props.currentPage === props.page ? 'active' : '') +
					' page-link' +
					(props.disable ? ' disable' : '')
				}
				href={parseQueryString(window.location.href, props.page)}
				onClick={(e) => {
					if (props.disable) {
						e.preventDefault();
					}
				}}
			>
				{props.icon ? props.icon : props.page}
			</a>
		</li>
	);
};
export const PageNav = (props: {
	total: number;
	current: number;
	pack?: string;
}) => {
	let pages = useMemo(
		() =>
			props.current <= 3
				? range(1, props.total < 5 ? props.total : 5)
				: props.current >= props.total - 2
				? range(props.total - 4 || 1, props.total)
				: range(props.current - 2 || 1, props.current + 2),
		[props]
	);
	const [searchParam, setSearch] = useSearchParams();
	let search = searchParam.get('search');
	let stared = searchParam.get('stared');
	return (
		<nav>
			<ul className="page-nav">
				<PageSpan
					currentPage={props.current}
					icon={<LeftDoubleArrow />}
					page={1}
					params={{ search, stared, pack: props.pack }}
					special="first"
				/>

				<PageSpan
					currentPage={props.current}
					disable={props.current === 1}
					icon={<LeftArrow />}
					page={props.current - 1}
					params={{ search, stared, pack: props.pack }}
					special="prev"
				/>
				{pages.map((v, i) => {
					return (
						<PageSpan
							currentPage={props.current}
							key={i}
							page={v}
							params={{ search, stared, pack: props.pack }}
						/>
					);
				})}
				<span>...</span>
				<PageSpan
					currentPage={props.current}
					page={props.total}
					params={{ search, stared, pack: props.pack }}
					special="total"
				/>
				<PageSpan
					currentPage={props.current}
					disable={props.current === props.total}
					icon={<RightArrow />}
					page={props.current + 1}
					params={{ search, stared, pack: props.pack }}
					special="next"
				/>
				<PageSpan
					currentPage={props.current}
					icon={<RightDoubleArrow />}
					page={props.total}
					params={{ search, stared, pack: props.pack }}
					special="last"
				/>
				<li className="page-span jump">
					<span>????????????</span>
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
								} else if (stared) {
									(e.target as HTMLInputElement).value = '';
									(
										document.activeElement as HTMLElement
									).blur();
									setSearch({
										stared: 'true',
										page: value
									});
									return;
								}
								window.location.href = parseQueryString(
									window.location.href,
									parseInt(value)
								);
								(e.target as HTMLInputElement).value = '';
								(document.activeElement as HTMLElement).blur();
							}
						}}
					/>
					<span>???</span>
				</li>
			</ul>
		</nav>
	);
};
