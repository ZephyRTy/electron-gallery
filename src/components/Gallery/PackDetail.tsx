/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ReactComponent as Back } from '../../icon/back.svg';
import './style/PackDetail.scss';
const fs = window.require('fs');

const ImgDetail = (props: { src: string }) => {
	return <img alt="" src={props.src} className="pack-detail"></img>;
};
export const PackDetail = () => {
	const navigate = useNavigate();
	const { pack } = useParams();
	const [images, setImages] = useState([] as HTMLImageElement[]);
	const [flag, setFlag] = useState(false);
	const [length, setLength] = useState(0);
	let renderImg = useMemo(() => {
		return images.map((v, i) => {
			return <ImgDetail src={v.src} key={v.src.slice(0, 5) + i} />;
		});
	}, [flag]);
	useEffect(() => {
		return () => {
			images.forEach((v) => {
				v.onload = null;
			});
		};
	}, []);
	useEffect(() => {
		if (!pack) {
			return;
		}
		let imgList: string[] = fs.readdirSync(
			String.raw`D:\img\show_img\图片` + '\\' + pack
		);
		imgList.sort((a, b) => parseInt(a) - parseInt(b));
		setLength(imgList.length);
		imgList.forEach((v) => {
			if (
				!(
					v.toLocaleLowerCase().endsWith('.jpg') ||
					v.toLocaleLowerCase().endsWith('.png')
				)
			) {
				return;
			}
			let img = new Image();
			img.src = String.raw`D:\img\show_img\图片` + '\\' + pack + '\\' + v;
			img.onload = () => {
				setImages((prev: any) => [...prev, img]);
				img.onload = null;
			};
		});
	}, [pack]);
	useEffect(() => {
		if (images.length === length) {
			setFlag((v) => !v);
		}
	}, [images]);
	return (
		<div className="pack-detail-container">
			<button
				className="back"
				onClick={() => {
					//window.location.href = 'http://localhost:3000/';
					navigate(-1);
				}}
			>
				<Back />
			</button>
			{renderImg}
		</div>
	);
};
