import { useEffect, useState } from 'react';
import { BookDetail } from '../../../utils/BookDetail';
import styles from '../style/reader.module.scss';

const pixelOrOther = (value: string | number) => {
	return typeof value === 'string' ? value : `${value}px`;
};
export const FloatMenu = (props: { book: BookDetail }) => {
	const [position, setPosition] = useState({ x: -1, y: -1 } as {
		x: string | number;
		y: number | string;
	});
	useEffect(() => {
		props.book?.registerFloatMenu(setPosition);
	}, [props.book]);
	return position.x !== -1 && position.y !== -1 ? (
		<div
			className={styles['float-menu']}
			style={{
				left: pixelOrOther(position.x),
				top: pixelOrOther(position.y)
			}}
		></div>
	) : null;
};
