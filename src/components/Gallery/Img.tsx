/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react';
import { ReactComponent as Star } from '../../icon/star.svg';
import { Bookmark, Data } from '../../types/global';
import { FileOperator } from '../../utils/fileOperator';
import { bookmarkOrData } from '../../utils/functions';
import { snapshot } from '../../utils/snapshot';
import { BookmarkItem } from './Bookmarks';
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
	const clickHandler = useCallback(() => {
		setStared((v) => !v);
	}, []);

	return (
		<div className={styles.img}>
			<div className={styles['img-wrapper']}>
				<a href={'#/gallery/pack/' + props.data.title + '?page=1'}>
					<img alt="" src={props.src}></img>
				</a>
			</div>
			<a
				href={'#/gallery/pack/' + props.data.title + '?page=1'}
				className={styles['pack-title']}
			>
				<span title={props.data.title}>{props.data.title}</span>
			</a>
			<span
				className={
					(stared ? styles['stared'] + ' ' : '') + styles['star-span']
				}
				onClick={clickHandler}
			>
				<Star />
			</span>
		</div>
	);
};
let index = 0;
export const ImgContainer = (props: {
	packs: Data[] | Bookmark[];
	util: FileOperator;
}) => {
	const [images, setImages] = useState([[], [], [], []] as {
		img: HTMLImageElement;
		data: Data | Bookmark;
	}[][]);
	const length = useRef({ value: 0, loaded: 0 }).current;
	const snapshotRef = useRef(snapshot).current;
	useEffect(() => {
		if (snapshotRef.ready) {
			setImages(snapshotRef.load());
		} else {
			length.value = props.packs.length;
			length.loaded = 0;
			let cache: { img: HTMLImageElement; data: Data }[][] = [
				[],
				[],
				[],
				[]
			];
			let heights = [0, 0, 0, 0];
			props.packs.forEach((v) => {
				let img = new Image();
				let imgPath = v.path + v.cover;
				img.src = imgPath;
				img.onload = () => {
					let min = minIndex(heights);
					heights[min] +=
						Math.ceil(
							180 * (img.naturalHeight / img.naturalWidth)
						) + cache[min].push({ img, data: v });
					length.loaded++;
					if (length.loaded === length.value) {
						setImages([...cache]);
						cache = [];
					}
					img.onload = null;
				};
				img.onerror = () => {
					--length.value;
					img.onerror = null;
					if (length.loaded === length.value) {
						setImages([...cache]);
						cache = [];
					}
					//props.util.collectMissing(v.title, v.index);
					let err = new Error(
						`${v.title} with index ${v.index} get wrong`
					);
					console.error(err);
					console.log(imgPath);

					//props.util.collectMissing(v.title, v.index);
				};
			});
		}

		return () => {
			setImages([[], [], [], []]);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.packs]);
	useEffect(() => {
		(document.scrollingElement as any).scrollTop = 0;
	}, [images]);
	return (
		<main className={styles['img-main-content']}>
			{images?.map((v) => {
				return (
					<div key={index++} className={styles['img-pack']}>
						{v.map((ele) => {
							if (bookmarkOrData(ele.data)) {
								return (
									<BookmarkItem
										key={index++}
										data={ele.data}
										src={ele.img.src}
										util={props.util}
									></BookmarkItem>
								);
							}
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
		</main>
	);
};
