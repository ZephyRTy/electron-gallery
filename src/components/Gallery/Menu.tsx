/* eslint-disable camelcase */
import { ReactChild, useEffect, useState } from 'react';
import { Mode } from '../../types/global';
import { parseUrlQuery } from '../../utils/functions';
import {
	BookmarkBtn,
	GotoGalleryBtn,
	HomePage,
	ShowDir,
	Stared
} from './Buttons';

export const Sidebar = (props: {
	children: ReactChild[] | ReactChild;
	className: string;
}) => {
	return (
		<ul className={props.className}>
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

export const Menu = () => {
	const [mode, setMode] = useState(Mode.Normal);
	useEffect(() => {
		let { directory, stared, bookmark, show_dir, search } = parseUrlQuery(
			window.location.href
		);
		if (directory) {
			setMode(Mode.InDir);
		} else if (stared) {
			setMode(Mode.Stared);
		} else if (bookmark) {
			setMode(Mode.Bookmark);
		} else if (show_dir) {
			setMode(Mode.ShowDir);
		} else if (search) {
		} else {
			setMode(Mode.Normal);
		}
	}, [window.location.href]);
	return (
		<Sidebar className="menu">
			<HomePage activeMode={Mode.Normal} currentMode={mode} />
			<Stared activeMode={Mode.Stared} currentMode={mode} />
			<BookmarkBtn activeMode={Mode.Bookmark} currentMode={mode} />
			<ShowDir activeMode={Mode.ShowDir} currentMode={mode} />
		</Sidebar>
	);
};

export const ReaderMenu = () => {
	return (
		<Sidebar className="menu">
			<GotoGalleryBtn />
		</Sidebar>
	);
};
