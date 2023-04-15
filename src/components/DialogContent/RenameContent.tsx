import { useEffect, useState } from 'react';
import galleryConfig from '../../types/constant';
import { GalleryOperator } from '../../utils/data/galleryOperator';
import { dialogActive } from '../../utils/store';
import { ButtonContainer } from '../ButtonContainer';
import styles from '../style/dialog.module.scss';

export const RenameContent = (props: {
	util: GalleryOperator;
	setVisible: (_v: boolean) => void;
}) => {
	const [newTitle, setNewTitle] = useState('');
	useEffect(() => {
		setNewTitle(props.util.oldTitle!);
	}, [props.util.oldTitle]);
	return (
		<div className={styles['rename-contain']}>
			<input
				className={styles['rename-input']}
				onChange={(e) => {
					setNewTitle((e.target as HTMLInputElement).value);
				}}
				value={newTitle}
			/>
			<ButtonContainer
				handleCancel={() => {
					dialogActive.setActive(false);
					props.setVisible(false);
					props.util.packToBeRenamed = { id: -1, oldTitle: '' };
				}}
				handleConfirm={() => {
					if (!galleryConfig.r18) {
						dialogActive.setActive(false);
						props.setVisible(false);
						return;
					}
					props.util.rename(newTitle).then((res) => {
						if (res) {
							dialogActive.setActive(false);
							props.setVisible(false);
						} else {
							console.log('rename fail');
						}
					});
				}}
			/>
		</div>
	);
};
