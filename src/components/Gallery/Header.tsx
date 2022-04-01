import { WindowSearch } from './Search';
import styles from './style/header.module.scss';
const { ipcRenderer } = window.require('electron');
const WindowButtons = () => {
	return (
		<div className={styles['header-btn']}>
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
					console.log(1);
					ipcRenderer.send('close');
				}}
			></button>
		</div>
	);
};
export const Header = () => {
	return (
		<header className={styles['header']} id="header">
			<WindowButtons />
			<span>{'图廊'}</span>
			<WindowSearch />
		</header>
	);
};
