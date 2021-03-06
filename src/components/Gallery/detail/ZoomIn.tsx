import React from 'react';
import { ReactComponent as LastPage } from '../../../icon/lastPage.svg';
import { ReactComponent as NextPage } from '../../../icon/nextPage.svg';
export const ImageZoomIn = (props: {
	src: string;
	setCurrent: React.Dispatch<React.SetStateAction<number>>;
	prev: () => void;
	next: () => void;
}) => {
	return (
		<div
			id={'zoom-in'}
			style={{ display: props.src?.length > 0 ? 'flex' : 'none' }}
		>
			<button className="zoom-prev zoom-page" onClick={props.prev}>
				<LastPage />
			</button>
			<img
				alt=""
				onClick={() => {
					props.setCurrent(-1);
				}}
				onWheel={(e) => {
					if (e.deltaY > 0) {
						props.next();
					} else {
						props.prev();
					}
				}}
				src={props.src}
			/>
			<button className="zoom-next zoom-page" onClick={props.next}>
				<NextPage />
			</button>
		</div>
	);
};
