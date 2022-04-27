import { ReactChild } from 'react';

export const Menu = (props: { children: ReactChild[] }) => {
	return (
		<ul className="menu">
			{props.children.map((child, index) => {
				return <li key={index}>{child}</li>;
			})}
		</ul>
	);
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
