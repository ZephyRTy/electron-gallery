import { deltaLine, fontSize, galleryConfig } from './config';
import { ImageBookmark } from './global';

/* eslint-disable no-unused-vars */
const fs = window.require('fs');
const path = window.require('path');
const crypto = window.require('crypto');
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();
export const lineHeight = 30;
export const generateMagicCode = (code: string): string => {
	const hash = crypto.createHash('sha256');
	return hash.update(code).digest('hex');
};

export const magicCode = generateMagicCode('yty7895123');
const verifyCode = (code: string) => {
	if (generateMagicCode(code) === magicCode) {
		window.localStorage.setItem('magicCode', magicCode);
		location.reload();
	}
};
(window as any).verifyCode = verifyCode;
export const translatePath = path.resolve(
	__dirname,
	'./appConfig/translation.json'
);
export {
	imageCountOfSinglePage,
	packCountOfSinglePage,
	downloadPath,
	otherPath,
	galleryR18 as r18,
	domainOf24fa,
	proxyEnabled
};

export const translation = JSON.parse(fs.readFileSync(translatePath, 'utf-8'));
const {
	imageCountOfSinglePage,
	packCountOfSinglePage,
	downloadPath,
	otherPath,
	r18: galleryR18,
	proxyEnabled,
	proxy,
	domainOf24fa,
	maxRetryCount
} = galleryConfig;
export default galleryConfig;
export const defaultCover = 'D:\\webDemo\\desktop-reader\\public\\blank.jpg';
export const getBookmarkThumb = (bookmark: ImageBookmark) => {
	return `bookmark-thumb-${new Date(bookmark.timeStamp).getTime()}.jpg`;
};

export const DELTA_HEIGHT = lineHeight * (deltaLine as number);
export const CATALOG_REG =
	/[第卷][0123456789一二三四五六七八九十百千万亿零壹贰叁肆伍陆柒捌玖拾佰仟]+[章节回卷集部篇幕][^<]*/g;
export const SPACE_CODE = decodeURIComponent('%E3%80%80');
export const typeSetting = new (class TypeSetting {
	width = 900;
	fontSize = fontSize as number;
	get lettersOfEachLine() {
		return Math.floor(this.width / this.fontSize) - 4;
	}
})();

export const lettersOfEachLine = () => typeSetting.lettersOfEachLine;
