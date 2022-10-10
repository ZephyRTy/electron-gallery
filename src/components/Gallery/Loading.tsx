import styles from './style/loading.module.scss';
export const Loading = () => {
	return (
		<div className={styles['loading']}>
			<Spin size="large" />
		</div>
	);
};

const Spin = (props: { size: string }) => {
	return (
		<div
			className={styles[`spin-${props.size}`] + ' ' + styles['spinner']}
		></div>
	);
};
