import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BasicData, Bookmark, ImageComponent } from '../../../types/global';
import { FileOperator } from '../../../utils/fileOperator';
import { isBookmark } from '../../../utils/functions';
import { ImgWaterfallCache } from '../../../utils/ImgWaterFallCache';
import {
	Add,
	Back,
	BookmarkBtn,
	HomePage,
	Refresh,
	SelectPacks,
	Stared
} from '../Buttons';
import { Dialog } from '../Dialog';
import BookmarkItem from '../ImgComponent/Bookmarks';
import ImageDir from '../ImgComponent/Directory';
import NormalImg, { minIndex } from '../ImgComponent/NormalImg';
import { Menu } from '../Menu';
import styles from '../style/img.module.scss';
let index = 0;
export const ImgContainer = (props: {
	packs: BasicData[] | Bookmark[];
	util: FileOperator;
	inDir: boolean;
	// eslint-disable-next-line no-unused-vars
	refresh: any;
}) => {
	const [images, setImages] = useState([[], [], [], []] as {
		img: HTMLImageElement;
		data: BasicData | Bookmark;
	}[][]);
	const length = useRef({ value: 0, loaded: 0 }).current;
	const waterfallCache = useRef(ImgWaterfallCache.getInstance()).current;
	const [inSelect, setInSelect] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const handleDialog = useRef((_v: boolean) => {});
	const menu = useMemo(() => {
		return (
			<Menu>
				<HomePage />
				<Back setInSelect={setInSelect} inSelect={inSelect} />
				<Stared />
				<Add util={props.util} />
				<Refresh util={props.util} />
				<BookmarkBtn />
				<SelectPacks
					inSelect={inSelect}
					handleClick={() => {
						handleDialog.current(true);
					}}
				/>
			</Menu>
		);
	}, [inSelect, props]);
	useEffect(() => {
		return () => {
			waterfallCache.save();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		if (props.packs.length === 0) {
			return;
		}
		length.loaded = 0;
		if (waterfallCache.isNeeded(props.packs)) {
			setImages(waterfallCache.load());
		} else {
			length.value = props.packs.length;
			let buffer: { img: HTMLImageElement; data: BasicData }[][] = [
				[],
				[],
				[],
				[]
			];
			let heights = [0, 0, 0, 0];
			//NOTE 预渲染图像
			props.packs.forEach((v) => {
				let img = new Image();
				let imgPath = v.path + v.cover;
				img.src = imgPath;
				img.onload = () => {
					img.onload = null;
					let min = minIndex(heights);
					heights[min] +=
						Math.ceil(
							180 * (img.naturalHeight / img.naturalWidth)
						) + buffer[min].push({ img, data: v });
					length.loaded++;
					if (length.loaded >= length.value) {
						setImages([...buffer]);
					}
				};
				img.onerror = () => {
					--length.value;
					img.onerror = null;
					if (length.loaded >= length.value) {
						setImages([...buffer]);
					}
					let err = new Error(
						`${v.title} with index ${v.index} get wrong`
					);
					console.error(err);
					console.log(imgPath);
				};
			});
		}
		return () => {
			setImages([[], [], [], []]);
			length.loaded = 0;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.packs]);
	useEffect(() => {
		(document.scrollingElement as any).scrollTop = 0;
		if (images[0].length === 0) {
			return;
		}
		waterfallCache.saveTemp([...images]);
	}, [images, waterfallCache]);
	return (
		<>
			{menu}
			<Dialog
				util={props.util}
				handleVisible={handleDialog}
				setInSelect={setInSelect}
			/>
			<main className={styles['img-main-content']}>
				{images?.map((v) => {
					return (
						<div key={index++} className={styles['img-pack']}>
							{v.map((ele) => {
								let Component: ImageComponent<any>;
								if (isBookmark(ele.data)) {
									Component = BookmarkItem;
								} else if (ele.data.status >= 2) {
									Component = ImageDir;
								} else {
									Component = NormalImg;
								}
								return (
									<Component
										key={index++}
										data={ele.data}
										src={ele.img.src}
										util={props.util}
										setInSelect={setInSelect}
										inSelect={inSelect}
									></Component>
								);
							})}
						</div>
					);
				})}
			</main>
		</>
	);
};
