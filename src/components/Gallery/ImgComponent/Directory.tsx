import { useController } from 'syill';
import { ReactComponent as RenameIcon } from '../../../icon/rename.svg';
import { DirData, ImageComponent } from '../../../types/global';
import { FileOperator } from '../../../utils/fileOperator';
import { renameVisibleStore } from '../../../utils/store';
import styles from '../style/img.module.scss';
export const ImageDir: ImageComponent<DirData> = (props: {
	src: string;
	data: DirData;
	util: FileOperator;
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
export default ImageDir;
