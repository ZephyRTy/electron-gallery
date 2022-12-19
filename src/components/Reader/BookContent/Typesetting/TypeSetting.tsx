/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import styles from '../../style/reader.module.scss';
import { TextContext } from '../TextContent';
import { FontSizeSetting } from './FontSizeSetting';
export const TypeSetting = (props: {
	typeset: (...args: any[]) => void;
	fontSize: number;
}) => {
	const book = useContext(TextContext);
	const { typeset, fontSize } = props;
	return (
		<div className={styles['typesetting-container']}>
			<FontSizeSetting fontSize={fontSize} typeset={typeset} />
		</div>
	);
};
