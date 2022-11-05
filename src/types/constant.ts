import { ImageBookmark } from './global';

/* eslint-disable no-unused-vars */
const fs = window.require('fs');
const allConfig = JSON.parse(
	fs.readFileSync(
		'D:\\webDemo\\desktop-reader\\src\\config\\config.json',
		'utf-8'
	)
);
const galleryConfig = allConfig.gallery;

export {
	imageCountOfSinglePage,
	packCountOfSinglePage,
	downloadPath,
	otherPath,
	galleryR18 as r18,
	domainOf24fa,
	proxyEnabled
};

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
	r18: galleryR18,
	proxyEnabled,
	proxy,
	domainOf24fa
} = galleryConfig;
export const defaultCover = 'D:\\webDemo\\desktop-reader\\public\\blank.jpg';
export const getBookmarkThumb = (bookmark: ImageBookmark) => {
	return `bookmark-thumb-${new Date(bookmark.timeStamp).getTime()}.jpg`;
};
export default galleryConfig;

// reader config
export const readerConfig = allConfig.reader;
export const lineHeight = 30;
export const {
	deltaLine,
	contentRange,
	overflowNum,
	distanceToUpdate,
	fontSize,
	r18: readerR18
} = readerConfig;
export const DELTA_HEIGHT = lineHeight * deltaLine;
export const CATALOG_REG =
	/[第卷][0123456789一二三四五六七八九十百千万亿零壹贰叁肆伍陆柒捌玖拾佰仟]+[章节回卷集部篇幕][^<]*/g;
export const SPACE_CODE = decodeURIComponent('%E3%80%80');
