/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-undef
import { useEffect, useMemo } from 'react';
import { Store, useData } from 'syill';
import { dispatch } from 'syill/lib/type';
import { lineHeight } from '../types/constant';
import { Chapter } from '../types/global';
import {
	changedAlertStore,
	changeWordStore,
	clearConfirmStore,
	commentVisStore,
	configVisibleStore,
	dirMapVisibleStore,
	epubCommentVisStore,
	RegInputVisibleStore,
	renameVisibleStore
} from '../utils/store';
import { ChangedAlertContent } from './DialogContent/ChangedAlertContent';
import { ChangeWordContent } from './DialogContent/ChangeWordContent';
import { ClearConfirmContent } from './DialogContent/ClearConfirmContent';
import { CommentContent } from './DialogContent/CommentContent';
import { configContent } from './DialogContent/ConfigContent';
import { DirMapContent } from './DialogContent/DirMapContent';
import { EpubCommentContent } from './DialogContent/EpubCommentContent';
import { RegExpSetContent } from './DialogContent/RegExpSetContent';
import { RenameContent } from './DialogContent/RenameContent';
import styles from './style/dialog.module.scss';
export const fs = window.require('fs');
const dialogShowFlag = {
	flags: new Map<string, dispatch<boolean>>(),
	add(key: string, dispatch: dispatch<boolean>) {
		if (!this.flags.has(key)) {
			this.flags.set(key, dispatch);
		} else {
			throw new Error('key already exists');
		}
	},
	remove(key: string) {
		if (this.flags.has(key)) {
			this.flags.delete(key);
		} else {
			throw new Error('key not exists');
		}
	},
	hideOthers(key: string) {
		for (const [k, v] of this.flags) {
			if (k === key) {
				v(true);
			} else {
				v(false);
			}
		}
	}
};
function createDialog<T>(
	Component: (
		props: T & { setVisible: any; visible: boolean }
	) => JSX.Element,
	store: Store<boolean>,
	id: string
) {
	return (props: Omit<Omit<T, 'setVisible'>, 'visible'>) => {
		const [visible, setVisible] = useData(store);
		const storeId = useMemo(() => id, []);
		useEffect(() => {
			dialogShowFlag.add(storeId, setVisible);
			return () => {
				dialogShowFlag.remove(storeId);
			};
		}, []);
		useEffect(() => {
			if (visible) {
				dialogShowFlag.hideOthers(storeId);
			}
		}, [visible]);
		return (
			<div
				className={
					styles['dialog-cover'] +
					(visible ? '' : ' ' + styles['hidden'])
				}
			>
				<div className={styles['dialog']}>
					<Component
						{...(props as any)}
						setVisible={setVisible}
						visible={visible}
					/>
				</div>
			</div>
		);
	};
}

const CatalogItem = (props: { chapter: Chapter; current: boolean }) => {
	const item = useMemo(() => {
		return (
			<li
				className={
					styles['catalog-list-item'] +
					(props.current ? ' ' + styles['current-chapter'] : '')
				}
				onClick={() => {
					document.querySelector('#reader-scroll-ele')!.scrollTop =
						props.chapter.index * lineHeight;
				}}
				title={props.chapter.title}
			>
				<span>{props.chapter.title}</span>
			</li>
		);
	}, [props.chapter, props.current]);
	return <>{item}</>;
};
export const DirMap = createDialog(DirMapContent, dirMapVisibleStore, 'dirMap');
export const Rename = createDialog(RenameContent, renameVisibleStore, 'rename');
export const Config = createDialog(configContent, configVisibleStore, 'config');
export const RegExpSet = createDialog(
	RegExpSetContent,
	RegInputVisibleStore,
	'regSet'
);
export const ChangedAlert = createDialog(
	ChangedAlertContent,
	changedAlertStore,
	'changedAlert'
);

export const CommentDialog = createDialog(
	CommentContent,
	commentVisStore,
	'comment'
);

export const EpubCommentDialog = createDialog(
	EpubCommentContent,
	epubCommentVisStore,
	'epubComment'
);
export const ClearConfirmDialog = createDialog(
	ClearConfirmContent,
	clearConfirmStore,
	'clearConfirm'
);
export const ChangeWordDialog = createDialog(
	ChangeWordContent,
	changeWordStore,
	'changeWord'
);
