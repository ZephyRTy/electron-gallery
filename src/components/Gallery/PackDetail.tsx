/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import _sortBy from 'lodash/sortBy';
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState
} from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as Back } from '../../icon/back.svg';
import { FileOperator } from '../../utils/fileOperator';
import { PageNav } from './PageNav';
import './style/PackDetail.scss';
import { ImageZoomIn } from './ZoomIn';
const fs = window.require('fs');
const path = window.require('path');
const ImgDetail = (props: {
	src: string;
	setCurrent: React.Dispatch<React.SetStateAction<number>>;
	index: number;
}) => {
	let clickHandler = useCallback(() => {
		props.setCurrent(props.index);
	}, [props.src]);
	return (
		<img
			alt=""
			src={props.src}
			className="pack-detail"
			onClick={clickHandler}
		></img>
	);
};
const imgCountInOnePage = 20;
const WIDTH = document.body.clientWidth * 0.7 * 0.65;
const DetailContainer = (props: {
	images: HTMLImageElement[];
	total: number;
}) => {
	const [current, setCurrent] = useState(-1);
	let [searchParams, setParams] = useSearchParams();
	let page = Number(searchParams.get('page') || '1');
	const prev = useCallback(() => {
		if (current <= 0) {
			if (page > 1) {
				setParams({ 'page': (page - 1).toString() });
			}
			return;
		}
		setCurrent((v) => v - 1);
	}, [props.images, current, page]);
	const next = useCallback(() => {
		if (current >= props.images.length - 1) {
			if (page < props.total) {
				setParams({ 'page': (page + 1).toString() });
			}
			return;
		}
		setCurrent((v) => v + 1);
	}, [props.images, current, page]);
	useEffect(() => {
		if (current > 0) {
			setCurrent(0);
		} else if (current === 0) {
			setCurrent(imgCountInOnePage - 1);
		}
	}, [page]);
	useLayoutEffect(() => {
		if (current < 0) {
			return;
		}
		let h = 0;
		props.images.slice(0, current).forEach((v, i) => {
			h += (v.naturalHeight / v.naturalWidth) * WIDTH;
		});
		(document.scrollingElement as any).scrollTop = h;
	}, [current]);
	return (
		<div className="pack-detail-list">
			{props.images.map((v, i) => {
				return (
					<ImgDetail
						src={v.src}
						key={i + v.src.slice(0, 5) + i}
						setCurrent={setCurrent}
						index={i}
					/>
				);
			})}
			<ImageZoomIn
				src={current >= 0 ? props.images[current]?.src : ''}
				setCurrent={setCurrent}
				prev={prev}
				next={next}
			/>
		</div>
	);
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
	useEffect(() => {
		(document.scrollingElement as any).scrollTop = 0;
	}, [images]);
	useEffect(() => {
		if (!pack) {
			imgList.current = [];
			return;
		}
		let filePath = fileOperator.current(pack);
		imgList.current = _sortBy(fs.readdirSync(filePath), (e) => parseInt(e));
		if (!total) {
			setTotal(imgList.current.length);
		}
		return () => {
			length.value = 0;
		};
	}, []);
	useEffect(() => {
		window.history.replaceState(
			'',
			window.location.href,
			fileOperator.loadPrevPage()
		);

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
			let filePath = fileOperator.current(pack as any);
			let img = new Image();
			img.src = path.join(filePath, v);
			img.onload = () => {
				cache.push({ img, index: parseInt(v) });
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
			<button
				className="back"
				onClick={() => {
					window.history.back();
				}}
			>
				<Back />
			</button>
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
