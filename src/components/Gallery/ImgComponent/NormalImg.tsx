/* eslint-disable no-undefined */
import { useCallback, useRef, useState } from 'react';
import { useController } from 'syill';
import { ReactComponent as Cross } from '../../../icon/cross.svg';
import { ReactComponent as RenameIcon } from '../../../icon/rename.svg';
import { ReactComponent as Star } from '../../../icon/star.svg';
import { ImageComponent, Mode, NormalImage } from '../../../types/global';
import { GalleryOperator } from '../../../utils/galleryOperator';
import { dialogActive, renameVisibleStore } from '../../../utils/store';
import styles from '../style/img.module.scss';
export const minIndex = (arr: number[]) => {
	let min = 0;
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] < arr[min]) {
			min = i;
		}
	}
	return min;
};
export const NormalImg: ImageComponent<NormalImage> = (props: {
	src: string;
	data: NormalImage;
	util: GalleryOperator;
	inSelect?: number;
	setInSelect?: any;
}) => {
	const [stared, setStared] = useState(props.data.stared);
	const [, setVis] = useController(renameVisibleStore);
	const flag = useRef({ id: null as any, isDown: false, holding: false });
	const up = useCallback(
		(e: any) => {
			flag.current.isDown = false;
			clearTimeout(flag.current.id);
			if (!flag.current.holding && !props.inSelect && e.button === 0) {
				window.location.href =
					'#/gallery/pack/' + props.data.id + '?page=1';
			}
		},
		[props.data.id, props.inSelect]
	);
	const down = useCallback(() => {
		if (props.util.getMode() === Mode.InDir) {
			return;
		}
		flag.current.isDown = true;
		flag.current.holding = false;
		flag.current.id = setTimeout(() => {
			if (flag.current.isDown && !props.inSelect) {
				props.setInSelect(1);
				flag.current.holding = true;
			}
		}, 700);
	}, [props]);
	const staredClick = useCallback(() => {
		props.data.stared = !stared;
		setStared((v) => !v);
		props.util.staredUpdate(props.data);
	}, [props.data, props.util, stared]);
	const removePack = useCallback(() => {
		props.util.removeFileFromDir(
			props.data.id,
			parseInt(/directory=(\d+)/.exec(window.location.hash)![1])
		);
		return;
	}, [props.data.id, props.util]);
	const selectHandler = useCallback(
		(e: any) => {
			props.util.selectionUpdate(props.data.id, e.target.checked);
		},
		[props.data.id, props.util]
	);
	return (
		<div className={styles.img}>
			<input
				className={styles['check-box'] + ' img__checkbox'}
				disabled={Boolean(props.data.parent) || !props.inSelect}
				id={props.data.id.toString()}
				onChange={selectHandler}
				style={{
					display: props.inSelect ? 'initial' : 'none'
				}}
				title={
					Boolean(props.data.parent) || !props.inSelect
						? props.util.searchParentName(props.data.parent)
						: undefined
				}
				type="checkbox"
			/>
			<div
				className={
					styles['img-wrapper'] +
					(props.inSelect ? ' ' + styles['in-select'] : '')
				}
				onMouseDown={down}
				onMouseUp={up}
			>
				<label htmlFor={props.data.id.toString()}>
					<img alt="" src={props.src}></img>
				</label>
			</div>
			<a
				className={styles['pack-title']}
				href={'#/gallery/pack/' + props.data.id + '?page=1'}
			>
				<span
					className={styles['pack-title-name']}
					title={props.data.title}
				>
					{props.data.title}
				</span>
			</a>
			<span className={styles['icon-span']}>
				<Star
					className={
						(stared ? styles['stared--true'] + ' ' : '') +
						styles['icon--stared']
					}
					onClick={() => {
						staredClick();
					}}
				/>
				<RenameIcon
					className={styles['icon--rename']}
					onClick={() => {
						if (dialogActive.active) {
							return;
						}
						dialogActive.setActive(true);
						setVis(true);
						props.util.packToBeRenamed = {
							id: props.data.id,
							oldTitle: props.data.title
						};
					}}
				/>
				{props.util.inDir || props.util.modeOfSearch === Mode.InDir ? (
					<Cross className={styles['cross']} onClick={removePack} />
				) : null}
			</span>
		</div>
	);
};
export default NormalImg;
