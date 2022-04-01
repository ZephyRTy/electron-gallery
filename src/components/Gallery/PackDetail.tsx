/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import _sortBy from 'lodash/sortBy';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as AddBookmark } from '../../icon/addBookmark.svg';
import { ReactComponent as Back } from '../../icon/back.svg';
import { ReactComponent as HomePage } from '../../icon/homepage.svg';
import { imgCountInOnePage } from '../../types/constant';
import { Data } from '../../types/global';
import { FileOperator } from '../../utils/fileOperator';
import { formatDate } from '../../utils/functions';
import { DetailContainer } from './ImgDetail';
import { Menu } from './Menu';
import { PageNav } from './PageNav';
import './style/PackDetail.scss';
import { Toast } from './Toast';
const fs = window.require('fs');
const path = window.require('path');
const parseToInt = (str: string) => {
	return Number(/[0-9]+/.exec(str)?.[0]) ?? NaN;
};
export const PackDetail = () => {
	const { pack } = useParams();
	const fileOperator = useRef(FileOperator.getInstance()).current;
	let [searchParams] = useSearchParams();
	let page = searchParams.get('page')
		? parseInt(searchParams.get('page') as string, 10)
		: 1;
	const [images, setImages] = useState([] as HTMLImageElement[]);
	const imgList = useRef([] as string[]);
	const length = useRef({ value: 0 }).current;
	const [total, setTotal] = useState(0);
	const toastHandler = useRef((arg: boolean) => {});
	useEffect(() => {
		(document.scrollingElement as any).scrollTop = 0;
	}, [images]);
	useEffect(() => {
		if (!pack) {
			imgList.current = [];
			return;
		}
		let filePath = fileOperator.current(pack)?.path;
		if (!filePath) {
			return;
		}
		imgList.current = _sortBy(fs.readdirSync(filePath), (e) => parseInt(e));
		if (!total) {
			setTotal(imgList.current.length);
		}
		return () => {
			length.value = 0;
		};
	}, []);
	useEffect(() => {
		let currentList = imgList.current.slice(
			imgCountInOnePage * (page - 1),
			imgCountInOnePage * page
		);
		length.value = currentList.length;
		let cache = [] as { index: number; img: HTMLImageElement }[];
		currentList.forEach((v, i) => {
			if (
				!(
					v.toLocaleLowerCase().endsWith('.jpg') ||
					v.toLocaleLowerCase().endsWith('.png') ||
					v.toLocaleLowerCase().endsWith('.gif')
				)
			) {
				--length.value;
				return;
			}
			let filePath = fileOperator.current(pack as any)?.path;
			let img = new Image();
			img.src = path.join(filePath, v);
			img.onload = () => {
				cache.push({ img, index: parseToInt(v) });
				if (cache.length === length.value) {
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
				console.log(img.src);
				fs.rename(
					filePath + '\\' + v,
					filePath + '\\' + v.replace(/#| /g, '-'),
					(err: any) => {
						if (err) {
							console.error(err);
						}
					}
				);
				--length.value;
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
						for (let i = 0; i < elements.length; i++) {
							if (elements[i].offsetTop > top) {
								imgIndex = i - 1;
								break;
							}
						}
						if (imgIndex < 0) {
							imgIndex = 0;
						}
						let imgSrc =
							'\\' + elements[imgIndex].src.split('/').pop();
						let data = fileOperator.current(pack as any) as Data;
						fileOperator.bookmarkWillBeUpdated({
							...data,
							cover: imgSrc,
							url: window.location.href + '&scroll=' + top,
							timeStamp: formatDate(new Date())
						});
						toastHandler.current(true);

						(e.target as HTMLButtonElement).disabled = true;
						setTimeout(() => {
							(e.target as HTMLButtonElement).disabled = false;
							toastHandler.current(false);
						}, 1000);
					}}
				>
					<AddBookmark />
				</button>
				<button
					className="btn-homepage icon"
					onClick={() => {
						window.location.href = fileOperator.loadPrevPage();
					}}
				>
					<HomePage />
				</button>
			</Menu>
			<Toast message="成功添加书签！" handler={toastHandler} />
			<DetailContainer
				images={images}
				total={Math.ceil(total / imgCountInOnePage)}
			/>
			<PageNav
				total={Math.ceil(total / imgCountInOnePage)}
				current={page}
				pack={pack}
			/>
		</div>
	);
};
