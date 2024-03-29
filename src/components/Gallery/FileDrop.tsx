/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useModel } from 'syill';
import { BasicBookmark, BasicData, BasicFolder } from '../../types/global';
import { DataOperator } from '../../utils/data/DataOperator';
import { fileDropVisibleStore } from '../../utils/store';
import styles from './style/fileDrop.module.scss';
// eslint-disable-next-line no-unused-vars
const _ = React;
export const FileDrop = <
	A extends BasicData,
	B extends BasicBookmark,
	C extends BasicFolder
>(props: {
	operator: DataOperator<A, B, C>;
	itemType: 'file' | 'folder';
}) => {
	const visible = useModel(fileDropVisibleStore);
	const [result, setResult] = useState([] as string[]);
	useEffect(() => {
		if (!visible) {
			setResult([]);
		}
	}, [visible]);
	return (
		<div
			className={
				styles['cover'] + ' ' + (visible ? styles['visible'] : '')
			}
		>
			<div className={styles['file-drop']}>
				<div
					className={styles['file-drop__content']}
					onDragEnter={(e) => {
						e.preventDefault();
						e.stopPropagation();
					}}
					onDragLeave={(e) => {
						e.preventDefault();
						e.stopPropagation();
					}}
					onDragOver={(e) => {
						e.preventDefault();
						e.stopPropagation();
					}}
					onDrop={(e) => {
						e.preventDefault();
						e.stopPropagation();
						const files = Array.from(e.dataTransfer.files);
						if (files.length > 0) {
							props.operator
								.addNewPack(
									files.map((e) => {
										return {
											title: e.name,
											path: e.path.replace(/\\/g, '/')
										};
									}),
									false
								)
								.then((res) => {
									if (Array.isArray(res)) {
										setResult([...res]);
									}
								});
						}
					}}
				>
					<div className={styles['file-drop__span']}>
						{result.length > 0
							? result.map((e, i) => {
									let s = e.split(':::');
									return (
										<p
											className={styles['error-info']}
											key={i}
										>
											<span
												className={
													styles['error-info--title']
												}
											>
												{s[0]}
											</span>
											&nbsp;
											<span
												className={
													styles[
														'error-info__type--' +
															(s[1] === '成功'
																? 'success'
																: 'error')
													]
												}
											>
												{s[1]}
											</span>
										</p>
									);
							  })
							: 'Drop files here'}
					</div>
				</div>
			</div>
		</div>
	);
};
