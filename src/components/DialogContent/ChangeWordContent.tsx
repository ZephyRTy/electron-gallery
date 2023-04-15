import { useContext, useRef } from 'react';
import { changeWord } from '../../utils/functions/changeWord';
import { stylesJoin } from '../../utils/functions/functions';
import { ButtonContainer } from '../ButtonContainer';
import { TextContext } from '../Reader/BookContent/TextContent';
import styles from '../style/dialog.module.scss';

export const ChangeWordContent = (props: {
	setVisible: (_: boolean) => void;
}) => {
	const book = useContext(TextContext);
	const oldName = useRef(null as any as HTMLInputElement);
	const newName = useRef(null as any as HTMLInputElement);
	const newPro = useRef(null as any as HTMLInputElement);
	return (
		<div
			className={stylesJoin(
				styles['change-word-container'],
				styles['dialog-container']
			)}
		>
			<input
				className={styles['change-word']}
				placeholder="原人物名"
				ref={oldName}
			/>
			<input
				className={styles['change-word']}
				placeholder="新人物名"
				ref={newName}
			/>
			<input
				className={styles['change-word']}
				placeholder="人物代词"
				ref={newPro}
			/>
			<ButtonContainer
				handleCancel={() => {
					props.setVisible(false);
				}}
				handleConfirm={() => {
					const oldV = oldName.current!.value;
					const newV = newName.current!.value;
					const newP = newPro.current!.value;
					changeWord(book.path, oldV, newV, newP);
					props.setVisible(false);
					setTimeout(() => {
						location.reload();
					});
				}}
			/>
		</div>
	);
};
