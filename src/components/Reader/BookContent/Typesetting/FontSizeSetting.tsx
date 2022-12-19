/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import { ReactComponent as Larger } from '../../../../icon/LargerFont.svg';
import { ReactComponent as Smaller } from '../../../../icon/SmallerFont.svg';
import styles from '../../style/reader.module.scss';
import { TextContext } from '../TextContent';
export const FontSizeSetting = (props: {
	typeset: (...args: any[]) => void;
	fontSize: number;
}) => {
	const book = useContext(TextContext);
	const max = 20;
	const min = 12;
	const { typeset, fontSize } = props;
	return (
		<div className={styles['font-size-container']}>
			<button
				className={styles['font-size-setting']}
				onClick={() => {
					if (fontSize > min) {
						book.typeset(fontSize - 1);
						typeset(fontSize - 1);
					}
				}}
			>
				<Smaller />
			</button>
			<span className={styles['font-size']}>{fontSize}</span>
			<input
				className={styles['font-size-slider']}
				max={max}
				min={min}
				onChange={(e) => {
					book.typeset(parseInt(e.target.value));
					typeset(parseInt(e.target.value));
				}}
				type="range"
				value={fontSize}
			/>
			<button
				className={styles['font-size-setting']}
				onClick={() => {
					if (fontSize < max) {
						book.typeset(fontSize + 1);
						typeset(fontSize + 1);
					}
				}}
			>
				<Larger />
			</button>
		</div>
	);
};
