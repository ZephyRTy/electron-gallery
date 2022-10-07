/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as Back } from '../../../icon/back.svg';
import { ReactComponent as HomePage } from '../../../icon/home.svg';
import globalConfig, {
	defaultCover,
	imageCountOfSinglePage
} from '../../../types/constant';
import { FileOperator } from '../../../utils/fileOperator';
import { openInExplorer } from '../../../utils/functions';
import { OpenInExplorerBtn } from '../Buttons';
import { Sidebar, SidebarContainer } from '../Menu';
import { PageNav } from '../PageNav';
import '../style/PackDetail.scss';
import { Toast } from '../Toast';
import { AddBookmark } from './AddBookmark';
import { DetailContainer } from './DetailContainer';
const fs = window.require('fs');
const path = window.require('path');
const parseToInt = (str: string) => {
	return Number(/[0-9]+/.exec(str)?.[0]) ?? NaN;
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
// 图包详情页面外层组件
export const PackDetail = () => {
	const { pack } = useParams();
	const fileOperator = useRef(FileOperator.getInstance()).current;
	const currentPath = useRef(fileOperator.current(parseInt(pack!))?.path);
	let [searchParams] = useSearchParams();
	let page = searchParams.get('page')
		? parseInt(searchParams.get('page') as string, 10)
		: 1;
	const [images, setImages] = useState([] as HTMLImageElement[]);
	const imgList = useRef([] as { src: string; index: number }[]);
	const length = useRef({ value: 0 }).current;
	const [total, setTotal] = useState(0);
	const bookmarkToast = useRef((arg: boolean) => {});
	const handleOpenFolder = useCallback(() => {
		if (!pack) return;
		openInExplorer(currentPath.current);
	}, [pack]);
	useEffect(() => {
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
		if (!globalConfig.r18) {
			imgList.current = fileList.map((v, i) => ({
				src: defaultCover,
				index: i
			}));
		} else {
			imgList.current = fileList
				.filter((e) => e !== 'thumb.jpg')
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
						let formatA = a.src.split('.').at(-1),
							formatB = b.src.split('.').at(-1);
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
			img.src = v.src;
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
	return (
		<div className="pack-detail-container">
			<SidebarContainer>
				<Sidebar className="menu">
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
					<OpenInExplorerBtn handleClick={handleOpenFolder} />
				</Sidebar>
			</SidebarContainer>
			<Toast handler={bookmarkToast} message="添加书签成功！" />
			<DetailContainer
				images={images}
				total={Math.ceil(total / imageCountOfSinglePage)}
			/>
			<PageNav
				current={page}
				pack={pack}
				total={Math.ceil(total / imageCountOfSinglePage)}
			/>
		</div>
	);
};
