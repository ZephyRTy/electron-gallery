/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-undef
import { Seq } from 'immutable';
import React, { useEffect, useRef, useState } from 'react';
import { Store, useData } from 'syill';
import globalConfig, { translation } from '../../types/constant';
import { DirectoryInfo } from '../../types/global';
import { FileOperator } from '../../utils/fileOperator';
import {
	configVisibleStore,
	dialogActive,
	dirMapVisibleStore,
	renameVisibleStore
} from '../../utils/store';
import styles from './style/dialog.module.scss';
const fs = window.require('fs');
const { dialog } = window.require('@electron/remote');
const { ipcRenderer } = window.require('electron');
const longestCommonString = (s1: string, s2: string) => {
	let common = '';
	let len = Math.min(s1.length, s2.length);
	for (let i = 0; i < len; ++i) {
		if (s1[i] === s2[i]) {
			common += s1[i];
		} else {
			return common;
		}
	}
};
function createDialog<T>(
	Component: (props: T) => JSX.Element,
	store: Store<boolean>
) {
	return (props) => {
		const [visible, setVisible] = useData(store);
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
						<li className={styles['dir-map-item']} key={dirIndex}>
							<input
								checked={checked === dirIndex}
								className={styles['dir-map-checkbox']}
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
				className={`${styles['dir-map-input']} ${
					err ? styles['dir-map-input--error'] : ''
				}`}
				onChange={(e) => {
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
								}
							});
					}
				}}
				type={'text'}
			/>
			<div className={styles['dialog-button-contain']}>
				<button
					className={
						styles['dialog-button'] +
						' ' +
						styles['dialog-button__back']
					}
					onClick={() => {
						dialogActive.setActive(false);
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
						if (destination.length === 0 || !globalConfig.r18) {
							return;
						} else if (isNaN(parseInt(destination))) {
							throw new Error('Wrong destination directory');
						}
						props.util.addFileToDir(parseInt(destination));
						dialogActive.setActive(false);
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
				onChange={(e) => {
					setNewTitle((e.target as HTMLInputElement).value);
				}}
				value={newTitle}
			/>
			<div className={styles['dialog-button-contain']}>
				<button
					className={
						styles['dialog-button'] +
						' ' +
						styles['dialog-button__back']
					}
					onClick={() => {
						dialogActive.setActive(false);
						props.setVisible(false);
						props.util.packToBeRenamed = { id: -1, oldTitle: '' };
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
						if (!globalConfig.r18) {
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
				>
					确认
				</button>
			</div>
		</div>
	);
};

export const configContent = (props: { setVisible: (v: boolean) => void }) => {
	const newConfig = useRef({ ...globalConfig });
	const [confirmed, setConfirmed] = useState(false);
	return (
		<div className={styles['config-container']}>
			<ul className={styles['config-list']}>
				{Object.keys(globalConfig).map((e) => (
					<ConfigItem
						confirmed={confirmed}
						itemKey={e}
						key={e}
						newConfig={newConfig.current}
						value={globalConfig[e]}
					/>
				))}
			</ul>
			<div className={styles['dialog-button-contain']}>
				<button
					className={
						styles['dialog-button'] +
						' ' +
						styles['dialog-button__back']
					}
					onClick={() => {
						dialogActive.setActive(false);
						newConfig.current = { ...globalConfig };
						props.setVisible(false);
						setConfirmed((v) => !v);
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
						fs.writeFileSync(
							'D:\\webDemo\\desktop-reader\\src\\config\\config.json',
							JSON.stringify(newConfig.current)
						);
						ipcRenderer.send('relaunch');
					}}
				>
					确认
				</button>
			</div>
		</div>
	);
};

export const ConfigItem = (props: {
	itemKey: string;
	confirmed: boolean;
	value: boolean | string | number;
	newConfig: object;
}) => {
	const [value, setValue] = useState(props.value);
	useEffect(() => {
		setValue(props.value);
	}, [props.confirmed]);
	const item = () => {
		switch (typeof value) {
			case 'number':
				return (
					<input
						onChange={(e) => {
							setValue(parseInt(e.target.value));
							props.newConfig[props.itemKey] =
								parseInt(e.target.value) || 20;
						}}
						type="number"
						value={value}
					/>
				);
			case 'string':
				if (value.startsWith('http')) {
					return (
						<div>
							<input
								id={'input' + props.itemKey}
								onChange={(e) => {
									props.newConfig[props.itemKey] =
										e.target.value;
									setValue(e.target.value.toString());
								}}
								type="text"
								value={value}
							/>
						</div>
					);
				} else {
					const otherAtt = { directory: '', webkitdirectory: '' };
					return (
						<div>
							<span
								className={styles['config-file-label']}
								onClick={() => {
									dialog
										.showOpenDialog({
											title: '选择路径', //默认路径,默认选择的文件
											defaultPath: props.value, //过滤文件后缀
											// filters: [
											// 	{
											// 		name: '文件夹',
											// 		extensions: ['jpg', 'png']
											// 	}
											// ],
											properties: ['openDirectory']
										})
										.then((result) => {
											let newPath =
												result.filePaths[0].replaceAll(
													'\\',
													'/'
												);
											setValue(newPath);
											props.newConfig[props.itemKey] =
												newPath;
										})
										.catch((err) => {
											console.log(err);
										});
								}}
								title={value}
							>
								{value}
							</span>
						</div>
					);
				}
			case 'boolean':
				return (
					<input
						checked={value}
						onClick={(e) => {
							setValue(!Boolean(value));
							props.newConfig[props.itemKey] = !value;
						}}
						readOnly
						type="checkbox"
					/>
				);
		}
	};
	return (
		<li className={styles['config-item']}>
			<span>{translation[props.itemKey]}</span>
			<div>{item()}</div>
		</li>
	);
};
export const DirMap = createDialog(DirMapContent, dirMapVisibleStore);
export const Rename = createDialog(RenameContent, renameVisibleStore);
export const Config = createDialog(configContent, configVisibleStore);
