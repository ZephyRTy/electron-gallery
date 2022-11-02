/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
	contentRange,
	deltaLine,
	DELTA_HEIGHT,
	distanceToUpdate,
	lineHeight,
	overflowNum
} from '../../../types/constant';
import { BookDetail } from '../../../utils/BookDetail';
import { openInExplorer } from '../../../utils/functions';
import { readerOperator } from '../../../utils/galleryOperator';
import { Catalog } from '../../Dialog';
import styles from '../style/reader.module.scss';
import { FindDialog, FindMaskContainer } from './FindDialog';
import { Placeholder } from './Placeholder';

export const BookContent = (props: {
	renderMenu: (...args: any[]) => JSX.Element;
}) => {
	const article = useRef(null as HTMLDivElement | null);
	let [searchParams] = useSearchParams();
	const scrollTop = useRef(0);
	let scroll = Number(searchParams.get('scroll') || '0');
	const [top, setTop] = useState(0);
	const [bottom, setBottom] = useState(0);
	const [start, setStart] = useState(0);
	const [book, setBook] = useState(null as any as BookDetail);
	const [content, setContent] = useState([] as string[]);
	const [chapter, setChapter] = useState(0);
	const scrollEle = useRef(null);
	const initBottom = useMemo(
		() => (book ? (book.length - contentRange) * lineHeight : 0),
		[book]
	);
	const updateWhenDrag = useCallback(
		(eleScrollTop: number) => {
			if (!book) return;
			let lineIndex = Math.ceil(eleScrollTop / lineHeight);
			let startLine =
				lineIndex - deltaLine - overflowNum > 0
					? lineIndex - deltaLine - overflowNum
					: 0;
			setChapter(book.updateCurrentChapter(lineIndex, 'drag'));
			if (startLine + contentRange >= book.length)
				startLine = book.length - contentRange;
			let bottom = 0,
				top = 0;
			if (
				startLine > 0 &&
				lineIndex - deltaLine - overflowNum + contentRange <=
					book.length
			) {
				bottom =
					initBottom -
					(eleScrollTop - (deltaLine + overflowNum) * lineHeight);
				top = eleScrollTop - (deltaLine + overflowNum) * lineHeight;
			} else if (startLine === 0) {
				bottom = initBottom;
				top = 0;
			} else {
				bottom = 0;
				top = initBottom;
			}
			setContent(book.getContent(startLine, startLine + contentRange));
			setStart(startLine);
			setTop(top);
			setBottom(bottom);
		},
		[book]
	);
	// eslint-disable-next-line no-unused-vars
	const scrollToLineNum = useCallback(
		(lineNum: number) => {
			const eleScrollTop = lineNum * lineHeight;
			if (
				Math.abs(eleScrollTop - (scrollEle.current as any).scrollTop) <
				800
			)
				return;
			(scrollEle.current as any).scrollTop = eleScrollTop;
			scrollTop.current = eleScrollTop;
			updateWhenDrag(eleScrollTop);
			(scrollEle.current as any).scrollTop -= 400;
		},
		[updateWhenDrag]
	);
	const beforeScrollTop = useRef(0);
	const handleOpenInExplorer = useCallback(() => {
		if (book) openInExplorer(book.path);
	}, [book]);
	const handleScroll = useMemo(() => {
		let timer: number;
		return (e: { stopPropagation: () => void }) => {
			if (timer) {
				clearTimeout(timer);
			}
			timer = window.setTimeout(() => {
				if (scrollEle.current && article.current) {
					e.stopPropagation();
					let { scrollTop: eleScrollTop } = scrollEle.current as any;
					let direction =
						eleScrollTop - beforeScrollTop.current > 0 ? 1 : -1; //1向下滚动，-1向上滚动
					beforeScrollTop.current = eleScrollTop;
					scrollTop.current = eleScrollTop;
					if (direction === 1) {
						let distance = (
							article.current as HTMLElement
						).getBoundingClientRect().bottom;
						if (start + contentRange >= book.length) {
							return;
						}
						if (distance >= 0) {
							setChapter(
								book.updateCurrentChapter(
									Math.ceil(eleScrollTop / lineHeight),
									'scroll',
									'down'
								)
							);
						}
						if (distance < 0) {
							updateWhenDrag(eleScrollTop);
						} else if (distance < distanceToUpdate) {
							setContent(
								book.getContent(
									start + deltaLine,
									start + deltaLine + contentRange
								)
							);
							let v = Math.min(top + DELTA_HEIGHT, initBottom);
							setStart(start + deltaLine);
							setTop(v);
							setBottom(initBottom - v);
						}
					} else {
						let distance = (
							article.current as HTMLElement
						).getBoundingClientRect().top;
						if (start <= 0) {
							return;
						}
						if (distance <= 0) {
							setChapter(
								book.updateCurrentChapter(
									Math.ceil(eleScrollTop / lineHeight),
									'scroll',
									'up'
								)
							);
						}
						if (distance > 0) {
							updateWhenDrag(eleScrollTop);
						} else if (distance > -distanceToUpdate) {
							setContent(
								book.getContent(
									start - deltaLine,
									start - deltaLine + contentRange
								)
							);

							let v = Math.max(top - DELTA_HEIGHT, 0);
							setStart(start - deltaLine);
							setTop(v);
							setBottom(initBottom - v);
						}
					}
				}
			}, 200);
		};
	}, [start, top, bottom]);
	useEffect(() => {
		readerOperator.loadText().then((res) => {
			setBook(res);
			setContent(res.getContent(start, start + contentRange));
			setBottom((res.length - contentRange) * lineHeight);
		});
	}, []);
	useEffect(() => {
		if (scroll) {
			(scrollEle.current as any).scrollTop = scroll;
			scrollTop.current = scroll;
			updateWhenDrag(scrollTop.current);
		}
	}, [book]);
	useEffect(() => {
		if (top >= 0) {
			(scrollEle.current as any).scrollTop = scrollTop.current;
		}
	}, [top, bottom]);
	const mainContent = useMemo(() => {
		return (
			<>
				<Placeholder height={top} />
				<article
					className={styles['reader-content']}
					dangerouslySetInnerHTML={{
						__html: content.join('')
					}}
					ref={article}
				></article>
				<Placeholder height={bottom} />
			</>
		);
	}, [content, top, bottom]);
	return (
		<>
			<Catalog book={book} currentChapter={chapter} />
			{props.renderMenu(handleOpenInExplorer)}
			<div
				className={styles['scroll-content']}
				id="reader-scroll-ele"
				onScroll={handleScroll}
				ref={scrollEle}
			>
				<FindMaskContainer />
				<div className={styles['find-mask']}></div>
				{mainContent}
			</div>
			<FindDialog book={book} scrollToLine={scrollToLineNum} />
		</>
	);
};
