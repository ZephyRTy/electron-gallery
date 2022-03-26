/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as Star } from '../../icon/star.svg';
import { Data, FileOperator } from '../../utils/fileOperator';
import styles from './style/img.module.scss';
const minIndex = (arr: number[]) => {
	let min = 0;
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] < arr[min]) {
			min = i;
		}
	}
	return min;
};
export const Img = (props: { src: string; data: Data; util: FileOperator }) => {
	const [stared, setStared] = useState(props.data.stared);
	useEffect(() => {
		if (stared === props.data.stared) {
			return;
		}
		props.data.stared = stared;
		props.util.staredWillUpdated(props.data.index, props.data.stared);
	}, [stared]);
	return (
		<div className={styles.img}>
			<img alt="" src={props.src}></img>
			<a
				href={'#/gallery/pack/' + props.data.title}
				className={styles['pack-title']}
			>
				<span title={props.data.title}>{props.data.title}</span>
			</a>
			<span
				className={
					(stared ? styles['stared'] + ' ' : '') + styles['star-span']
				}
				onClick={() => {
					setStared(!stared);
				}}
			>
				<Star />
			</span>
		</div>
	);
};
let index = 0;
export const ImgContainer = (props: { packs: Data[]; util: FileOperator }) => {
	const [images, setImages] = useState(
		[] as { img: HTMLImageElement; data: Data }[]
	);
	const length = useRef({ value: 0 }).current;
	const [renderImg, setRenderImg] = useState(
		[] as { img: HTMLImageElement; data: Data }[][]
	);
	useEffect(() => {
		if (images.length === 0) {
			setRenderImg([[], [], [], []]);
		}
		const heights = [0, 0, 0, 0];
		let divList: {
			img: HTMLImageElement;
			data: Data;
		}[][] = [[], [], [], []];
		images.forEach((v) => {
			let min = minIndex(heights);
			heights[min] +=
				Math.ceil(180 * (v.img.naturalHeight / v.img.naturalWidth)) +
				divList[min].push(v);
		});
		document.body.scrollTop = 0;
		setRenderImg(divList);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [images, props.packs]);
	useEffect(() => {
		length.value = props.packs.length;
		let cache: { img: HTMLImageElement; data: Data }[] = [];
		props.packs.forEach((v) => {
			let img = new Image();
			let imgPath = v.path + v.cover;
			img.src = imgPath;
			img.onload = () => {
				cache.push({ img, data: v });
				if (cache.length === length.value) {
					setImages(cache);
					cache = [];
				}
				img.onload = null;
			};
			img.onerror = () => {
				--length.value;
				img.onerror = null;
				if (cache.length === length.value) {
					setImages(cache);
					cache = [];
				}
				props.util.collectMissing(v.title, v.index);
				let err = new Error(
					`${v.title} with index ${v.index} get wrong`
				);
				console.error(err);
				//props.util.collectMissing(v.title, v.index);
			};
		});
		return () => {
			setImages([]);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.packs]);
	return (
		<div className={styles['img-main-content']}>
			{renderImg?.map((v) => {
				return (
					<div key={index++} className={styles['img-pack']}>
						{v.map((ele) => {
							return (
								<Img
									key={index++}
									data={ele.data}
									src={ele.img.src}
									util={props.util}
								></Img>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};
