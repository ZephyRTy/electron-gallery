import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
	CONTENT_RANGE,
	DELTA_HEIGHT,
	DELTA_LINE,
	DISTANCE_2_UPDATE,
	LINE_HEIGHT,
	OVERFLOW_NUM
} from '../../../types/constant';
import { TextLine } from '../../../types/global';
import { BookDetail } from '../../../utils/BookDetail';
import { readerOperator } from '../../../utils/galleryOperator';
import { CatalogPortal } from '../../Dialog';
import styles from '../style/reader.module.scss';
import { Placeholder } from './Placeholder';
export const BookContent = () => {
	const article = useRef(null as HTMLDivElement | null);
	let [searchParams] = useSearchParams();
	const scrollTop = useRef(0);
	let scroll = Number(searchParams.get('scroll') || '0');
	const [top, setTop] = useState(0);
	const [bottom, setBottom] = useState(0);
	const [start, setStart] = useState(0);
	const [book, setBook] = useState(null as any as BookDetail);
	const [content, setContent] = useState([] as TextLine[]);
	const scrollEle = useRef(null);
	const initBottom = useMemo(
		() => (book ? (book.length - CONTENT_RANGE) * LINE_HEIGHT : 0),
		[book]
	);
	const updateWhenScrollLot = useCallback(
		(eleScrollTop: number) => {
			if (!book) return;
			let lineNum = Math.ceil(eleScrollTop / LINE_HEIGHT);
			const startLine =
				lineNum - DELTA_LINE - OVERFLOW_NUM > 0
					? lineNum - DELTA_LINE - OVERFLOW_NUM
					: 0;
			setContent(book.getContent(startLine, startLine + CONTENT_RANGE));
			setStart(startLine);
			setTop(
				startLine
					? eleScrollTop - (DELTA_LINE + OVERFLOW_NUM) * LINE_HEIGHT
					: 0
			);
			setBottom(
				startLine
					? initBottom -
							(eleScrollTop -
								(DELTA_LINE + OVERFLOW_NUM) * LINE_HEIGHT) -
							LINE_HEIGHT * CONTENT_RANGE
					: initBottom
			);
		},
		[book]
	);
	const beforeScrollTop = useRef(0);
	const handleScroll = useMemo(() => {
		let timer: number;
		return (e) => {
			if (timer) {
				clearTimeout(timer);
			}
			timer = window.setTimeout(() => {
				if (scrollEle.current && article.current) {
					e.stopPropagation();
					let { scrollTop: eleScrollTop } = scrollEle.current as any;

					let direction =
						eleScrollTop - beforeScrollTop.current > 0 ? 1 : -1;
					beforeScrollTop.current = eleScrollTop;
					scrollTop.current = eleScrollTop;
					if (direction === 1) {
						let distance = (
							article.current as HTMLElement
						).getBoundingClientRect().bottom;
						if (start + CONTENT_RANGE >= book.length) {
							return;
						}
						if (distance < 0) {
							updateWhenScrollLot(eleScrollTop);
						} else if (distance < DISTANCE_2_UPDATE) {
							setContent(
								book.getContent(
									start + DELTA_LINE,
									start + DELTA_LINE + CONTENT_RANGE
								)
							);
							setStart(start + DELTA_LINE);
							setTop(top + DELTA_HEIGHT);
							setBottom(bottom - DELTA_HEIGHT);
						}
					} else {
						let distance = (
							article.current as HTMLElement
						).getBoundingClientRect().top;
						if (start <= 0) {
							return;
						}
						if (distance > 0) {
							updateWhenScrollLot(eleScrollTop);
						} else if (distance > -DISTANCE_2_UPDATE) {
							setContent(
								book.getContent(
									start - DELTA_LINE,
									start - DELTA_LINE + CONTENT_RANGE
								)
							);
							setStart(start - DELTA_LINE);
							setTop((v) =>
								v - DELTA_HEIGHT > 0 ? v - DELTA_HEIGHT : 0
							);
							setBottom((v) => v + DELTA_HEIGHT);
						}
					}
				}
			}, 200);
		};
	}, [start, top, bottom]);
	useEffect(() => {
		readerOperator.loadText().then((res) => {
			setBook(res);
			setContent(res.getContent(start, start + CONTENT_RANGE));
			setBottom((res.length - CONTENT_RANGE) * LINE_HEIGHT);
		});
	}, []);
	useEffect(() => {
		if (scroll) {
			(scrollEle.current as any).scrollTop = scroll;
			scrollTop.current = scroll;
			updateWhenScrollLot(scrollTop.current);
		}
	}, [book]);
	useEffect(() => {
		if (top >= 0) {
			(scrollEle.current as any).scrollTop = scrollTop.current;
		}
	}, [top, bottom]);
	return (
		<div
			className={styles['scroll-content']}
			id="reader-scroll-ele"
			onScroll={handleScroll}
			ref={scrollEle}
		>
			<Placeholder height={top} />
			<article
				className={styles['reader-content']}
				dangerouslySetInnerHTML={{
					__html: content.map((e) => e.content).join('')
				}}
				ref={article}
			></article>
			<CatalogPortal
				book={book}
				scrollEle={scrollEle as any as HTMLElement}
			/>
			<Placeholder height={bottom} />
		</div>
	);
};
