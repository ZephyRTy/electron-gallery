/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useController } from 'syill';
import {
	contentRange,
	deltaLine,
	DELTA_HEIGHT,
	distanceToUpdate,
	lineHeight,
	overflowNum
} from '../../../types/constant';
import { TextLine } from '../../../types/global';
import { readerOperator } from '../../../utils/data/galleryOperator';
import { TextDetail } from '../../../utils/data/TextDetail';
import { formatDate, parseUrlQuery } from '../../../utils/functions/functions';
import { changedAlertStore } from '../../../utils/store';
import { ChangedAlert, RegExpSet } from '../../Dialog';
import { OpenInExplorerBtn } from '../../Gallery/Buttons';
import { Sidebar, SidebarContainer } from '../../Menu';
import { Back, CatalogBtn, Find, RegExpBtn, ShowMarksBtn } from '../Buttons';
import styles from '../style/reader.module.scss';
import { SideCatalog } from './Catalog';
import { FindDialog, FindMaskContainer } from './FindDialog';
import { MarkedContext } from './MarkedLine';
import { Placeholder } from './Placeholder';
import { SideEnter3D } from './SideEnter3D';
import { SideMarkDiv } from './SideMarkDiv';

export const TextContext = React.createContext(null as any as TextDetail);
const ContentLine = (props: { line: TextLine }) => {
	const para = useRef<HTMLParagraphElement>(null);
	const book = useContext(TextContext);
	return (
		<p
			className={props.line.className.join(' ')}
			onMouseDown={(e) => {
				e.stopPropagation();
				book.removeAllRange();
				props.line.parent.setSelection('anchorIndex', props.line.index);
				props.line.parent.setMousePosition(
					e.clientX,
					props.line.index * lineHeight ?? e.clientY
				);
				props.line.parent.showFloatMenu(false);
			}}
			onMouseUp={(e) => {
				e.stopPropagation();
				const selection = window.getSelection();
				if (selection) {
					if (
						(selection.anchorNode === selection.focusNode &&
							selection.anchorOffset === selection.focusOffset) ||
						!selection.anchorNode
					) {
						props.line.parent.clearSelection();
						props.line.parent.clearMousePosition();
						return;
					}
					props.line.parent.setSelection(
						'focusIndex',
						props.line.index
					);
					props.line.parent.setSelection(
						'focusOffset',
						selection.focusOffset
					);
					props.line.parent.setSelection(
						'anchorOffset',
						selection.anchorOffset
					);
					props.line.parent.confirmAndFixSelection();
					props.line.parent.showFloatMenu(true);
				} else {
					props.line.parent.clearSelection();
					props.line.parent.clearMousePosition();
					return;
				}
			}}
			ref={para}
		>
			{props.line.content}
		</p>
	);
};
export const TextContent = () => {
	const article = useRef(null as HTMLDivElement | null);
	let [searchParams] = useSearchParams();
	const scrollTop = useRef(0);
	const [, setAlert] = useController(changedAlertStore);
	let scroll = Number(searchParams.get('scroll') || '0');
	const [top, setTop] = useState(0);
	const [bottom, setBottom] = useState(0);
	const [start, setStart] = useState(0);
	const [book, setBook] = useState(null as any as TextDetail);
	const [content, setContent] = useState([] as TextLine[]);
	const [chapter, setChapter] = useState(0);
	const scrollEle = useRef(null);
	const jump = useRef(false);
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
				top = startLine * lineHeight;
				bottom = initBottom - top;
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
	const jumpTo = useCallback(
		(scroll) => {
			jump.current = true;
			(scrollEle.current as any).scrollTop = scroll;
			scrollTop.current = scroll;
			updateWhenDrag(scrollTop.current);
			setTimeout(() => {
				jump.current = false;
			}, 100);
		},
		[updateWhenDrag]
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
			jumpTo(eleScrollTop);
			//(scrollEle.current as any).scrollTop -= 400;
		},
		[updateWhenDrag]
	);
	const beforeScrollTop = useRef(0);

	const handleScroll = useMemo(() => {
		let timer: number;
		return (e: { stopPropagation: () => void }) => {
			if (timer) {
				clearTimeout(timer);
			}
			timer = window.setTimeout(() => {
				if (scrollEle.current && article.current && !jump.current) {
					e.stopPropagation();
					let { scrollTop: eleScrollTop } = scrollEle.current as any;
					let direction: -1 | 1 =
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
			const { book, changed } = res;
			setBook(book);
			setContent(book.getContent(start, start + contentRange));
			setBottom((book.length - contentRange) * lineHeight);
			if (changed) {
				setAlert(true);
			}
		});
	}, []);
	useEffect(() => {
		if (scroll) {
			jumpTo(scroll);
		}
	}, [book]);
	const mainContent = useMemo(() => {
		return (
			<>
				<MarkedContext />
				<Placeholder height={top} />
				<article className={styles['reader-content']} ref={article}>
					{content.map((line) => {
						return <ContentLine key={line.index} line={line} />;
					})}
				</article>
				<Placeholder height={bottom} />
			</>
		);
	}, [content, top, bottom, book]);

	return (
		<TextContext.Provider value={book}>
			<RegExpSet currentChapter={chapter} />
			<ChangedAlert />
			<SideEnter3D
				renderCatalog={() => {
					return <SideCatalog currentChapter={chapter} />;
				}}
				renderMarkDiv={() => {
					return <SideMarkDiv />;
				}}
			/>
			<SidebarContainer>
				<Sidebar menuPosition="middle">
					<Back
						quitBehavior={async () => {
							const ele =
								document.querySelector('#reader-scroll-ele');
							let urlObj = parseUrlQuery(window.location.href);
							delete urlObj['undefined'];
							urlObj['scroll'] = ele!.scrollTop;
							const id = readerOperator.packWillOpen()!.id;
							let url =
								`#/reader/book/${id}?` +
								new URLSearchParams(urlObj).toString();
							await readerOperator.UpdateBookmark({
								...readerOperator.packWillOpen()!,
								url,
								timeStamp: formatDate(new Date())
							});
						}}
					/>
					<RegExpBtn />
					<CatalogBtn />
					<ShowMarksBtn />
					<Find />
					<OpenInExplorerBtn filePath={book?.path} />
				</Sidebar>
			</SidebarContainer>
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
			<FindDialog scrollToLine={scrollToLineNum} />
		</TextContext.Provider>
	);
};
