/* eslint-disable no-unused-vars */
import { useContext, useEffect, useMemo, useState } from 'react';
import { useData } from 'syill';
import { lineHeight } from '../../../types/constant';
import { Chapter } from '../../../types/global';
import { stylesJoin } from '../../../utils/functions/functions';
import { catalogShowStore, marksShowStore } from '../../../utils/store';
import styles from '../style/catalog.module.scss';
import { TextContext } from './TextContent';
export const CatalogItem = (props: { chapter: Chapter; current: boolean }) => {
	const item = useMemo(() => {
		return (
			<li
				className={stylesJoin(
					styles['side-list-item'],
					styles['catalog-list-item'],
					props.current ? styles['current-chapter'] : '',
					styles['text-center']
				)}
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
export const SideCatalog = (props: { currentChapter: number }) => {
	const book = useContext(TextContext);
	const [catalog, setCatalog] = useState(book?.getCatalog() || []);
	const [show, setShow] = useData(catalogShowStore);
	const [marksShow, setMarksShow] = useData(marksShowStore);
	useEffect(() => {
		setCatalog(book?.getCatalog() || []);
	}, [book, book?.reg]);
	useEffect(() => {
		return () => {
			setShow(false);
		};
	}, []);
	return (
		<>
			<div
				className={stylesJoin(
					styles['side-enter-box'],
					show || marksShow ? '' : styles['hidden'],
					styles['side-enter']
				)}
			>
				<ul className={styles['side-list']}>
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
			</div>
		</>
	);
};
