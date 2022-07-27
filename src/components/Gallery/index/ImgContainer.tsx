/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useEffectOnChange } from '../../../hooks/useEffectOnChange';
import { defaultCover } from '../../../types/constant';
import {
	BasicData,
	Bookmark,
	ImageComponent,
	Mode
} from '../../../types/global';
import { FileOperator } from '../../../utils/fileOperator';
import {
	hasExternalDriver,
	isBookmark,
	isDirData
} from '../../../utils/functions';
import { ImgWaterfallCache } from '../../../utils/ImgWaterFallCache';
import {
	Add,
	Back,
	BookmarkBtn,
	CrawlerBtn,
	HomePage,
	Refresh,
	SelectPacks,
	ShowDir,
	Stared
} from '../Buttons';
import { DirMap, Rename } from '../Dialog';
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
	const [inSelect, setInSelect] = useState(0);
	const handleDirMap = useRef((_v: boolean) => {});
	const handleRename = useRef((_v: boolean) => {});
	const menu = useMemo(() => {
		return (
			//TODO 增加文件夹中文件flat功能
			<Menu>
				<HomePage />
				<Back inSelect={inSelect} setInSelect={setInSelect} />
				<Stared />
				<BookmarkBtn />
				<ShowDir />
				<Refresh util={props.util} />
				<Add util={props.util} />
				<CrawlerBtn />
				<SelectPacks
					handleClick={() => {
						handleDirMap.current(true);
					}}
					inSelect={inSelect}
				/>
			</Menu>
		);
	}, [inSelect, props]);
	useEffect(() => {
		return () => {
			waterfallCache.save();
		};
	}, []);
	const dirMap = useMemo(() => {
		return (
			<DirMap
				handleVisible={handleDirMap}
				setInSelect={setInSelect}
				util={props.util}
			/>
		);
	}, [props.util]);
	useEffectOnChange(() => {
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
				let imgPath =
					!hasExternalDriver && v.cover.startsWith('E')
						? defaultCover
						: v.path + v.cover;
				img.src = String.raw`${imgPath}`;
				img.onload = () => {
					img.onload = null;
					let min = minIndex(heights);
					let height = isDirData(v)
						? 100
						: Math.ceil(
								180 * (img.naturalHeight / img.naturalWidth)
						  );
					heights[min] += height + buffer[min].push({ img, data: v });
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
						`${v.title} with index ${v.id} get wrong`
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
	}, [props.packs]);
	useEffect(() => {
		if (
			props.util.getMode() === Mode.ShowDir ||
			props.util.getMode() === Mode.InDir
		) {
			setInSelect(0);
		}
		(document.scrollingElement as any).scrollTop = 0;
		if (images[0].length === 0) {
			return;
		}
		waterfallCache.saveTemp([...images]);
	}, [images, props.util, waterfallCache]);
	return (
		<>
			{menu}
			{dirMap}
			<Rename handleVisible={handleRename} util={props.util} />
			<main className={styles['img-main-content']}>
				{images.map((v) => {
					return (
						<div className={styles['img-pack']} key={index++}>
							{v.map((ele) => {
								let Component: ImageComponent<any>;
								if (isBookmark(ele.data)) {
									Component = BookmarkItem;
								} else if (!ele.data.path) {
									Component = ImageDir;
								} else {
									Component = NormalImg;
								}

								return (
									<Component
										data={ele.data}
										inSelect={inSelect}
										key={index++}
										renameCallback={handleRename}
										setInSelect={setInSelect}
										src={ele.img.src}
										util={props.util}
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
