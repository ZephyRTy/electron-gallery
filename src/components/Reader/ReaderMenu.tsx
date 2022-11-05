import { useRef } from 'react';
import { Toast } from '../Gallery/Toast';
import { Sidebar } from '../Menu';
import { Back, RegExpBtn } from './Buttons';

export const ReaderMenu = () => {
	const bookmarkToast = useRef((arg: boolean) => {});
	return (
		<Sidebar menuPosition="middle">
			<Back />
			<RegExpBtn />

			<Toast handler={bookmarkToast} message="更改封面成功！" />
		</Sidebar>
	);
};
