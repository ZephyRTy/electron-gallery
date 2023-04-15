import { useContext, useEffect, useRef, useState } from 'react';
import { dialogActive } from '../../utils/store';
import { ButtonContainer } from '../ButtonContainer';
import { TextContext } from '../Reader/BookContent/TextContent';
import styles from '../style/dialog.module.scss';

export const CommentContent = (props: {
	setVisible: (_v: boolean) => void;
	visible: boolean;
}) => {
	const book = useContext(TextContext);
	const selectionManager = book?.selectionManager || null;
	const [len, setLen] = useState(0);
	const [comment, setComment] = useState('');
	const textarea = useRef<HTMLTextAreaElement>(null);
	useEffect(() => {
		if (book) {
			setComment(selectionManager.getComment() || '');
			setLen(selectionManager.getComment()?.length || 0);
		}
	}, [book, props.visible]);
	return (
		<div className={styles['regexp-container']}>
			<textarea
				className={styles['comment-input']}
				onChange={(e) => {
					if (e.target.value.length > 120) {
						e.preventDefault();
						return;
					}
					setLen(e.target.value.length);
					setComment(e.target.value);
				}}
				ref={textarea}
				value={comment}
			/>
			<span className={styles['comment-word']}>{len}/120</span>
			<ButtonContainer
				handleCancel={() => {
					dialogActive.setActive(false);
					props.setVisible(false);
				}}
				handleConfirm={() => {
					const selection = selectionManager.getCurrentSelection();
					if (selection) {
						selectionManager.addComment(
							book.id,
							comment,
							selection
						);
					}
					props.setVisible(false);
				}}
			/>
		</div>
	);
};
