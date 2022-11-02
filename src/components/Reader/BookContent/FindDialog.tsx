/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useController, useData } from 'syill';
import { ReactComponent as LeftArrow } from '../../../icon/leftArrow.svg';
import { ReactComponent as RightArrow } from '../../../icon/rightArrow.svg';
import { lineHeight } from '../../../types/constant';
import { BookDetail } from '../../../utils/BookDetail';
import { cursorStore, findStore } from '../../../utils/store';
import styles from '../style/reader.module.scss';

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
	book: BookDetail;
	scrollToLine: (lineNum: number) => void;
}) => {
	const [vis] = useData(findStore);
	const [searchKey, setSearchKey] = useState('');
	const result = useRef(
		[] as {
			index: number;
			offset: number;
			length: number;
		}[][]
	);
	// eslint-disable-next-line no-undef

	const [cursor, setCursor] = useState(-1);
	const [cursorInfo, setCursorStore] = useController(cursorStore);
	const next = useCallback(() => {
		if (result.current.length === 0) {
			result.current = props.book.find(searchKey);
			const value = result.current;
			if (value.length > 0) {
				for (let i = 0; i < value.length; i++) {
					if (props.book.contain(value[i][0].index)) {
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
	}, [cursor, props.book, searchKey]);
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
		if (result.current.length === 0) return;
		props.scrollToLine(result.current[cursor][0].index);
		let arr = [] as any[];
		for (let i = 0; i < result.current[cursor].length; i++) {
			let value = result.current[cursor][i];
			arr.push({
				top: value.index * lineHeight - 3,
				offset: 70 + value.offset * 16,
				width: 16 * value.length
			});
		}
		setCursorStore([...arr]);
	}, [cursor]);
	return (
		<>
			<div
				className={styles['find-dialog']}
				style={{ display: vis ? 'flex' : 'none' }}
			>
				<button
					onClick={() => {
						if (result.current.length === 0) {
							result.current = props.book.find(searchKey);
							const value = result.current;
							if (value.length > 0) {
								for (let i = 0; i < value.length; i++) {
									if (props.book.contain(value[i][0].index)) {
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
					value={searchKey}
				></input>
				<button onClick={next}>
					<RightArrow />
				</button>
			</div>
		</>
	);
};
