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

// reader config
export const LINE_HEIGHT = 30;
export const DELTA_LINE = 70;
export const DELTA_HEIGHT = LINE_HEIGHT * DELTA_LINE;
export const CONTENT_RANGE = 200;
export const OVERFLOW_NUM = 20;
export const DISTANCE_2_UPDATE = 1800;
export const CATALOG_REG =
	/[第卷][0123456789一二三四五六七八九十百千万亿零壹贰叁肆伍陆柒捌玖拾佰仟]+[章节回卷集部篇幕][^<]*/g;
export const SPACE_CODE = decodeURIComponent('%E3%80%80');
