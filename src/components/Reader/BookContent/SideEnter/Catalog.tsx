/* eslint-disable no-unused-vars */
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useController, useData } from 'syill';
import { lineHeight, typeSetting } from '../../../../types/constant';
import { Chapter } from '../../../../types/global';
import { stylesJoin } from '../../../../utils/functions/functions';
import {
	catalogShowStore,
	chapterStore,
	marksShowStore
} from '../../../../utils/store';
import styles from '../../style/catalog.module.scss';
import { TextContext } from '../TextContent';
export const CatalogItem = (props: {
	chapter: Chapter;
	current: boolean;
	index: number;
}) => {
	const [, setVis] = useController(catalogShowStore);
	const item = useMemo(() => {
		return (
			<li
				className={stylesJoin(
					styles['side-list-item'],
					styles['catalog-list-item'],
					props.current ? styles['current-chapter'] : '',
					styles['text-center']
				)}
				data-index={props.index}
				onClick={() => {
					document.querySelector('#reader-scroll-ele')!.scrollTop =
						props.chapter.index * lineHeight;
					setTimeout(() => {
						setVis(false);
					}, 100);
				}}
				title={props.chapter.title}
			>
				<span>{props.chapter.title}</span>
			</li>
		);
	}, [props.chapter, props.current]);
	return <>{item}</>;
};
export const SideCatalog = () => {
	const book = useContext(TextContext);
	const [catalog, setCatalog] = useState(book?.getCatalog() || []);
	const [show, setShow] = useData(catalogShowStore);
	const [marksShow, setMarksShow] = useData(marksShowStore);
	const [chapter, setChapter] = useData(chapterStore);
	const ele = useRef(null);
	useEffect(() => {
		const v = book?.getCatalog() || [];
		setCatalog(v);
	}, [book, book?.reg, typeSetting.lettersOfEachLine]);
	useEffect(() => {
		if (show) {
			document
				.querySelector(`li.${styles['current-chapter']}`)
				?.scrollIntoView();
		}
	}, [show]);
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
				<ul className={styles['side-list']} ref={ele}>
					{catalog.map((e, i) => {
						return (
							<CatalogItem
								chapter={e}
								current={i === chapter}
								index={i}
								key={e.index}
							/>
						);
					})}
				</ul>
			</div>
		</>
	);
};
