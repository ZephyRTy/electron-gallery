import { useContext, useEffect } from 'react';
import { DataOperator } from '../../utils/data/DataOperator';
import { dialogActive } from '../../utils/store';
import { ButtonContainer } from '../ButtonContainer';
import { TextContext } from '../Reader/BookContent/TextContent';
import styles from '../style/dialog.module.scss';

export const ClearConfirmContent = (props: {
	util: DataOperator<any, any, any>;
	setVisible: (_v: boolean) => void;
	visible: boolean;
}) => {
	const book = useContext(TextContext);
	useEffect(() => {
		if (book) {
		}
	}, [book, props.visible]);
	return (
		<div className={styles['clear_confirm-container']}>
			<div className={styles['clear_confirm-info']}>
				<span className={styles['clear_confirm-span']}>
					是否清除所有阅读记录？
				</span>
			</div>
			<ButtonContainer
				handleCancel={() => {
					dialogActive.setActive(false);
					props.setVisible(false);
				}}
				handleConfirm={async () => {
					await props.util.clearBookmark();
					props.util.refresh();
					props.setVisible(false);
				}}
			/>
		</div>
	);
};
