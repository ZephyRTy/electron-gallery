import { useEffect, useRef, useState } from 'react';
import galleryConfig, { readerConfig, translation } from '../../types/constant';
import { dialogActive } from '../../utils/store';
import { ButtonContainer } from '../ButtonContainer';
import { fs } from '../Dialog';
import styles from '../style/dialog.module.scss';

const { ipcRenderer } = window.require('electron');
const { dialog } = window.require('@electron/remote');
export const configContent = (props: {
	setVisible: (_v: boolean) => void;
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
						onClick={() => {
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
