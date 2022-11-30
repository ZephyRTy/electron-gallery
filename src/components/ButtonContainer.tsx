/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './style/dialog.module.scss';
export const ButtonContainer = (props: {
	handleCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	handleConfirm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
	return (
		<div className={styles['dialog-button-contain']}>
			<div className={styles['dialog-button-left']}></div>
			<button
				className={
					styles['dialog-button'] +
					' ' +
					styles['dialog-button__back']
				}
				onClick={props.handleCancel}
			>
				返回
			</button>
			<button
				className={
					styles['dialog-button'] +
					' ' +
					styles['dialog-button__confirm']
				}
				onClick={props.handleConfirm}
			>
				确认
			</button>
			<div className={styles['dialog-button-right']}></div>
		</div>
	);
};

export const TripleButtonContainer = (props: {
	handleCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	handleConfirm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	handleDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
	return (
		<div className={styles['dialog-button-contain']}>
			<div className={styles['dialog-button-left']}></div>
			<button
				className={
					styles['dialog-button'] +
					' ' +
					styles['dialog-button__back']
				}
				onClick={props.handleCancel}
			>
				返回
			</button>
			<button
				className={
					styles['dialog-button'] +
					' ' +
					styles['dialog-button__delete']
				}
				onClick={props.handleDelete}
			>
				删除
			</button>
			<button
				className={
					styles['dialog-button'] +
					' ' +
					styles['dialog-button__confirm']
				}
				onClick={props.handleConfirm}
			>
				确认
			</button>
			<div className={styles['dialog-button-right']}></div>
		</div>
	);
};
