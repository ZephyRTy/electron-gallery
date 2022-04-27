import { useCallback, useRef, useState } from 'react';
import { ReactComponent as Cross } from '../../../icon/cross.svg';
import { ReactComponent as Star } from '../../../icon/star.svg';
import { BasicData, ImageComponent } from '../../../types/global';
import { FileOperator } from '../../../utils/fileOperator';
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
export const NormalImg: ImageComponent<BasicData> = (props: {
	src: string;
	data: BasicData;
	util: FileOperator;
	inSelect?: boolean;
	setInSelect?: any;
}) => {
	const [stared, setStared] = useState(props.data.stared);
	const flag = useRef({ id: null as any, isDown: false, holding: false });
	const up = useCallback(() => {
		flag.current.isDown = false;
		clearTimeout(flag.current.id);
		if (!flag.current.holding && !props.inSelect) {
			window.location.href =
				'#/gallery/pack/' + props.data.title + '?page=1';
		}
	}, [props.data.title, props.inSelect]);
	const down = useCallback(() => {
		flag.current.isDown = true;
		flag.current.holding = false;
		flag.current.id = setTimeout(() => {
			if (flag.current.isDown && !props.inSelect) {
				props.setInSelect(true);
				flag.current.holding = true;
			}
		}, 700);
	}, [props]);
	const clickHandler = useCallback(() => {
		props.data.stared = !stared;
		setStared((v) => !v);
		props.util.staredUpdate(props.data);
	}, [props.data, props.util, stared]);
	const removePack = useCallback(() => {
		props.util.removeFileFromDir(
			props.data.index,
			parseInt(/directory=(\d+)/.exec(window.location.hash)![1])
		);
		props.util.refresh();
		return;
	}, [props.data.index, props.util]);
	return (
		<div className={styles.img}>
			<input
				type="checkbox"
				className={styles['check-box']}
				disabled={props.data.status % 2 === 1}
				style={{
					display: props.inSelect ? 'initial' : 'none'
				}}
				onChange={(e) => {
					props.util.selectionUpdate(
						props.data.index,
						e.target.checked
					);
				}}
			/>
			<div
				className={
					styles['img-wrapper'] +
					(props.inSelect ? ' ' + styles['in-select'] : '')
				}
				onMouseDown={down}
				onMouseUp={up}
			>
				<img alt="" src={props.src}></img>
			</div>
			<a
				href={'#/gallery/pack/' + props.data.title + '?page=1'}
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
				{window.location.href.includes('directory=') ? (
					<Cross className={styles['cross']} onClick={removePack} />
				) : null}
			</span>
		</div>
	);
};
