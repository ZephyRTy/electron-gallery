/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as Back } from '../../../icon/back.svg';
import { ReactComponent as HomePage } from '../../../icon/home.svg';
import galleryConfig, {
	defaultCover,
	imageCountOfSinglePage
} from '../../../types/constant';
import { GalleryOperator } from '../../../utils/data/galleryOperator';
import { Sidebar, SidebarContainer } from '../../Menu';
import { OpenInExplorerBtn } from '../Buttons';
import { Loading } from '../Loading';
import { PageNav } from '../PageNav';
import { PageOfTotal } from '../PageOfTotal';
import '../style/PackDetail.scss';
import { Toast } from '../Toast';
import { AddBookmark } from './AddBookmark';
import { DetailContainer } from './DetailContainer';
const fs = window.require('fs');
const path = window.require('path');
const parseToInt = (str: string) => {
	const arr = str.matchAll(/\d+/g);
	let result = '';
	for (let i of arr) {
		result += i[0];
	}
	return parseInt(result, 10);
};
//const a = Stream;
const endsWith = (str: string, ...arg: string[]) => {
	for (let i of arg) {
		if (str.endsWith(i)) {
			return true;
		}
	}
	return false;
};
const isValidImage = (src: string) => {
	return endsWith(
		src.toLocaleLowerCase(),
		'jpg',
		'jpeg',
		'png',
		'gif',
		'bmp'
	);
};
// 图包详情页面外层组件
export const PackDetail = () => {
	const { pack } = useParams();
	const fileOperator = useRef(GalleryOperator.getInstance()).current;
	const currentPath = useRef(
		fileOperator.packWillOpen(parseInt(pack!))?.path
	);
	let [searchParams] = useSearchParams();
	let page = searchParams.get('page')
		? parseInt(searchParams.get('page') as string, 10)
		: 1;
	const [images, setImages] = useState([] as HTMLImageElement[]);
	const imgList = useRef([] as { src: string; index: number }[]);
	const length = useRef({ value: 0 }).current;
	const [total, setTotal] = useState(0);
	const bookmarkToast = useRef((arg: boolean) => {});

	useEffect(() => {
		fileOperator.titleUpdate();
		(document.scrollingElement as any).scrollTop = 0;
	}, [images]);
	useEffect(() => {
		if (!pack) {
			imgList.current = [];
			return;
		}
		let filePath = currentPath.current;
		if (!filePath) {
			return;
		}
		const fileList: string[] = fs.readdirSync(filePath);
		if (!galleryConfig.r18) {
			imgList.current = fileList.map((v, i) => ({
				src: defaultCover,
				index: i
			}));
		} else {
			imgList.current = fileList
				.filter((e) => !e.startsWith('thumb.jpg') && isValidImage(e))
				.map((v: any, i: any) => {
					return {
						src: path.join(filePath, v),
						index: parseToInt(v)
					};
				})
				.sort(
					(
						a: { index: number; src: string },
						b: { index: number; src: string }
					) => {
						let formatA = path.extname(a.src),
							formatB = path.extname(b.src);
						if (formatA !== formatB) {
							return formatA! > formatB! ? 1 : -1;
						}
						return a.index - b.index;
					}
				);
		}
		if (!total) {
			setTotal(imgList.current.length);
		}
		return () => {
			length.value = 0;
		};
	}, []);
	useEffect(() => {
		let currentList = imgList.current.slice(
			imageCountOfSinglePage * (page - 1),
			imageCountOfSinglePage * page
		);
		length.value = currentList.length;
		let cache = [] as { index: number; img: HTMLImageElement }[];
		currentList.forEach((v, i) => {
			let src = v.src.toLocaleLowerCase();
			if (
				!endsWith(
					src.toLocaleLowerCase(),
					'jpg',
					'jpeg',
					'png',
					'gif',
					'bmp',
					'webp'
				)
			) {
				--length.value;
				return;
			}
			let img = new Image();
			img.src = v.src
				.replaceAll(/%/g, encodeURIComponent('%'))
				.replaceAll(/\s/g, encodeURIComponent(' '))
				.replaceAll(/#/g, encodeURIComponent('#'));
			img.onload = () => {
				cache.push({ img, index: v.index });

				if (cache.length >= length.value) {
					setImages(
						cache
							.sort((a, b) => {
								return a.index - b.index;
							})
							.map((e) => e.img)
					);
				}
				img.onload = null;
			};
			img.onerror = () => {
				img.onerror = null;
				console.log(decodeURIComponent(img.src));
				--length.value;
				if (cache.length >= length.value) {
					setImages(
						cache
							.sort((a, b) => {
								return a.index - b.index;
							})
							.map((e) => e.img)
					);
				}
			};
		});
		return () => {
			setImages([]);
		};
	}, [page]);
	const totalPage = useMemo(
		() => Math.ceil(total / imageCountOfSinglePage),
		[total]
	);
	return (
		<div className="pack-detail-container">
			<PageOfTotal current={page} total={totalPage} />
			<SidebarContainer>
				<Sidebar menuPosition="middle">
					<button
						className="btn-homepage detail-icon"
						onClick={() => {
							window.location.href = fileOperator.loadPrevPage();
						}}
					>
						<HomePage />
					</button>
					<button
						className="back detail-icon"
						onClick={() => {
							window.history.back();
						}}
					>
						<Back />
					</button>
					<AddBookmark
						bookmarkToast={bookmarkToast}
						fileOperator={fileOperator}
						pack={pack}
					/>
					<OpenInExplorerBtn filePath={currentPath?.current} />
				</Sidebar>
			</SidebarContainer>
			<Toast handler={bookmarkToast} message="添加书签成功！" />
			<DetailContainer
				images={images}
				total={Math.ceil(total / imageCountOfSinglePage)}
			/>
			{images.length ? (
				<>
					<PageNav
						current={page}
						pack={pack}
						total={Math.ceil(total / imageCountOfSinglePage)}
					/>
				</>
			) : (
				<Loading />
			)}
		</div>
	);
};
