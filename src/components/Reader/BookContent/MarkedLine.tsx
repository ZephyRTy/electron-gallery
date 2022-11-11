import React, { useContext, useEffect, useState } from 'react';
import { useData } from 'syill';
import { lineHeight } from '../../../types/constant';
import { LineSelectionPosition } from '../../../types/global';
import { measureTextPosition } from '../../../utils/functions/functions';
import { selectionStore } from '../../../utils/store';
import styles from '../style/reader.module.scss';
import { FloatMenu } from './FloatMenu';
import { TextContext } from './TextContent';
const MarkedLine = (props: {
	selection: LineSelectionPosition[];
	setActive: React.Dispatch<
		React.SetStateAction<LineSelectionPosition[] | null>
	>;
}) => {
	const [hover, setHover] = useState(false);
	const book = useContext(TextContext);
	return (
		<div className={styles['marked-line-container']}>
			{props.selection.map((e, i) => {
				return (
					<div
						className={
							styles['marked-line'] +
							(hover ? ' ' + styles['marked-line-hover'] : '')
						}
						key={i}
						onClick={(event) => {
							event.stopPropagation();
							book.setMousePosition(
								event.clientX - 50,
								e.top - lineHeight
							);
							book.showFloatMenu(true);
							props.setActive([...props.selection]);
						}}
						onMouseEnter={() => {
							setHover(true);
							book.removeAllRange();
						}}
						onMouseLeave={() => {
							setHover(false);
						}}
						style={{
							left: e.offset,
							top: e.top + 2,
							width: e.width
						}}
					></div>
				);
			})}
		</div>
	);
};
export const MarkedLineContainer = (props: {
	selections: LineSelectionPosition[][];
	setActive: React.Dispatch<
		React.SetStateAction<LineSelectionPosition[] | null>
	>;
}) => {
	return (
		<>
			{props.selections.map((selection, index) => (
				<MarkedLine
					key={index}
					selection={selection}
					setActive={props.setActive}
				/>
			))}
		</>
	);
};

export const MarkedContext = () => {
	const book = useContext(TextContext);
	const [selections, setSelections] = useData(selectionStore);
	const [active, setActive] = useState(
		null as null | LineSelectionPosition[]
	);
	useEffect(() => {
		if (book) {
			book.initMarks().then(() => {
				setSelections(
					book.divideAllSelections().map((e) => {
						return measureTextPosition(
							e,
							book,
							document.querySelector('.text-line')!
						);
					})
				);
			});
		}
		return () => {
			setSelections([]);
		};
	}, [book]);
	return (
		<>
			<FloatMenu
				active={active ? [...active] : null}
				setActive={setActive}
				setSelections={setSelections}
			></FloatMenu>
			<MarkedLineContainer
				selections={selections}
				setActive={setActive}
			/>
		</>
	);
};
