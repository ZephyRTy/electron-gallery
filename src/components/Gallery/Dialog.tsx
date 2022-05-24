/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-undef
import { Seq } from 'immutable';
import { useEffect, useRef, useState } from 'react';
import { DirectoryInfo } from '../../types/global';
import { FileOperator } from '../../utils/fileOperator';
import styles from './style/dialog.module.scss';
function createDialog<T>(Component: (props: T) => JSX.Element) {
	return (props: Omit<T, 'setVisible'> & { handleVisible: any }) => {
		const [visible, setVisible] = useState(false);
		useEffect(() => {
			props.handleVisible.current = setVisible;
		}, [props]);
		return (
			<div
				className={
					styles['dialog-cover'] +
					(visible ? '' : ' ' + styles['hidden'])
				}
			>
				<div className={styles['dialog']}>
					<Component
						{...(props as any)}
						setVisible={setVisible}
						visible={visible}
					/>
				</div>
			</div>
		);
	};
}
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
const sortCNAndEN = (
	x: [string, DirectoryInfo],
	y: [string, DirectoryInfo]
) => {
	// let a = x[1].title[0];
	// let b = y[1].title[0];
	// let cReg =
	// 	/^[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/;
	// if (!cReg.test(a) || !cReg.test(b)) {
	// 	return a.localeCompare(b);
	// }
	// return a.localeCompare(b, 'zh');
	return sort(
		x[1].title.toLocaleLowerCase(),
		y[1].title.toLocaleLowerCase(),
		0
	);
};
export const DirMapContent = (props: {
	util: FileOperator;
	setInSelect: React.Dispatch<React.SetStateAction<number>>;
	setVisible: (v: boolean) => void;
	visible?: boolean;
}) => {
	const [checked, setChecked] = useState('');
	const [refresh, setRefresh] = useState(false);
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
	return (
		<>
			<ul className={styles['dir-map-list']} ref={ul}>
				{dirs.map((dir: [string, DirectoryInfo], v) => {
					const dirIndex = dir[0];
					return (
						<li key={dirIndex} className={styles['dir-map-item']}>
							<input
								type={'checkbox'}
								className={styles['dir-map-checkbox']}
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
								<div className={styles['dir-map-item-content']}>
									<span>{dir[1].title}</span>
									<span
										className={styles['dir-map-item-count']}
									>
										{dir[1].count}
									</span>
								</div>
							</label>
						</li>
					);
				})}
			</ul>
			<input
				type={'text'}
				className={`${styles['dir-map-input']} ${
					err ? styles['dir-map-input--error'] : ''
				}`}
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
								}
							});
					}
				}}
				onChange={(e) => {
					if (err) {
						setErr(false);
					}
				}}
			/>
			<div className={styles['dialog-button-contain']}>
				<button
					className={
						styles['dialog-button'] +
						' ' +
						styles['dialog-button__back']
					}
					onClick={() => {
						props.setVisible(false);
					}}
				>
					返回
				</button>
				<button
					className={
						styles['dialog-button'] +
						' ' +
						styles['dialog-button__confirm']
					}
					onClick={() => {
						if (destination.length === 0) {
							return;
						} else if (isNaN(parseInt(destination))) {
							throw new Error('Wrong destination directory');
						}
						props.util.addFileToDir(parseInt(destination));
						props.setVisible(false);
						props.setInSelect((v: number) => v + 1);
					}}
				>
					确认
				</button>
			</div>
		</>
	);
};
export const RenameContent = (props: {
	util: FileOperator;
	setVisible: (v: boolean) => void;
}) => {
	const [newTitle, setNewTitle] = useState('');
	useEffect(() => {
		setNewTitle(props.util.oldTitle!);
	}, [props.util.oldTitle]);
	return (
		<div className={styles['rename-contain']}>
			<input
				className={styles['rename-input']}
				value={newTitle}
				onChange={(e) => {
					setNewTitle((e.target as HTMLInputElement).value);
				}}
			/>
			<div className={styles['dialog-button-contain']}>
				<button
					className={
						styles['dialog-button'] +
						' ' +
						styles['dialog-button__back']
					}
					onClick={() => {
						props.setVisible(false);
						props.util.renameId = { id: -1, oldTitle: '' };
					}}
				>
					返回
				</button>
				<button
					className={
						styles['dialog-button'] +
						' ' +
						styles['dialog-button__confirm']
					}
					onClick={() => {
						props.util.rename(newTitle).then((res) => {
							if (res) {
								props.setVisible(false);
							} else {
								console.log('rename fail');
							}
						});
					}}
				>
					确认
				</button>
			</div>
		</div>
	);
};

export const DirMap = createDialog(DirMapContent);
export const Rename = createDialog(RenameContent);
