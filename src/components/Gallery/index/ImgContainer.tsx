/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useController } from 'syill';
import { useEffectOnChange } from '../../../hooks/useEffectOnChange';
import globalConfig, {
	defaultCover,
	getBookmarkThumb,
	imageCountOfSinglePage
} from '../../../types/constant';
import {
	Bookmark,
	ImageComponent,
	ImageData,
	Mode,
	NormalImage
} from '../../../types/global';
import {
	compress,
	hasExternalDriver,
	isBookmark,
	isImageDir
} from '../../../utils/functions';
import { GalleryOperator } from '../../../utils/galleryOperator';
import { ImgWaterfallCache } from '../../../utils/ImgWaterFallCache';
import { dialogActive, dirMapVisibleStore } from '../../../utils/store';
import { Config, DirMap, Rename } from '../../Dialog';
import { Menu, Sidebar, SidebarContainer } from '../../Menu';
import {
	Add,
	Back,
	ConfigBtn,
	CrawlerBtn,
	GotoReaderBtn,
	Refresh,
	SelectPacks
} from '../Buttons';
import BookmarkItem from '../ImgComponent/Bookmarks';
import { ImageDir } from '../ImgComponent/Directory';
import NormalImg, { minIndex } from '../ImgComponent/NormalImg';
import { Loading } from '../Loading';
import { PageNav } from '../PageNav';
import { PageOfTotal } from '../PageOfTotal';
import styles from '../style/img.module.scss';
let index = 0;
export const ImgContainer = (props: {
	packs: NormalImage[] | Bookmark[];
	util: GalleryOperator;
	inDir: boolean;
	page: number;
	total: number;
	refresh: any;
}) => {
	const [images, setImages] = useState([[], [], [], []] as {
		img: HTMLImageElement;
		data: ImageData;
	}[][]);
	const length = useRef({ value: 0, loaded: 0 }).current;
	const waterfallCache = useRef(ImgWaterfallCache.getInstance()).current;
	const [inSelect, setInSelect] = useState(0);
	const [dirMapVis, setDirMapVis] = useController(dirMapVisibleStore);
	const [ready, setReady] = useState(false);
	const topMenu = useMemo(() => {
		return (
			<Sidebar menuPosition="top">
				<Back inSelect={inSelect} setInSelect={setInSelect} />
				<Refresh util={props.util} />
				<Add util={props.util} />
				<CrawlerBtn />
				<ConfigBtn />
				<GotoReaderBtn />
				<SelectPacks
					handleClick={() => {
						if (dialogActive.active) {
							return;
						}
						dialogActive.setActive(true);
						setDirMapVis(true);
					}}
					inSelect={inSelect}
				/>
			</Sidebar>
		);
	}, [inSelect, props]);
	useEffect(() => {
		return () => {
			waterfallCache.save();
		};
	}, []);
	const dirMap = useMemo(() => {
		return <DirMap setInSelect={setInSelect} util={props.util} />;
	}, [props.util]);
	useEffectOnChange(() => {
		if (props.packs.length === 0) {
			setReady(true);
			return;
		}
		length.loaded = 0;
		if (waterfallCache.isNeeded(props.packs)) {
			setImages(waterfallCache.load());
		} else {
			length.value = props.packs.length;
			let waterfall: { img: HTMLImageElement; data: NormalImage }[][] = [
				[],
				[],
				[],
				[]
			];
			let heights = [0, 0, 0, 0];
			const buffer: { img: HTMLImageElement; data: NormalImage }[] = [];
			//NOTE 预渲染图像
			props.packs.forEach((v) => {
				let img = new Image();
				let imgPath =
					(!hasExternalDriver && v.cover.startsWith('E')) ||
					!globalConfig.r18
						? defaultCover
						: ((v.path ?? '') + v.cover).replace(/\\/g, '/');
				let coverPath = imgPath;
				if (isBookmark(v)) {
					coverPath =
						imgPath.split('/').slice(0, -1).join('/') +
						'/' +
						getBookmarkThumb(v);
				} else if (!imgPath.endsWith('blank.jpg')) {
					coverPath =
						imgPath.split('/').slice(0, -1).join('/') +
						'/thumb.jpg';
				}
				img.src = String.raw`${coverPath.replace(/\\/g, '/')}`
					.replaceAll(/\s/g, encodeURIComponent(' '))
					.replaceAll(/#/g, encodeURIComponent('#'));
				img.onload = () => {
					img.onload = null;
					buffer.push({ img, data: v });
					length.loaded++;
					if (length.loaded >= length.value) {
						buffer
							.sort((a, b) => {
								if (
									(isBookmark(a.data) &&
										isBookmark(b.data)) ||
									(isImageDir(a.data) && isImageDir(b.data))
								) {
									return b.data.timeStamp > a.data.timeStamp
										? 1
										: -1;
								}
								return b.data.id - a.data.id;
							})
							.forEach((v, i) => {
								let min = minIndex(heights);
								if (isImageDir(v.data)) {
									min = i % 4;
								}
								let height = isImageDir(v)
									? 100
									: Math.ceil(
											180 *
												(v.img.naturalHeight /
													v.img.naturalWidth)
									  );
								heights[min] +=
									height +
									waterfall[min].push({
										img: v.img,
										data: v.data
									});
							});
						setImages([...waterfall]);
						setReady(true);
					}
				};
				img.onerror = () => {
					--length.value;
					img.onerror = null;
					if (length.loaded >= length.value) {
						setImages([...waterfall]);
						setReady(true);
					}
					let err = new Error(
						`${v.title} with index ${v.id} get wrong`
					);
					console.error(err);
					console.log(decodeURIComponent(img.src));
					if (isBookmark(v)) {
						compress(
							decodeURIComponent(v.path + v.cover),
							getBookmarkThumb(v)
						);
					} else {
						compress(decodeURIComponent(v.path + v.cover)).catch(
							(err) => {
								console.log('compress failed');
								props.util.deletePack(v.id);
							}
						);
					}
				};
			});
		}
		return () => {
			setImages([[], [], [], []]);
			setReady(false);
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
	const totalPage = useMemo(
		() => Math.ceil(props.total / imageCountOfSinglePage),
		[props.total]
	);
	return (
		<>
			<SidebarContainer>
				{topMenu}
				<Menu />
			</SidebarContainer>
			{dirMap}
			<Config />
			<Rename util={props.util} />
			{ready ? (
				<>
					<PageOfTotal
						current={totalPage > 0 ? props.page : 0}
						total={totalPage}
					/>
					<main className={styles['img-main-content']}>
						{images.map((v) => {
							return (
								<div
									className={styles['img-pack']}
									key={index++}
								>
									{v.map((ele) => {
										if (!globalConfig.r18) {
											ele.data.title =
												'图包' + ele.data.id.toString();
										}
										let Component: ImageComponent<any>;
										if (isBookmark(ele.data)) {
											Component = BookmarkItem;
										} else if (isImageDir(ele.data)) {
											Component = ImageDir;
										} else {
											Component = NormalImg;
										}

										return (
											<Component
												data={ele.data}
												inSelect={inSelect}
												key={index++}
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
					<PageNav
						current={props.page}
						total={Math.ceil(props.total / 20)}
					/>
				</>
			) : (
				<Loading />
			)}
		</>
	);
};
