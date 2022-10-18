import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as SetCover } from '../../../icon/cover.svg';
import { imageCountOfSinglePage } from '../../../types/constant';
import { GalleryOperator } from '../../../utils/galleryOperator';
import { imageStateStore } from '../../../utils/store';
import { Toast } from '../Toast';
import { ImageZoomIn } from './ZoomIn';
const ImgDetail = (props: {
	src: string;
	setCurrent: React.Dispatch<React.SetStateAction<number>>;
	index: number;
	renameToastHandler: { current: any };
}) => {
	let clickHandler = useCallback(() => {
		props.setCurrent(props.index);
	}, [props]);
	return (
		<div className="pack-detail-wrapper">
			<img
				alt=""
				className="pack-detail"
				onClick={clickHandler}
				src={props.src}
			></img>
			<SetCover
				className="set-cover"
				onClick={() => {
					GalleryOperator.getInstance()
						.changePackCover(
							window.location.href
								.split('?')[0]
								.split('/')
								.pop() as any,
							('\\' + props.src.split('/').pop()) as any,
							decodeURIComponent(
								props.src.replace('file:///', '')
							)
						)
						.then(() => {
							props.renameToastHandler.current(true);
							setTimeout(() => {
								props.renameToastHandler.current(false);
							}, 1000);
						});
				}}
			/>
		</div>
	);
};
const zoomStore = { current: -1 };
//const WIDTH = document.body.clientWidth * 0.7 * 0.65;
export const DetailContainer = (props: {
	images: HTMLImageElement[];
	total: number;
}) => {
	const [current, setCurrent] = useState(zoomStore.current);
	const currentZoom = useRef(imageStateStore);
	let [searchParams, setParams] = useSearchParams();
	let page = Number(searchParams.get('page') || '1');
	let scroll = Number(searchParams.get('scroll') || '0');

	const scrollingElement = useRef(null);
	// eslint-disable-next-line no-unused-vars
	const renameToast = useRef((_arg: boolean) => {});
	const prev = useCallback(() => {
		if (current <= 0) {
			if (page > 1) {
				setParams({ 'page': (page - 1).toString() });
			}
			return;
		}
		setCurrent((v) => v - 1);
		currentZoom.current.current = props.images[current - 1]?.src;
	}, [current, page, setParams]);
	const next = useCallback(() => {
		if (current >= props.images.length - 1) {
			if (page < props.total) {
				setParams({ 'page': (page + 1).toString() });
			}
			return;
		}
		setCurrent((v) => v + 1);
		currentZoom.current.current = props.images[current + 1].src;
	}, [current, props.images.length, props.total, page, setParams]);
	useEffect(() => {
		if (current > 0) {
			setCurrent(0);
		} else if (current === 0) {
			setCurrent(imageCountOfSinglePage - 1);
		}
	}, [page]);
	useLayoutEffect(() => {
		zoomStore.current = current;
		if (current < 0) {
			currentZoom.current.current = '';
			return;
		}

		const e = document.querySelector(
			'img[src="' + props.images[current]?.src + '"]'
		);
		e?.scrollIntoView();
	}, [current]);
	useEffect(() => {
		if (props.images.length && scroll) {
			(scrollingElement.current as unknown as HTMLElement).scrollTop =
				scroll;
		}
	}, [props.images.length, scroll]);
	return (
		<>
			<Toast handler={renameToast} message="更改封面成功！" />
			<main className="pack-detail-list" ref={scrollingElement}>
				{props.images.map((v, i) => {
					return (
						<ImgDetail
							index={i}
							key={i + v.src.slice(0, 5) + i}
							renameToastHandler={renameToast}
							setCurrent={setCurrent}
							src={v.src}
						/>
					);
				})}
			</main>
			<ImageZoomIn
				next={next}
				prev={prev}
				setCurrent={setCurrent}
				src={current >= 0 ? props.images[current]?.src : ''}
			/>
		</>
	);
};
