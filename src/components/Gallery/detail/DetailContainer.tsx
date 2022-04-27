/* eslint-disable react-hooks/exhaustive-deps */
import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { imgCountInOnePage } from '../../../types/constant';
import { ImageZoomIn } from './ZoomIn';

const ImgDetail = (props: {
	src: string;
	setCurrent: React.Dispatch<React.SetStateAction<number>>;
	index: number;
}) => {
	let clickHandler = useCallback(() => {
		props.setCurrent(props.index);
	}, [props]);
	return (
		<img
			alt=""
			src={props.src}
			className="pack-detail"
			onClick={clickHandler}
		></img>
	);
};

const WIDTH = document.body.clientWidth * 0.7 * 0.65;
export const DetailContainer = (props: {
	images: HTMLImageElement[];
	total: number;
}) => {
	const [current, setCurrent] = useState(-1);
	let [searchParams, setParams] = useSearchParams();
	let page = Number(searchParams.get('page') || '1');
	let scroll = Number(searchParams.get('scroll') || '0');
	const scrollingElement = useRef(null);
	const prev = useCallback(() => {
		if (current <= 0) {
			if (page > 1) {
				setParams({ 'page': (page - 1).toString() });
			}
			return;
		}
		setCurrent((v) => v - 1);
	}, [current, page, setParams]);
	const next = useCallback(() => {
		if (current >= props.images.length - 1) {
			if (page < props.total) {
				setParams({ 'page': (page + 1).toString() });
			}
			return;
		}
		setCurrent((v) => v + 1);
	}, [current, props.images.length, props.total, page, setParams]);
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
		props.images.slice(0, current).forEach((v) => {
			h += (v.naturalHeight / v.naturalWidth) * WIDTH;
		});
		(scrollingElement.current as unknown as HTMLElement).scrollTop =
			h + current * 60;
	}, [current]);
	useLayoutEffect(() => {
		if (isNaN(scroll)) {
			scroll = 0;
		}
		if (scroll >= 0) {
			setTimeout(() => {
				(scrollingElement.current as unknown as HTMLElement).scrollTop =
					scroll;
			}, 300);
		}
	}, [scroll]);
	return (
		<>
			<main className="pack-detail-list" ref={scrollingElement}>
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
			</main>
			<ImageZoomIn
				src={current >= 0 ? props.images[current]?.src : ''}
				setCurrent={setCurrent}
				prev={prev}
				next={next}
			/>
		</>
	);
};
