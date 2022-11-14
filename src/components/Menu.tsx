/* eslint-disable camelcase */
import { ReactChild, useEffect, useMemo, useState } from 'react';
import { Mode } from '../types/global';
import { parseUrlQuery } from '../utils/functions/functions';
import {
	BookmarkBtn,
	HistoryBtn,
	HomePage,
	ShowDir,
	Stared
} from './Gallery/Buttons';

export const Sidebar = (props: {
	children: ReactChild[] | ReactChild;
	menuPosition: 'top' | 'bottom' | 'middle';
}) => {
	const pos = useMemo(
		() => ({
			'top': 'top',
			'bottom': 'bottom',
			// 'left': 'left',
			// 'right': 'right',
			'middle': 'middle'
		}),
		[]
	);
	return (
		<ul className={pos[props.menuPosition] + '-menu'}>
			{Array.isArray(props.children) ? (
				props.children.map((child, index) => {
					return <li key={index}>{child}</li>;
				})
			) : (
				<li>{props.children}</li>
			)}
		</ul>
	);
};
export const SidebarContainer = (props: {
	children: ReactChild[] | ReactChild;
}) => {
	return <div className="sidebar-container">{props.children}</div>;
};
export const TopMenu = (props: { children: ReactChild[] }) => {
	return (
		<ul className="top-menu">
			{props.children.map((child, index) => {
				return <li key={index}>{child}</li>;
			})}
		</ul>
	);
};

export const Menu = (props: { type: 'reader' | 'gallery' }) => {
	const [mode, setMode] = useState(Mode.Normal);
	useEffect(() => {
		let { directory, stared, bookmark, show_dir, search } = parseUrlQuery(
			window.location.href
		);
		if (directory) {
			setMode(Mode.DirContent);
		} else if (stared) {
			setMode(Mode.Stared);
		} else if (bookmark) {
			setMode(Mode.Bookmark);
		} else if (show_dir) {
			setMode(Mode.ShowDirs);
		} else if (search) {
		} else {
			setMode(Mode.Normal);
		}
	}, [window.location.href]);
	return (
		<Sidebar menuPosition="middle">
			<HomePage
				activeMode={Mode.Normal}
				currentMode={mode}
				type={props.type}
			/>
			<Stared
				activeMode={Mode.Stared}
				currentMode={mode}
				type={props.type}
			/>
			<>
				{props.type === 'gallery' ? (
					<BookmarkBtn
						activeMode={Mode.Bookmark}
						currentMode={mode}
						type={props.type}
					/>
				) : (
					<HistoryBtn
						activeMode={Mode.Bookmark}
						currentMode={mode}
						type={props.type}
					/>
				)}
			</>
			<ShowDir
				activeMode={Mode.ShowDirs}
				currentMode={mode}
				type={props.type}
			/>
		</Sidebar>
	);
};
