import { useCallback, useEffect, useRef, useState } from 'react';
import { ReactComponent as Console } from '../../icon/console.svg';
import { FileOperator } from '../../utils/fileOperator';
import { WindowSearch } from './Search';
import styles from './style/header.module.scss';
const { ipcRenderer } = window.require('electron');
const WindowButtons = () => {
	return (
		<>
			<div className={styles['header-btn']}>
				<button
					id={styles['console']}
					onClick={() => {
						ipcRenderer.send('console');
					}}
				>
					<Console />
				</button>
				<button
					id={styles['minimize']}
					onClick={() => {
						ipcRenderer.send('min');
					}}
				></button>
				<button
					id={styles['maximize']}
					onClick={() => {
						ipcRenderer.send('max');
					}}
				></button>
				<button
					id={styles['close']}
					onClick={() => {
						FileOperator.getInstance().writeBack();
						ipcRenderer.send('close');
					}}
				></button>
			</div>
		</>
	);
};
export const Header = () => {
	const [title, setTitle] = useState('');
	const fileOperator = useRef(FileOperator.getInstance()).current;
	const handleKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.ctrlKey) {
			let page = Number(
				/page=([0-9]+)/.exec(window.location.href)?.[1] ?? '1'
			);
			if (e.key === 'e') {
				window.location.href = window.location.href.replace(
					/page=\d+/,
					'page=' + (page + 1)
				);
			} else if (e.key === 'q') {
				if (page > 1) {
					window.location.href = window.location.href.replace(
						/page=\d+/,
						'page=' + (page - 1)
					);
				}
			} else if (e.key === 'a') {
				document
					// eslint-disable-next-line quotes
					.querySelectorAll("input[type='checkbox']")
					.forEach((e: any) => e.click());
			}
		}
	}, []);
	useEffect(() => {
		fileOperator.register(setTitle, true);
	}, [fileOperator]);
	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);
	return (
		<header className={styles['header']} id="header">
			<WindowButtons />
			<span className={styles['app-title']}>{title}</span>
			<WindowSearch />
		</header>
	);
};
