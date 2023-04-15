import { useContext, useEffect, useState } from 'react';
import { dialogActive } from '../../utils/store';
import { ButtonContainer } from '../ButtonContainer';
import { TextContext } from '../Reader/BookContent/TextContent';
import styles from '../style/dialog.module.scss';

export const RegExpSetContent = (props: {
	setVisible: (_v: boolean) => void;
}) => {
	const book = useContext(TextContext);
	const [reg, setReg] = useState(book?.reg || '');
	const [, setCatalog] = useState(book?.getCatalog() || []);
	useEffect(() => {
		setReg(book?.reg || '');
	}, [book?.reg]);
	useEffect(() => {
		setCatalog(book?.getCatalog() || []);
	}, [book]);
	return (
		<div className={styles['regexp-container']}>
			<textarea
				className={styles['catalog-reg-input']}
				onChange={(e) => {
					setReg(e.target.value);
				}}
				value={reg.toString()}
			/>
			<ButtonContainer
				handleCancel={() => {
					dialogActive.setActive(false);
					props.setVisible(false);
				}}
				handleConfirm={() => {
					book.reParseCatalog(reg);
					setCatalog(book.getCatalog());
					props.setVisible(false);
				}}
			/>
		</div>
	);
};
