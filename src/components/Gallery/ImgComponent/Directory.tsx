import { ReactComponent as RenameIcon } from '../../../icon/rename.svg';
import { BasicData, DirData, ImageComponent } from '../../../types/global';
import { FileOperator } from '../../../utils/fileOperator';
import styles from '../style/img.module.scss';
export const ImageDir: ImageComponent<BasicData> = (props: {
	src: string;
	data: DirData;
	util: FileOperator;
	renameCallback?: any;
}) => {
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
				href={`#/gallery?directory=${props.data.id}&page=1`}
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
				<RenameIcon
					onClick={() => {
						props.renameCallback.current(true);
						props.util.renameId = {
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
