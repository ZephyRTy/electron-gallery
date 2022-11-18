import { Rendition } from 'epubjs';
import { useContext, useEffect, useState } from 'react';
import { useData } from 'syill';
import { enable3d } from '../../../types/constant';
import { EpubMark } from '../../../types/global';
import { stylesJoin } from '../../../utils/functions/functions';
import { marksShowStore } from '../../../utils/store';
import styles from '../style/catalog.module.scss';
import { EpubContext } from './EpubContent';

const MarkItem = (props: { mark: EpubMark }) => {
	const book = useContext(EpubContext);
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
						book?.jumpTo(props.mark.cfi);
					}}
				>
					{props.mark.data}
				</span>
				<div className={stylesJoin(styles['side-anchor-info'])}>
					<span>{props.mark.timestamp}</span>
				</div>
			</div>
		</li>
	);
};
export const EpubSideMarkDiv = (props: { rendition: Rendition | null }) => {
	const book = useContext(EpubContext);
	const [, setShow] = useData(marksShowStore);
	const [items, setItems] = useState([] as EpubMark[]);
	useEffect(() => {
		if (!props.rendition || !book) {
			return;
		}
		book.initMarks(setItems).then((marks) => {
			setItems([...marks]);
			book.highlightAllMarks();
		});
		return () => {
			setShow(false);
		};
	}, [book, props.rendition]);
	return (
		<div
			className={stylesJoin(
				styles['side-enter-box'],
				styles['side-enter'],
				enable3d ? styles['on-bottom'] : ''
			)}
		>
			<ul className={styles['side-list']}>
				{items.map((e, i) => {
					return <MarkItem key={i} mark={e} />;
				})}
			</ul>
		</div>
	);
};
