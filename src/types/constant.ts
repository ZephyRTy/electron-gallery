import { Bookmark } from './global';

/* eslint-disable no-unused-vars */
const fs = window.require('fs');
const globalConfig = JSON.parse(
	fs.readFileSync(
		'D:\\webDemo\\desktop-reader\\src\\config\\config.json',
		'utf-8'
	)
);
export const translation = JSON.parse(
	fs.readFileSync(
		'D:\\webDemo\\desktop-reader\\src\\config\\translation.json',
		'utf-8'
	)
);
const {
	imageCountOfSinglePage,
	packCountOfSinglePage,
	downloadPath,
	otherPath,
	r18,
	proxyEnabled,
	proxy,
	domainOf24fa
} = globalConfig;
export const defaultCover = 'D:\\webDemo\\desktop-reader\\public\\blank.jpg';
export {
	imageCountOfSinglePage,
	packCountOfSinglePage,
	downloadPath,
	otherPath,
	r18,
	domainOf24fa,
	proxyEnabled
};
export const getBookmarkThumb = (bookmark: Bookmark) => {
	return `bookmark-thumb-${new Date(bookmark.timeStamp).getTime()}.jpg`;
};
export default globalConfig;
