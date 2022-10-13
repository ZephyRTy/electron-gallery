import styles from '../style/reader.module.scss';

export const Placeholder = (props: { height: number }) => {
	return (
		<div className={styles['space']} style={{ height: props.height }}></div>
	);
};
