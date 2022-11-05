/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from 'react';
import { lineHeight } from '../../../types/constant';
import { Chapter } from '../../../types/global';
import { BookDetail } from '../../../utils/BookDetail';
import styles from '../style/catalog.module.scss';
const CatalogItem = (props: { chapter: Chapter; current: boolean }) => {
	const item = useMemo(() => {
		return (
			<li
				className={
					styles['catalog-list-item'] +
					(props.current ? ' ' + styles['current-chapter'] : '')
				}
				onClick={() => {
					document.querySelector('#reader-scroll-ele')!.scrollTop =
						props.chapter.index * lineHeight;
				}}
				title={props.chapter.title}
			>
				<span>{props.chapter.title}</span>
			</li>
		);
	}, [props.chapter, props.current]);
	return <>{item}</>;
};
export const SideCatalog = (props: {
	book: BookDetail;
	currentChapter: number;
}) => {
	const [catalog, setCatalog] = useState(props.book?.getCatalog() || []);
	const [show, setShow] = useState(false);
	useEffect(() => {
		setCatalog(props.book?.getCatalog() || []);
	}, [props.book, props.book?.reg]);
	return (
		<>
			<div
				className={
					styles['catalog-container'] +
					(show ? '' : ' ' + styles['hidden'])
				}
			>
				<ul className={styles['catalog-list']}>
					{catalog.map((e, i) => {
						return (
							<CatalogItem
								chapter={e}
								current={i === props.currentChapter}
								key={e.index}
							/>
						);
					})}
				</ul>
				<button
					className={styles['catalog-show-btn']}
					onClick={() => {
						setShow(!show);
					}}
				/>
			</div>
		</>
	);
};
