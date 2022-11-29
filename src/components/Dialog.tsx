/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-undef
import { Seq } from 'immutable';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Store, useController, useData } from 'syill';
import { dispatch } from 'syill/lib/type';
import galleryConfig, {
	lineHeight,
	readerConfig,
	translation
} from '../types/constant';
import { Chapter, DirectoryInfo } from '../types/global';
import { DataOperator } from '../utils/data/DataOperator';
import { GalleryOperator } from '../utils/data/galleryOperator';
import {
	changedAlertStore,
	commentVisStore,
	configVisibleStore,
	dialogActive,
	dirMapVisibleStore,
	RegInputVisibleStore,
	renameVisibleStore,
	selectionStore
} from '../utils/store';
import { ButtonContainer } from './ButtonContainer';
import { TextContext } from './Reader/BookContent/TextContent';
import styles from './style/dialog.module.scss';
const fs = window.require('fs');
const { dialog } = window.require('@electron/remote');
const { ipcRenderer } = window.require('electron');
const dialogShowFlag = {
	flags: new Map<string, dispatch<boolean>>(),
	add(key: string, dispatch: dispatch<boolean>) {
		if (!this.flags.has(key)) {
			this.flags.set(key, dispatch);
		} else {
			throw new Error('key already exists');
		}
	},
	remove(key: string) {
		if (this.flags.has(key)) {
			this.flags.delete(key);
		} else {
			throw new Error('key not exists');
		}
	},
	hideOthers(key: string) {
		for (const [k, v] of this.flags) {
			if (k === key) {
				v(true);
			} else {
				v(false);
			}
		}
	}
};
function createDialog<T>(
	Component: (
		props: T & { setVisible: any; visible: boolean }
	) => JSX.Element,
	store: Store<boolean>,
	id: string
) {
	return (props: Omit<Omit<T, 'setVisible'>, 'visible'>) => {
		const [visible, setVisible] = useData(store);
		const storeId = useMemo(() => id, []);
		useEffect(() => {
			dialogShowFlag.add(storeId, setVisible);
			return () => {
				dialogShowFlag.remove(storeId);
			};
		}, []);
		useEffect(() => {
			if (visible) {
				dialogShowFlag.hideOthers(storeId);
			}
		}, [visible]);
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
const DirMapContent = (props: {
	util: DataOperator<any, any, any>;
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
const RenameContent = (props: {
	util: GalleryOperator;
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

const configContent = (props: {
	setVisible: (v: boolean) => void;
	oldConfig: object;
	type: 'gallery' | 'reader';
}) => {
	const { oldConfig: globalConfig } = props;
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
			<ButtonContainer
				handleCancel={() => {
					dialogActive.setActive(false);
					newConfig.current = { ...globalConfig };
					props.setVisible(false);
					setConfirmed((v) => !v);
				}}
				handleConfirm={() => {
					let obj = {
						gallery: galleryConfig,
						reader: readerConfig
					};
					obj[props.type] = newConfig.current;
					fs.writeFileSync(
						'D:\\webDemo\\desktop-reader\\src\\config\\config.json',
						JSON.stringify(obj)
					);
					ipcRenderer.send('relaunch');
				}}
			/>
		</div>
	);
};

const ConfigItem = (props: {
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

const CatalogItem = (props: { chapter: Chapter; current: boolean }) => {
	const item = useMemo(() => {
		return (
			<li
				className={
					styles['catalog-list-item'] +
					(props.current ? ' ' + styles['current-chapter'] : '')
				}
				onClick={() => {
					document.querySelector('#reader-scroll-ele')!.scrollTop =
						props.chapter.index * lineHeight;
				}}
				title={props.chapter.title}
			>
				<span>{props.chapter.title}</span>
			</li>
		);
	}, [props.chapter, props.current]);
	return <>{item}</>;
};
const RegExpSetContent = (props: {
	setVisible: (v: boolean) => void;
	currentChapter: number;
}) => {
	const book = useContext(TextContext);
	const [reg, setReg] = useState(book?.reg || '');
	const [catalog, setCatalog] = useState(book?.getCatalog() || []);
	useEffect(() => {
		setReg(book?.reg || '');
	}, [book?.reg]);
	useEffect(() => {
		setCatalog(book?.getCatalog() || []);
	}, [book]);
	return (
		<div className={styles['regexp-container']}>
			<textarea
				className={styles['catalog-reg-input']}
				onChange={(e) => {
					setReg(e.target.value);
				}}
				value={reg.toString()}
			/>
			<ButtonContainer
				handleCancel={() => {
					dialogActive.setActive(false);
					props.setVisible(false);
				}}
				handleConfirm={() => {
					book.reParseCatalog(reg);
					setCatalog(book.getCatalog());
					props.setVisible(false);
				}}
			/>
		</div>
	);
};

const ChangedAlertContent = (props: { setVisible: (v: boolean) => void }) => {
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
const CommentContent = (props: {
	setVisible: (v: boolean) => void;
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
export const DirMap = createDialog(DirMapContent, dirMapVisibleStore, 'dirMap');
export const Rename = createDialog(RenameContent, renameVisibleStore, 'rename');
export const Config = createDialog(configContent, configVisibleStore, 'config');
export const RegExpSet = createDialog(
	RegExpSetContent,
	RegInputVisibleStore,
	'regSet'
);
export const ChangedAlert = createDialog(
	ChangedAlertContent,
	changedAlertStore,
	'changedAlert'
);

export const CommentDialog = createDialog(
	CommentContent,
	commentVisStore,
	'comment'
);
