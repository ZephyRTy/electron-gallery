/* eslint-disable no-unused-vars */
import { useContext, useEffect, useMemo, useState } from 'react';
import { useData } from 'syill';
import { lineHeight } from '../../../types/constant';
import { Chapter } from '../../../types/global';
import { stylesJoin } from '../../../utils/functions/functions';
import { catalogShowStore } from '../../../utils/store';
import styles from '../style/catalog.module.scss';
import { BookContext } from './Content';
const CatalogItem = (props: { chapter: Chapter; current: boolean }) => {
	const item = useMemo(() => {
		return (
			<li
				className={stylesJoin(
					styles['side-list-item'],
					styles['catalog-list-item'],
					props.current ? styles['current-chapter'] : ''
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
	const book = useContext(BookContext);
	const [catalog, setCatalog] = useState(book?.getCatalog() || []);
	const [show, setShow] = useData(catalogShowStore);
	useEffect(() => {
		setCatalog(book?.getCatalog() || []);
	}, [book, book?.reg]);
	return (
		<>
			<div
				className={stylesJoin(
					styles['side-enter-box'],
					show ? '' : styles['hidden'],
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
