import {
	BookmarkOfBook,
	ImageBookmark,
	ImageDirectory
} from '../../types/global';

export const isImageBookmark = (data: any): data is ImageBookmark => {
	return Boolean(data.url) && data.cover;
};
export const isBookmarkOfBook = (data: any): data is BookmarkOfBook => {
	return Boolean(data.url) && !data.cover;
};
export const isImageDir = (data: any): data is ImageDirectory => {
	return !data.url && !!data.timeStamp && !!data.cover;
};

export const isBookDir = (data: any): data is ImageDirectory => {
	return !data.url && !!data.timeStamp && !data.cover;
};
export const hasCover = (data: any): data is { cover: string } => {
	return data.cover !== undefined;
};
