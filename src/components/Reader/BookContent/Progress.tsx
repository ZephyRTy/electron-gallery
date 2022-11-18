/* eslint-disable react/jsx-max-props-per-line */
import { Rendition } from 'epubjs';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useData } from 'syill';
import { percentageStore } from '../../../utils/store';
import styles from '../style/reader.module.scss';
import { EpubContext } from './EpubContent';

export const Progress = (props: { rendition: Rendition | null }) => {
	const book = useContext(EpubContext);
	const [percentage, setPercentage] = useData(percentageStore);
	const [show, setShow] = useState(false);
	const handleChange = useMemo(() => {
		let timer: any;
		return (e: React.ChangeEvent<HTMLInputElement>) => {
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(() => {
				console.log(e.target.value);
				const cfi = book
					?.getBook()!
					.locations.cfiFromPercentage(Number(e.target.value) / 1000);
				book?.jumpTo(cfi);
			}, 200);
		};
	}, [book, setPercentage]);
	useEffect(() => {
		if (!props.rendition || !book) {
			return;
		}
		book?.getBook()!
			.locations.generate(1000)
			.then(() => {
				setPercentage(book.getPercentage() * 1000);
				setShow(true);
			});
	}, [book, props.rendition]);
	return (
		<div
			className={styles['epub-progress']}
			style={{ display: show ? 'flex' : 'none' }}
		>
			<input
				max={1000}
				min={0}
				onChange={(e) => {
					setPercentage(Number(e.target.value));
					handleChange(e);
				}}
				step={1}
				type="range"
				value={percentage}
			/>
			<div className={styles['epub-progress-percentage']}>
				<span>{`${(percentage / 10).toFixed(1)}%`}</span>/
				<span>100%</span>
			</div>
		</div>
	);
};
