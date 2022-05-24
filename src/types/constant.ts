const fs = window.require('fs');
const {
	imageCountOfSinglePage,
	packCountOfSinglePage,
	downloadPath,
	otherPath
} = JSON.parse(
	fs.readFileSync(
		'D:\\webDemo\\desktop-reader\\src\\config\\config.json',
		'utf-8'
	)
);
export const defaultCover = 'D:\\webDemo\\desktop-reader\\public\\blank.jpg';
export {
	imageCountOfSinglePage,
	packCountOfSinglePage,
	downloadPath,
	otherPath
};
