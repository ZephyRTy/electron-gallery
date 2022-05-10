/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
import { Map } from 'immutable';
import { useEffect, useState } from 'react';
import { DirectoryInfo } from '../../types/global';
import { FileOperator } from '../../utils/fileOperator';
import styles from './style/dialog.module.scss';
export const Dialog = (props: {
	util: FileOperator;
	handleVisible: any;
	setInSelect: (v: boolean) => void;
}) => {
	const [checked, setChecked] = useState('');
	const [refresh, setRefresh] = useState(false);
	const [visible, setVisible] = useState(false);
	const [destination, setDestination] = useState('');
	const [dirs, setDirs] = useState(Map({}) as Map<string, DirectoryInfo>);
	useEffect(() => {
		if (!props.util.directoryList) {
			return;
		}
		setDirs(props.util.directoryList);
	}, [props.util.directoryList]);
	useEffect(() => {
		props.handleVisible.current = setVisible;
	}, [props]);

	return (
		<div
			className={
				styles['dialog-cover'] + (visible ? '' : ' ' + styles['hidden'])
			}
		>
			<div className={styles['dialog']}>
				<ul className={styles['dialog-list']}>
					{dirs.entrySeq().map((dir: [string, DirectoryInfo], v) => {
						const dirIndex = dir[0];
						return (
							<li
								key={dirIndex}
								className={styles['dialog-list-item']}
							>
								<input
									type={'checkbox'}
									id={'checkbox-' + dirIndex}
									checked={checked === dirIndex}
									readOnly
									onClick={() => {
										if (checked === dirIndex) {
											setChecked('');
											setDestination('');
											return;
										}
										setChecked(dirIndex);
										setDestination(dirIndex);
									}}
								/>
								<label htmlFor={'checkbox-' + dirIndex}>
									<div
										className={
											styles['dialog-list-item-content']
										}
									>
										<span>{dir[1].title}</span>
										<span
											className={
												styles['dialog-list-item-count']
											}
										>
											{dir[1].content.length}
										</span>
									</div>
								</label>
							</li>
						);
					})}
				</ul>
				<input
					type={'text'}
					className={styles['dialog-input']}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							props.util.addNewDir(
								(e.target as HTMLInputElement).value
							);
							(e.target as HTMLInputElement).value = '';
							setRefresh(!refresh);
						}
					}}
				/>
				<div className={styles['dialog-buttons']}>
					<button
						className={styles['dialog-buttons-back']}
						onClick={() => {
							setVisible(false);
						}}
					>
						返回
					</button>
					<button
						className={styles['dialog-buttons-confirm']}
						onClick={() => {
							if (destination.length === 0) {
								return;
							} else if (isNaN(parseInt(destination))) {
								throw new Error('Wrong destination directory');
							}
							props.util.submitSelection(parseInt(destination));
							setVisible(false);
							props.setInSelect(false);
							props.util.refresh();
						}}
					>
						确认
					</button>
				</div>
			</div>
		</div>
	);
};
