import React, { useEffect, useState } from 'react';
import styles from './style/toast.module.scss';
export const Toast = (props: {
	message: string;
	handler: React.MutableRefObject<any>;
}) => {
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		props.handler.current = setVisible;
	}, [props]);
	return (
		<div
			className={
				styles['toast'] + (visible ? ' ' + styles['visible'] : '')
			}
		>
			<div className={styles['toast-content']}>
				<span className={styles['toast-message']}>{props.message}</span>
			</div>
		</div>
	);
};
