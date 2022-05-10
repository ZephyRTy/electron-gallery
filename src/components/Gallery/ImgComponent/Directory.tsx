import { useCallback, useEffect, useState } from 'react';
import { ReactComponent as Star } from '../../../icon/star.svg';
import { BasicData, ImageComponent } from '../../../types/global';
import { FileOperator } from '../../../utils/fileOperator';
import styles from '../style/img.module.scss';
export const ImageDir: ImageComponent<BasicData> = (props: {
	src: string;
	data: BasicData;
	util: FileOperator;
}) => {
	const [stared, setStared] = useState(props.data.stared);
	useEffect(() => {
		if (stared === props.data.stared) {
			return;
		}
		props.data.stared = stared;
		props.util.staredUpdate(props.data);
	}, [props.data, props.util, stared]);
	const clickHandler = useCallback(() => {
		setStared((v) => !v);
	}, []);

	return (
		<div className={styles.img}>
			<div className={styles['img-wrapper']}>
				<a href={`#/gallery?directory=${props.data.index}&page=1`}>
					<div className={styles['directory']}>
						<img alt="" src={props.src}></img>
					</div>
				</a>
			</div>
			<a
				href={`#/gallery?directory=${props.data.index}&page=1`}
				className={styles['pack-title']}
			>
				<span
					title={props.data.title}
					className={styles['pack-title-name']}
				>
					{props.data.title}
				</span>
			</a>
			<span className={styles['icon-span']}>
				<Star
					className={stared ? styles['stared'] + ' ' : ''}
					onClick={clickHandler}
				/>
			</span>
		</div>
	);
};
export default ImageDir;
