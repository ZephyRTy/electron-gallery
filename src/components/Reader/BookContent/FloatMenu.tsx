import React, { useContext, useEffect, useState } from 'react';
import { LineSelectionPosition } from '../../../types/global';
import styles from '../style/reader.module.scss';
import { CommentBtn, MarkLineBtn } from './FloatButton';
import { TextContext } from './TextContent';

const pixelOrOther = (value: string | number) => {
	return typeof value === 'string' ? value : `${value}px`;
};
export const FloatMenu = (props: {
	setSelections: React.Dispatch<
		React.SetStateAction<LineSelectionPosition[][]>
	>;
	setActive: React.Dispatch<
		React.SetStateAction<LineSelectionPosition[] | null>
	>;
	active: LineSelectionPosition[] | null;
}) => {
	const [position, setPosition] = useState({ x: -1, y: -1 } as {
		x: string | number;
		y: number | string;
	});
	const book = useContext(TextContext);
	useEffect(() => {
		book?.registerFloatMenu(setPosition);
	}, [book]);
	useEffect(() => {
		if (position.x === position.y && position.x === -1) {
			props.setActive(null);
		}
	}, [position]);
	return position.x !== -1 && position.y !== -1 ? (
		<div
			className={styles['float-menu']}
			style={{
				left: `min(${pixelOrOther(position.x)}, calc(100% - 110px))`,
				top: pixelOrOther(position.y)
			}}
		>
			<MarkLineBtn
				marked={props.active}
				setActive={props.setActive}
				setSelections={props.setSelections}
			/>
			<CommentBtn marked={props.active} />
		</div>
	) : null;
};
