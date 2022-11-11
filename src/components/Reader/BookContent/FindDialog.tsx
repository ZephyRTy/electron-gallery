/* eslint-disable no-unused-vars */
import {
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState
} from 'react';
import { useController, useData } from 'syill';
import { ReactComponent as LeftArrow } from '../../../icon/leftArrow.svg';
import { ReactComponent as RightArrow } from '../../../icon/rightArrow.svg';
import { lineHeight } from '../../../types/constant';
import { LineSelection } from '../../../types/global';
import { measureTextPosition } from '../../../utils/functions/functions';
import { cursorStore, findStore } from '../../../utils/store';
import styles from '../style/reader.module.scss';
import { TextContext } from './TextContent';
const textMetrics = window.require('text-metrics');
export const FindMask = (props: {
	storeInfo: { top: number; offset: number; width: number };
}) => {
	const { storeInfo } = props;
	return (
		<div
			className={styles['find-mask']}
			style={{
				top: storeInfo.top,
				left: storeInfo.offset,
				width: storeInfo.width
			}}
		></div>
	);
};
export const FindMaskContainer = () => {
	const [storeInfo] = useData(cursorStore);
	return (
		<>
			{storeInfo.map((e) => (
				<FindMask key={`${e.top}-${e.offset}`} storeInfo={e} />
			))}
		</>
	);
};
export const FindDialog = (props: {
	scrollToLine: (lineNum: number) => void;
}) => {
	const book = useContext(TextContext);
	const [vis] = useData(findStore);
	const inputEle = useRef<HTMLInputElement>(null);
	const ele = useRef({ ele: null as HTMLDivElement | null });
	const [searchKey, setSearchKey] = useState('');
	const result = useRef([] as LineSelection[][]);
	// eslint-disable-next-line no-undef

	const [cursor, setCursor] = useState(-1);
	const [cursorInfo, setCursorStore] = useController(cursorStore);
	const next = useCallback(() => {
		const divEle = ele.current.ele!;
		if (result.current.length === 0) {
			result.current = book.find(searchKey);
			const value = result.current;
			if (value.length > 0) {
				for (let i = 0; i < value.length; i++) {
					if (value[i][0].index >= divEle.scrollTop / lineHeight) {
						setCursor(i);
						break;
					}
				}
			}
		} else {
			if (cursor === result.current.length - 1) {
				return;
			}
			setCursor(cursor + 1);
		}
	}, [cursor, book, searchKey]);
	useLayoutEffect(() => {
		ele.current.ele = document.querySelector('#reader-scroll-ele')!;
	}, []);
	useEffect(() => {
		const nextResult = (e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				next();
			}
		};
		document.addEventListener('keydown', nextResult);
		return () => {
			document.removeEventListener('keydown', nextResult);
		};
	}, [next]);
	useEffect(() => {
		if (vis) {
			inputEle.current?.focus();
			setCursorStore([]);
			setCursor(-1);
		}
	}, [vis]);
	useEffect(() => {
		if (result.current.length === 0 || cursor === -1) return;
		props.scrollToLine(result.current[cursor][0].index);
		const arr = measureTextPosition(
			result.current[cursor],
			book,
			document.querySelector('p.text-line')!
		);
		// let arr = [] as any[];
		// for (let i = 0; i < result.current[cursor].length; i++) {
		// 	let value = result.current[cursor][i];
		// 	let width = 0,
		// 		offset = 0;
		// 	let line = book.getLine(value.index);
		// 	const metrics = textMetrics.init(
		// 		document.querySelector('p.text-line')!
		// 	);
		// 	offset =
		// 		value.offset === 0
		// 			? 0
		// 			: metrics.width(
		// 					line.content
		// 						.slice(0, value.offset)
		// 						.replaceAll(SPACE_CODE, '一')
		// 			  );
		// 	width = metrics.width(
		// 		line.content
		// 			.slice(value.offset, value.length + value.offset)
		// 			.replaceAll(SPACE_CODE, '一')
		// 	);
		// 	arr.push({
		// 		top: value.index * lineHeight - 3,
		// 		offset: 70 + offset,
		// 		width
		// 	});
		// }
		setCursorStore(arr);
	}, [cursor]);
	return (
		<>
			<div
				className={styles['find-dialog']}
				style={{ display: vis ? 'flex' : 'none' }}
			>
				<button
					onClick={() => {
						const divEle = ele.current.ele!;
						if (result.current.length === 0) {
							result.current = book.find(searchKey);
							const value = result.current;
							if (value.length > 0) {
								for (let i = 0; i < value.length; i++) {
									if (
										value[i][0].index <=
										divEle.scrollTop / lineHeight
									) {
										setCursor(i);
										break;
									}
								}
							}
						} else {
							if (cursor === 0) {
								return;
							}
							setCursor(cursor - 1);
						}
					}}
				>
					<LeftArrow />
				</button>
				<input
					onChange={(e) => {
						setSearchKey(e.target.value);
						result.current = [];
					}}
					ref={inputEle}
					value={searchKey}
				></input>
				<button onClick={next}>
					<RightArrow />
				</button>
			</div>
		</>
	);
};
