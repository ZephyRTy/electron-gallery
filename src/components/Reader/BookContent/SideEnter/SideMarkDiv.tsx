import { useContext, useEffect, useMemo } from 'react';
import { useData } from 'syill';
import { ReactComponent as AnchorIcon } from '../../../../icon/location.svg';
import { lineHeight } from '../../../../types/constant';
import { MarkAnchor } from '../../../../types/global';
import { stylesJoin } from '../../../../utils/functions/functions';
import { marksShowStore } from '../../../../utils/store';
import styles from '../../style/catalog.module.scss';
import { TextContext } from '../TextContent';
export const SideMarkDiv = () => {
	const book = useContext(TextContext);
	const selectionManager = book?.selectionManager;
	const [show, setShow] = useData(marksShowStore);
	const anchors = useMemo(() => {
		return selectionManager?.generateMarkAnchor() || [];
	}, [book, book?.getFontSize(), selectionManager?.getMarks().length, show]);

	useEffect(() => {
		return () => {
			setShow(false);
		};
	}, []);

	return (
		<div
			className={stylesJoin(
				styles['side-enter-box'],
				styles['side-enter'],
				styles['on-bottom']
			)}
		>
			<ul className={styles['side-list']}>
				{anchors.map((e, i) => {
					return <AnchorItem anchor={e} key={i} />;
				})}
			</ul>
		</div>
	);
};

const AnchorBtn = (props: { index: number }) => {
	return (
		<button
			className={stylesJoin(styles['side-anchor-btn'])}
			onClick={() => {
				document.querySelector('#reader-scroll-ele')!.scrollTop =
					props.index * lineHeight;
			}}
		>
			<AnchorIcon />
		</button>
	);
};
const AnchorItem = (props: { anchor: MarkAnchor }) => {
	return (
		<li
			className={stylesJoin(
				styles['side-anchor-item'],
				styles['side-list-item']
			)}
		>
			<div className={stylesJoin(styles['side-anchor-info-container'])}>
				<span
					className={stylesJoin(styles['side-anchor-content'])}
					onClick={() => {
						document.querySelector(
							'#reader-scroll-ele'
						)!.scrollTop = props.anchor.anchorIndex * lineHeight;
					}}
				>
					{props.anchor.content}
				</span>
				<div className={stylesJoin(styles['side-anchor-info'])}>
					<span>{'#' + props.anchor.anchorIndex}</span>
					<span>{props.anchor.timestamp}</span>
				</div>
			</div>
			<AnchorBtn index={props.anchor.anchorIndex} />
		</li>
	);
};
