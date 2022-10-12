import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
	CONTENT_RANGE,
	DELTA_HEIGHT,
	DELTA_LINE,
	DISTANCE_2_UPDATE,
	LINE_HEIGHT,
	OVERFLOW_NUM
} from '../../types/constant';
import { TextLine } from '../../types/global';
import { ReaderOperator } from '../../utils/readerOperator';
import { Placeholder } from './Placeholder';
import styles from './style/content.module.scss';
export const ScrollContent = () => {
	const article = useRef(null as HTMLDivElement | null);
	const scrollTop = useRef(0);
	const [top, setTop] = useState(0);
	const [bottom, setBottom] = useState(0);
	const [start, setStart] = useState(0);
	const [content, setContent] = useState([] as TextLine[]);
	const readerOperator = useRef(ReaderOperator.getInstance()).current;
	const scrollEle = useRef(null);
	const initBottom = useMemo(
		() => (readerOperator.length - CONTENT_RANGE) * LINE_HEIGHT,
		[]
	);
	const updateWhenScrollLot = useCallback((eleScrollTop) => {
		let lineNum = Math.ceil(eleScrollTop / LINE_HEIGHT);
		const startLine = lineNum - DELTA_LINE - OVERFLOW_NUM;
		setContent(
			readerOperator.getContent(startLine, startLine + CONTENT_RANGE)
		);
		setStart(startLine);
		setTop(eleScrollTop - (DELTA_LINE + OVERFLOW_NUM) * LINE_HEIGHT);
		setBottom(
			initBottom -
				(eleScrollTop - (DELTA_LINE + OVERFLOW_NUM) * LINE_HEIGHT) -
				LINE_HEIGHT * CONTENT_RANGE
		);
	}, []);
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
						if (start + CONTENT_RANGE >= readerOperator.length) {
							return;
						}
						if (distance < 0) {
							updateWhenScrollLot(eleScrollTop);
						} else if (distance < DISTANCE_2_UPDATE) {
							setContent(
								readerOperator.getContent(
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
								readerOperator.getContent(
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
		readerOperator
			.loadText('D:\\webDemo\\desktop-reader\\text.txt')
			.then(() => {
				setContent(
					readerOperator.getContent(start, start + CONTENT_RANGE)
				);
				setBottom(
					(readerOperator.length - CONTENT_RANGE) * LINE_HEIGHT
				);
			});
	}, []);
	useEffect(() => {
		if (top >= 0) {
			(scrollEle.current as any).scrollTop = scrollTop.current;
		}
	}, [top, bottom]);
	return (
		<div
			className={styles['scroll-content']}
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
			<Placeholder height={bottom} />
		</div>
	);
};
