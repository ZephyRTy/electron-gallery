import { BasicData, Bookmark } from '../types/global';

export function formatDate(
	time: string | number | Date,
	format = 'YY-MM-DD hh:mm:ss'
) {
	let date = new Date(time);

	let year = date.getFullYear(),
		month = date.getMonth() + 1, //月份是从0开始的
		day = date.getDate(),
		hour = date.getHours(),
		min = date.getMinutes(),
		sec = date.getSeconds();
	let preArr = Array.apply(null, Array(10)).map(function (elem, index) {
		return '0' + index;
	});

	let newTime = format
		.replace(/YY/g, year.toString())
		.replace(/MM/g, preArr[month] || month.toString())
		.replace(/DD/g, preArr[day] || day.toString())
		.replace(/hh/g, preArr[hour] || hour.toString())
		.replace(/mm/g, preArr[min] || min.toString())
		.replace(/ss/g, preArr[sec] || sec.toString());

	return newTime;
}
export const notMoreThanOne = (...arr: any[]) => {
	let count = 0;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i]) {
			count++;
		}
	}
	return count <= 1;
};

export const isBookmark = (data: Bookmark | BasicData): data is Bookmark => {
	return Boolean((data as Bookmark).url);
};
export const parseUrlQuery = (url: string) => {
	const query = decodeURIComponent(url.split('?')[1]);
	if (query) {
		const queryObj: any = {};
		const queryArr = query.split('&');
		queryArr.forEach((item) => {
			const [key, value] = item.split('=');
			queryObj[key] = value;
		});
		return queryObj;
	}
	return {};
};
