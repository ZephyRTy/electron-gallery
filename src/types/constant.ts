const fs = window.require('fs');
const globalConfig = JSON.parse(
	fs.readFileSync(
		'D:\\webDemo\\desktop-reader\\src\\config\\config.json',
		'utf-8'
	)
);
const {
	imageCountOfSinglePage,
	packCountOfSinglePage,
	downloadPath,
	otherPath,
	r18,
	proxy
} = globalConfig;
export const defaultCover = 'D:\\webDemo\\desktop-reader\\public\\blank.jpg';
export {
	imageCountOfSinglePage,
	packCountOfSinglePage,
	downloadPath,
	otherPath,
	r18,
	proxy
};

export default globalConfig;
