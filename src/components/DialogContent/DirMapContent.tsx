import { Seq } from 'immutable';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import galleryConfig from '../../types/constant';
import { DirectoryInfo } from '../../types/global';
import { DataOperator } from '../../utils/data/DataOperator';
import { dialogActive } from '../../utils/store';
import { ButtonContainer } from '../ButtonContainer';
import styles from '../style/dialog.module.scss';
const sort = (x: string, y: string, index: number) => {
	let a = x[index];
	let b = y[index];
	if (!a && b) {
		return -1;
	} else if (a && !b) {
		return 1;
	} else if (a === b) {
		return sort(x, y, index + 1);
	}
	let cReg =
		/^[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/;
	if (!cReg.test(a) || !cReg.test(b)) {
		if (!cReg.test(a) && !cReg.test(b)) {
			return a.localeCompare(b);
		}
		return -a.localeCompare(b);
	}
	return a.localeCompare(b, 'zh');
};
export const sortCNAndEN = (
	x: [string, DirectoryInfo],
	y: [string, DirectoryInfo]
) => {
	return sort(
		x[1].title.toLocaleLowerCase(),
		y[1].title.toLocaleLowerCase(),
		0
	);
};
export const DirMapContent = (props: {
	util: DataOperator<any, any, any>;
	setInSelect: React.Dispatch<React.SetStateAction<number>>;
	setVisible: (_v: boolean) => void;
	visible?: boolean;
}) => {
	const [checked, setChecked] = useState('');
	const [err, setErr] = useState(false);
	const ul = useRef(null);
	const open = useRef(false);
	const [destination, setDestination] = useState('');
	const [dirs, setDirs] = useState(
		[] as unknown as Seq.Indexed<[string, DirectoryInfo]>
	);
	useEffect(() => {
		if (!props.util.dirMap) {
			return;
		}
		setDirs(props.util.dirMap.entrySeq().sort(sortCNAndEN));
	}, [props.util.dirMap]);
	useEffect(() => {
		if (!props.visible) {
			open.current = false;
		} else if (!checked) {
			open.current = true;
		}
		if (props.visible && checked && !open.current) {
			open.current = true;
			let e = document.querySelector(`#checkbox-${checked} + label`);
			if (e) {
				(ul.current as unknown as HTMLElement).scrollTop = (
					e as any
				).offsetTop;
			}
		}
	}, [checked, props.visible]);
	const dirList = useMemo(() => {
		return (
			<div className={styles['dir-map-list-wrap']}>
				<ul className={styles['dir-map-list']} ref={ul}>
					{dirs.map((dir: [string, DirectoryInfo], v) => {
						const dirIndex = dir[0];
						return (
							<li
								className={styles['dir-map-item']}
								id={'input-' + dirIndex}
								key={dirIndex}
							>
								<input
									checked={checked === dirIndex}
									className={styles['dir-map-checkbox']}
									disabled={!galleryConfig.r18}
									id={'checkbox-' + dirIndex}
									onClick={() => {
										if (checked === dirIndex) {
											setChecked('');
											setDestination('');
											return;
										}
										setChecked(dirIndex);
										setDestination(dirIndex);
									}}
									readOnly
									type={'checkbox'}
								/>
								<label htmlFor={'checkbox-' + dirIndex}>
									<div
										className={
											styles['dir-map-item-content']
										}
									>
										<span>
											{galleryConfig.r18
												? dir[1].title
												: `文件夹${v}`}
										</span>
										<span
											className={
												styles['dir-map-item-count']
											}
										>
											{dir[1].count}
										</span>
									</div>
								</label>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}, [dirs, checked]);
	return (
		<div className={styles['dir-map-container']}>
			{dirList}
			<input
				className={`${styles['dir-map-input']} ${
					err ? styles['dir-map-input--error'] : ''
				}`}
				disabled={!galleryConfig.r18}
				onChange={() => {
					if (err) {
						setErr(false);
					}
				}}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						props.util
							.addNewDir((e.target as HTMLInputElement).value)
							.then((dirIndex) => {
								if (dirIndex > -1) {
									(e.target as HTMLInputElement).value = '';
									setChecked(dirIndex.toString());
									setDestination(dirIndex.toString());
								} else {
									setErr(true);
									document
										.querySelector(`#input-${-dirIndex}`)!
										.scrollIntoView();
									setChecked(dirIndex);
									setDestination(dirIndex);
								}
							});
					}
				}}
				type={'text'}
			/>
			<ButtonContainer
				handleCancel={() => {
					dialogActive.setActive(false);
					props.setVisible(false);
				}}
				handleConfirm={() => {
					if (destination.length === 0 || !galleryConfig.r18) {
						return;
					} else if (isNaN(parseInt(destination))) {
						throw new Error('Wrong destination directory');
					}
					props.util.addFileToDir(parseInt(destination));
					dialogActive.setActive(false);
					props.setVisible(false);
					props.setInSelect((v: number) => v + 1);
				}}
			/>
		</div>
	);
};
