import { useController } from 'syill';
import { ReactComponent as RenameIcon } from '../../../icon/rename.svg';
import { ImageComponent, ImageDirectory } from '../../../types/global';
import { GalleryOperator } from '../../../utils/data/galleryOperator';
import { renameVisibleStore } from '../../../utils/store';
import styles from '../style/img.module.scss';
export const ImageDir: ImageComponent<ImageDirectory> = (props: {
	src: string;
	data: ImageDirectory;
	util: GalleryOperator;
}) => {
	const [, setVis] = useController(renameVisibleStore);
	return (
		<div className={styles.img}>
			<div className={styles['img-wrapper']}>
				<a href={`#/gallery?directory=${props.data.id}&page=1`}>
					<div className={styles['directory']}>
						<img alt="" src={props.src}></img>
					</div>
				</a>
			</div>
			<a
				className={styles['pack-title']}
				href={`#/gallery?directory=${props.data.id}&page=1`}
			>
				<span
					className={styles['pack-title-name']}
					title={props.data.title}
				>
					{props.data.title}
				</span>
			</a>
			<span className={styles['icon-span']}>
				<RenameIcon
					onClick={() => {
						setVis(true);
						props.util.packToBeRenamed = {
							id: props.data.id,
							oldTitle: props.data.title
						};
					}}
				/>
			</span>
		</div>
	);
};
