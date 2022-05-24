/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as AddBookmark } from '../../../icon/addBookmark.svg';
import { ReactComponent as Back } from '../../../icon/back.svg';
import { ReactComponent as HomePage } from '../../../icon/homepage.svg';
import { imageCountOfSinglePage } from '../../../types/constant';
import { BasicData } from '../../../types/global';
import { FileOperator } from '../../../utils/fileOperator';
import { formatDate } from '../../../utils/functions';
import { Menu } from '../Menu';
import { PageNav } from '../PageNav';
import '../style/PackDetail.scss';
import { Toast } from '../Toast';
import { DetailContainer } from './DetailContainer';
const fs = window.require('fs');
const path = window.require('path');
const parseToInt = (str: string) => {
	return Number(/[0-9]+/.exec(str)?.[0]) ?? NaN;
};
//const a = Stream;

export const PackDetail = () => {
	const { pack } = useParams();
	const fileOperator = useRef(FileOperator.getInstance()).current;
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
		(document.scrollingElement as any).scrollTop = 0;
	}, [images]);
	useEffect(() => {
		if (!pack) {
			imgList.current = [];
			return;
		}
		let filePath = fileOperator.current(parseInt(pack))?.path;
		if (!filePath) {
			return;
		}
		imgList.current = fs
			.readdirSync(filePath)
			.map((v: any, i: any) => {
				return { src: path.join(filePath, v), index: parseToInt(v) };
			})
			.sort(
				(a: { index: number }, b: { index: number }) =>
					a.index - b.index
			);
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
				!(
					src.endsWith('.jpg') ||
					src.endsWith('.png') ||
					src.endsWith('.gif')
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
			<Menu>
				<button
					className="btn-homepage icon"
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
				<button
					className="add-bookmark detail-icon"
					onClick={(e) => {
						let top = Math.round(
							document.getElementsByClassName(
								'pack-detail-list'
							)[0].scrollTop
						);
						let elements = Array.from(
							document.getElementsByClassName('pack-detail')
						) as HTMLImageElement[];
						let imgIndex = 0;
						for (let i = 0; i < elements.length - 1; i++) {
							if (
								elements[i].offsetTop > top &&
								top < elements[i + 1].offsetTop
							) {
								if (
									elements[i].offsetTop - top <
									elements[i + 1].offsetTop - top
								) {
									imgIndex = i;
								} else {
									imgIndex = i + 1;
								}
								break;
							}
						}
						if (imgIndex < 0) {
							imgIndex = 0;
						}
						let imgSrc =
							'\\' + elements[imgIndex].src.split('/').pop();
						let data = fileOperator.current(
							parseInt(pack!),
							false
						) as BasicData;
						let url = '';

						// 记录当前图片的位置
						let href = window.location.href;
						if (href.includes('&scroll')) {
							url = `#${href
								.split('#')
								.pop()
								?.replace(/scroll=[0-9]+/, '&scroll=' + top)}`;
						} else {
							url = `#${href.split('#')[1]}&scroll=` + top;
						}
						fileOperator.bookmarksUpdate({
							...data,
							cover: imgSrc,
							url,
							timeStamp: formatDate(new Date())
						});
						bookmarkToast.current(true);

						(e.target as HTMLButtonElement).disabled = true;
						setTimeout(() => {
							(e.target as HTMLButtonElement).disabled = false;
							bookmarkToast.current(false);
						}, 1000);
					}}
				>
					<AddBookmark />
				</button>
			</Menu>
			<Toast message="添加书签成功！" handler={bookmarkToast} />
			<DetailContainer
				images={images}
				total={Math.ceil(total / imageCountOfSinglePage)}
			/>
			<PageNav
				total={Math.ceil(total / imageCountOfSinglePage)}
				current={page}
				pack={pack}
			/>
		</div>
	);
};
