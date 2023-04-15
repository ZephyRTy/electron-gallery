import { useContext, useEffect, useRef, useState } from 'react';
import { dialogActive } from '../../utils/store';
import { TripleButtonContainer } from '../ButtonContainer';
import { EpubContext } from '../Reader/BookContent/EpubContent';
import styles from '../style/dialog.module.scss';

export const EpubCommentContent = (props: {
	setVisible: (_v: boolean) => void;
	visible: boolean;
}) => {
	const book = useContext(EpubContext);
	const [len, setLen] = useState(0);
	const [comment, setComment] = useState('');
	const textarea = useRef<HTMLTextAreaElement>(null);
	useEffect(() => {
		if (book) {
			const comment = book.getComment(book.getCurrentCfi());
			setComment(comment || '');
			setLen(comment?.length || 0);
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
			<TripleButtonContainer
				handleCancel={() => {
					dialogActive.setActive(false);
					props.setVisible(false);
				}}
				handleConfirm={() => {
					if (book.getCurrentCfi()) {
						book.addComment(book.getCurrentCfi(), comment);
					}
					props.setVisible(false);
				}}
				handleDelete={() => {
					book.removeMark(book.getCurrentCfi());
					props.setVisible(false);
				}}
			/>
		</div>
	);
};
