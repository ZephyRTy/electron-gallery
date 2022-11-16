import { NavItem, Rendition } from 'epubjs';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useData } from 'syill';
import { ReactComponent as MenuArrowIcon } from '../../../icon/menuArrow.svg';
import { stylesJoin } from '../../../utils/functions/functions';
import { catalogShowStore, marksShowStore } from '../../../utils/store';
import styles from '../style/catalog.module.scss';
import { EpubContext } from './EpubContent';
const Submenu = (props: {
	subitems: NavItem[];
	rendition: Rendition | null;
	show: boolean;
}) => {
	return (
		<ul
			className={stylesJoin(
				styles['submenu-contain'],
				props.show ? '' : styles['submenu-contain--hidden']
			)}
		>
			{props.subitems.map((e) => {
				return (
					<li
						className={stylesJoin(
							styles['side-list-item'],
							styles['side-list-subitem']
						)}
						key={e.id}
						onClick={() => {
							props.rendition?.display(e.href);
						}}
					>
						<span>{e.label.replaceAll('\n', '')}</span>
					</li>
				);
			})}
		</ul>
	);
};
export const EpubCatalogItem = (props: {
	current: boolean;
	item: NavItem;
	rendition: Rendition | null;
}) => {
	const [show, setShow] = useState(false);
	const item = useMemo(() => {
		return (
			<li
				className={stylesJoin(
					styles['side-list-item'],
					styles['catalog-list-item'],
					props.current ? styles['current-chapter'] : '',
					props.item.subitems?.length ? styles['has-subitem'] : ''
				)}
			>
				<div className={styles['parent-menu-info']}>
					<button
						className={stylesJoin(
							styles['show-submenu'],
							show ? styles['show-submenu--active'] : ''
						)}
						onClick={() => {
							setShow((v) => !v);
						}}
						style={{
							display: props.item.subitems?.length
								? 'block'
								: 'none'
						}}
					>
						<MenuArrowIcon />
					</button>
					<span
						onClick={() => {
							props.rendition?.display(props.item.href);
						}}
					>
						{props.item.label.replaceAll('\n', '')}
					</span>
				</div>
				{props.item.subitems && (
					<Submenu
						rendition={props.rendition}
						show={show}
						subitems={props.item.subitems}
					/>
				)}
			</li>
		);
	}, [props.current, show]);
	return <>{item}</>;
};
export const EpubSideCatalog = (props: { rendition: Rendition | null }) => {
	const book = useContext(EpubContext);
	const [catalog] = useState(book?.navigation?.toc || []);
	const [show, setShow] = useData(catalogShowStore);
	const [marksShow] = useData(marksShowStore);
	useEffect(() => {
		return () => {
			setShow(false);
		};
	}, []);
	return (
		<>
			<div
				className={stylesJoin(
					styles['side-enter-box'],
					show || marksShow ? '' : styles['hidden'],
					styles['side-enter']
				)}
			>
				<ul className={styles['side-list']}>
					{catalog.map((e) => {
						return (
							<EpubCatalogItem
								current={false}
								item={e}
								key={e.id}
								rendition={props.rendition}
							/>
						);
					})}
				</ul>
			</div>
		</>
	);
};
