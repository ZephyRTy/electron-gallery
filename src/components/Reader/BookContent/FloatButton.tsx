import React, { useContext, useState } from 'react';
import { ReactComponent as MarkIcon } from '../../../icon/markLine.svg';
import { LineSelectionPosition } from '../../../types/global';
import {
	LineSelectionEqual,
	measureTextPosition,
	stylesJoin
} from '../../../utils/functions/functions';
import styles from '../style/reader.module.scss';
import { TextContext } from './TextContent';

export const MarkLineBtn = (props: {
	marked: LineSelectionPosition[] | null;
	setSelections: React.Dispatch<
		React.SetStateAction<LineSelectionPosition[][]>
	>;
	setActive: React.Dispatch<
		React.SetStateAction<LineSelectionPosition[] | null>
	>;
}) => {
	const book = useContext(TextContext);
	const [marked, setMarked] = useState(!!props.marked);
	return (
		<button
			className={stylesJoin(
				styles['float-btn'],
				marked ? styles['float-btn--marked'] : ''
			)}
			onClick={() => {
				if (!marked) {
					book.addMark()
						.then((res) => {
							setMarked(true);
							const arr = measureTextPosition(
								res,
								book,
								document.querySelector('.text-line')!
							);
							props.setActive([...arr]);
							props.setSelections((v) => [...v, [...arr]]);
						})
						.catch((e) => {
							console.log(e);
						});
				} else if (props.marked) {
					props.setSelections((v) => {
						return v.filter(
							(v) =>
								v.length > 0 &&
								!LineSelectionEqual(
									v[0].logic,
									props.marked![0].logic
								)
						);
					});
					book.removeMark(props.marked![0].logic).then(() => {
						book.showFloatMenu(false);
						props.setActive(null);
						setMarked(false);
					});
				}
				book.removeAllRange();
			}}
		>
			<MarkIcon />
		</button>
	);
};
