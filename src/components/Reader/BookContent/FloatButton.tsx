import React, { useContext, useState } from 'react';
import { useController } from 'syill';
import { ReactComponent as CommentIcon } from '../../../icon/comment.svg';
import { ReactComponent as MarkIcon } from '../../../icon/markLine.svg';
import { LineSelectionPosition } from '../../../types/global';
import {
	LineSelectionEqual,
	measureTextPosition,
	stylesJoin
} from '../../../utils/functions/functions';
import { commentVisStore } from '../../../utils/store';
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
	const selectionManager = book?.selectionManager;
	const [marked, setMarked] = useState(!!props.marked);
	return (
		<button
			className={stylesJoin(
				styles['float-btn'],
				marked ? styles['float-btn--marked'] : '',
				styles['float-btn-mark']
			)}
			onClick={() => {
				if (!marked) {
					selectionManager
						.addMark()
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
					selectionManager
						.removeMark(props.marked![0].logic)
						.then(() => {
							selectionManager.showFloatMenu(false);
							props.setActive(null);
							setMarked(false);
						});
				}
				selectionManager.removeAllRange();
			}}
		>
			<MarkIcon />
		</button>
	);
};

export const CommentBtn = (props: {
	marked: LineSelectionPosition[] | null;
}) => {
	const [, setVis] = useController(commentVisStore);
	return (
		<button
			className={stylesJoin(
				styles['float-btn'],
				styles['float-btn-comment']
			)}
			disabled={!props.marked}
			onClick={() => {
				setVis(true);
			}}
		>
			<CommentIcon />
		</button>
	);
};
