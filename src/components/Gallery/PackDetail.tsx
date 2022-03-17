/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
const fs = window.require('fs');

const ImgDetail = (props: { src: string }) => {
	return <img alt="" src={props.src} className="img-detail"></img>;
};
export const PackDetail = () => {
	const navigate = useNavigate();
	const { pack } = useParams();
	const [images, setImages] = useState([]);
	const [flag, setFlag] = useState(false);
	const [length, setLength] = useState(0);
	let renderImg = useMemo(() => {
		return images.map((v, i) => {
			return <ImgDetail src={v.src} key={v + i} />;
		});
	}, [flag]);
	useEffect(() => {
		if (!pack) {
			return;
		}
		let imgList: string[] = fs.readdirSync(
			String.raw`D:\img\show_img\图片` + '\\' + pack
		);
		setLength(imgList.length);
		imgList.forEach((v) => {
			let img = new Image();
			img.src = String.raw`D:\img\show_img\图片` + '\\' + pack + '\\' + v;
			img.onload = () => {
				setImages((prev) => [...prev, img]);
			};
		});
	}, [pack]);
	useEffect(() => {
		if (images.length === length) {
			setFlag((v) => !v);
		}
	}, [images]);
	return (
		<div className="img-detail-container">
			<button
				className="back"
				onClick={(e) => {
					//window.location.href = 'http://localhost:3000/';
					navigate(-1);
				}}
			>
				返回
			</button>
			{renderImg}
		</div>
	);
};
