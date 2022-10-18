import { useRef } from 'react';
import { Toast } from '../Gallery/Toast';
import { Sidebar } from '../Menu';
import { AddBookmark, Back, CatalogBtn } from './Buttons';

export const ReaderMenu = () => {
	const bookmarkToast = useRef((arg: boolean) => {});
	return (
		<Sidebar menuPosition="middle">
			<Back />
			<CatalogBtn />
			<AddBookmark bookmarkToast={bookmarkToast} />
			<Toast handler={bookmarkToast} message="更改封面成功！" />
		</Sidebar>
	);
};
