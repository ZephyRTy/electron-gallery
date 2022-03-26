/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as Back } from '../../icon/back.svg';
import { FileOperator } from '../../utils/fileOperator';
import { PageNav } from './PageNav';
import './style/PackDetail.scss';
const fs = window.require('fs');
const path = window.require('path');
const ImgDetail = (props: { src: string }) => {
	return <img alt="" src={props.src} className="pack-detail"></img>;
};
const imgCountInOnePage = 20;
export const PackDetail = () => {
	const { pack } = useParams();
	const fileOperator = useRef(FileOperator.getInstance()).current;
	let [searchParams] = useSearchParams();
	let page = searchParams.get('page')
		? parseInt(searchParams.get('page') as string, 10)
		: 1;
	const [images, setImages] = useState([] as JSX.Element[]);
	const length = useRef({ value: 0 }).current;
	const [total, setTotal] = useState(0);
	useEffect(() => {
		(document.scrollingElement as any).scrollTop = 0;
	}, [images]);
	useEffect(() => {
		return () => {
			length.value = 0;
		};
	}, []);
	useEffect(() => {
		window.history.replaceState(
			'',
			window.location.href,
			fileOperator.loadSnapshot()
		);
		if (!pack) {
			return;
		}
		let filePath = fileOperator.current(pack);
		let imgList: string[] = fs.readdirSync(filePath);
		imgList.sort((a, b) => parseInt(a) - parseInt(b));
		if (!total) {
			setTotal(imgList.length);
		}
		let currentList = imgList.slice(
			imgCountInOnePage * (page - 1),
			imgCountInOnePage * page
		);
		length.value = currentList.length;
		let cache = [] as JSX.Element[];
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

			let img = new Image();
			img.src = path.join(filePath, v);
			img.onload = () => {
				let elem = (
					<ImgDetail
						src={img.src}
						key={i + img.src.slice(0, 5) + i}
					/>
				);
				cache.push(elem);
				if (cache.length === length.value) {
					setImages(cache);
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
	}, [pack, page]);
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
			<div className="pack-detail-list">{images}</div>
			<PageNav total={Math.ceil(total / 20)} current={page} pack={pack} />
		</div>
	);
};
