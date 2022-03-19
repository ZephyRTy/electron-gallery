import { useEffect, useMemo, useState } from 'react';
import styles from './style/img.module.scss';
const fs = window.require('fs');
const minIndex = (arr: number[]) => {
	let min = 0;
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] < arr[min]) {
			min = i;
		}
	}
	return min;
};
export const Img = (props: { src: string; title: string }) => {
	return (
		<div className={styles.img}>
			<img alt="" src={props.src}></img>
			<a
				href={'#/gallery/pack/' + props.title}
				className={styles['pack-title']}
			>
				<span>{props.title}</span>
			</a>
		</div>
	);
};
let index = 0;
export const ImgContainer = (props: { packs: string[]; path: string }) => {
	const [images, setImages] = useState(
		[] as { img: HTMLImageElement; title: string }[]
	);
	const [flag, setFlag] = useState(false);
	let renderImg = useMemo(() => {
		if (images.length === 0) {
			return [[], [], [], []];
		}
		const heights = [0, 0, 0, 0];
		let divList: { img: HTMLImageElement; title: string }[][] = [
			[],
			[],
			[],
			[]
		];
		images.forEach((v) => {
			let min = minIndex(heights);
			heights[min] +=
				Math.ceil(170 * (v.img.naturalHeight / v.img.naturalWidth)) +
				divList[min].push(v);
		});
		// divList.flat().forEach((v) => {
		// 	console.log(v.title);
		// });
		//setSignal(!signal);
		return divList;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [flag, props.packs]);
	useEffect(() => {
		props.packs.forEach((v) => {
			let img = new Image();
			let imgPath = String.raw`${props.path}` + '\\' + String.raw`${v}`;
			let p = '';
			for (let i of fs.readdirSync(props.path + '\\' + v)) {
				if (
					i.toLocaleLowerCase().endsWith('.jpg') ||
					i.toLocaleLowerCase().endsWith('.png')
				) {
					p = i;
					break;
				}
			}
			if (p === '') {
				console.log(v);
				return;
			}
			img.src = imgPath + '\\' + p;

			img.onload = () => {
				setImages((prev) => [...prev, { img, title: v }]);
			};
		});
		return () => {
			images.forEach((v) => {
				v.img.onload = null;
			});
			setImages([]);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.packs]);

	useEffect(() => {
		if (images.length === props.packs.length) {
			setFlag((v) => !v);
		}
	}, [images, props.packs]);
	return (
		<div className={styles['img-main-content']}>
			{renderImg?.map((v) => {
				return (
					<div key={index++} className={styles['img-pack']}>
						{v.map((v) => {
							return (
								<Img
									key={index++}
									title={v.title}
									src={v.img.src}
								></Img>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};
