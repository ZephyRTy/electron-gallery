import styles from './style/img.module.scss';
export const Select = (props: { visible: boolean }) => {
	return (
		<input
			type="checkbox"
			className={styles['check-box']}
			style={{ display: props.visible ? 'initial' : 'none' }}
		/>
	);
};
