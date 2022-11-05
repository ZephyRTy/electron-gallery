import { useEffect, useState } from 'react';
import { BookDetail } from '../../../utils/BookDetail';
import styles from '../style/reader.module.scss';
export const FloatMenu = (props: { book: BookDetail }) => {
	const [position, setPosition] = useState({ x: -1, y: -1 });
	useEffect(() => {
		props.book?.registerFloatMenu(setPosition);
	}, [props.book]);
	return position.x !== -1 && position.y !== -1 ? (
		<div
			className={styles['float-menu']}
			style={{
				left: position.x + 'px',
				top: position.y + 'px'
			}}
		></div>
	) : null;
};
