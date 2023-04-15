import { useContext } from 'react';
import { useController } from 'syill';
import { selectionStore } from '../../utils/store';
import { ButtonContainer } from '../ButtonContainer';
import { TextContext } from '../Reader/BookContent/TextContent';
import styles from '../style/dialog.module.scss';

export const ChangedAlertContent = (props: {
	setVisible: (_: boolean) => void;
}) => {
	const book = useContext(TextContext);
	const [, setSelection] = useController(selectionStore);
	return (
		<div className={styles['changed-alert-container']}>
			<span className={styles['changed-alert']}>
				当前文件已被修改，是否保留标记信息？
			</span>
			<ButtonContainer
				handleCancel={() => {
					props.setVisible(false);
				}}
				handleConfirm={() => {
					book.clearMarkInfo().then(() => {
						setSelection([]);
					});
					props.setVisible(false);
				}}
			/>
		</div>
	);
};
