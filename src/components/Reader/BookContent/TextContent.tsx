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
	fontSize,
	lineHeight,
	overflowNum
} from '../../../types/constant';
import { TextLine } from '../../../types/global';
import { readerOperator } from '../../../utils/data/galleryOperator';
import { TextDetail } from '../../../utils/data/TextDetail';
import {
	formatDate,
	parseUrlQuery,
	stylesJoin
} from '../../../utils/functions/functions';
import { changedAlertStore, chapterStore } from '../../../utils/store';
import {
	ChangedAlert,
	ChangeWordDialog,
	CommentDialog,
	RegExpSet
} from '../../Dialog';
import { OpenInExplorerBtn } from '../../Gallery/Buttons';
import { Sidebar, SidebarContainer } from '../../Menu';
import {
	Back,
	CatalogBtn,
	ChangeWordBtn,
	Find,
	RegExpBtn,
	ShowMarksBtn
} from '../Buttons';
import styles from '../style/reader.module.scss';
import { FindDialog, FindMaskContainer } from './FindDialog';
import { MarkedContext } from './MarkedLine';
import { Placeholder } from './Placeholder';
import { SideEnter3D } from './SideEnter/SideEnter3D';
import { SideMarkDiv } from './SideEnter/SideMarkDiv';
import { TypeSetting } from './Typesetting/TypeSetting';

export const TextContext = React.createContext(null as any as TextDetail);
const ContentLine = (props: { line: TextLine }) => {
	const para = useRef<HTMLParagraphElement>(null);
	const book = useContext(TextContext);
	const selectionManager = book?.selectionManager;
	return (
		<p
			className={props.line.className.join(' ')}
			onMouseDown={(e) => {
				e.stopPropagation();
				selectionManager.removeAllRange();
				selectionManager.clearSelection();
				selectionManager
					.setSelection('anchorIndex', props.line.index)
					.setMousePosition(
						e.clientX,
						props.line.index * lineHeight ?? e.clientY
					);
				selectionManager.showFloatMenu(false);
			}}
			onMouseUp={(e) => {
				e.stopPropagation();
				const selection = window.getSelection();
				if (selection) {
					if (selection.isCollapsed) {
						selectionManager.clearSelection();
						selectionManager.clearMousePosition();
						return;
					}
					selectionManager
						.setSelection('focusIndex', props.line.index)
						.setSelection('focusOffset', selection.focusOffset)
						.setSelection('anchorOffset', selection.anchorOffset);
					if (selectionManager.confirmAndFixSelection()) {
						selectionManager.showFloatMenu(true);
					}
				} else {
					selectionManager.clearSelection();
					selectionManager.clearMousePosition();
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
	const [chapter, setChapter] = useController(chapterStore);
	const [textFontSize, setFontSize] = useState(fontSize);
	const scrollEle = useRef(null);
	const jump = useRef(false);
	const initBottom = useMemo(
		() => (book ? (book.length - contentRange) * lineHeight : 0),
		[book, book?.length, textFontSize]
	);
	const updateWhenDrag = useCallback(
		(eleScrollTop: number) => {
			if (!book) return;
			let lineIndex = Math.ceil(eleScrollTop / lineHeight);
			let startLine = Math.max(lineIndex - deltaLine - overflowNum, 0);
			setChapter(book.updateCurrentChapter(lineIndex, 'drag'));
			if (startLine + contentRange >= book.length) {
				startLine = book.length - contentRange;
				startLine = Math.max(startLine, 0);
			}
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
	// useEffect(() => {
	// 	console.log(start);
	// }, [start]);
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
		if (!book) return;
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
							const n =
								start + deltaLine + contentRange > book.length
									? book.length - contentRange
									: start + deltaLine;
							setContent(book.getContent(n, n + contentRange));
							let v = Math.min(top + DELTA_HEIGHT, initBottom);
							setStart(n);
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
							const n = Math.max(start - deltaLine, 0);
							setContent(book.getContent(n, n + contentRange));
							let v = Math.max(top - DELTA_HEIGHT, 0);
							setStart(n);
							setTop(v);
							setBottom(initBottom - v);
						}
					}
				}
			}, 200);
		};
	}, [start, top, bottom]);
	const typeset = useCallback(
		(font: number) => {
			setFontSize(font);
			setContent(book.getContent(start, start + contentRange));
		},
		[start, book]
	);
	useEffect(() => {
		readerOperator.loadText().then((res) => {
			const { book, changed } = res;
			setBook(book);
			setContent(book.getContent(start, start + contentRange));
			setBottom((book.length - contentRange) * lineHeight);
			book.initGBKCatalog();
			if (changed) {
				setAlert(true);
			}
		});
	}, []);
	useEffect(() => {
		if (scroll && book) {
			setChapter(
				book.updateCurrentChapter(
					Math.ceil(scroll / lineHeight),
					'drag'
				)
			);
			jumpTo(scroll);
		}
	}, [book]);
	const MainContent = useCallback(() => {
		return (
			<>
				<MarkedContext />
				<Placeholder height={top} />
				<article
					className={stylesJoin(styles['reader-content'])}
					ref={article}
					style={{ fontSize: `${textFontSize}px` }}
				>
					{content.map((line) => {
						return <ContentLine key={line.index} line={line} />;
					})}
				</article>
				<Placeholder height={bottom} />
			</>
		);
	}, [content, top, bottom, book, textFontSize]);

	return (
		<TextContext.Provider value={book}>
			<TypeSetting fontSize={textFontSize} typeset={typeset} />
			<RegExpSet />
			<ChangeWordDialog />
			<CommentDialog />
			<ChangedAlert />
			<SideEnter3D
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
					<ChangeWordBtn />
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
				<MainContent />
			</div>
			<FindDialog scrollToLine={scrollToLineNum} />
		</TextContext.Provider>
	);
};
