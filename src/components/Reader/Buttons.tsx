import { MutableRefObject, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useController } from 'syill';
import { ReactComponent as AddBookmarkIcon } from '../../icon/addBookmark.svg';
import { ReactComponent as BackBtn } from '../../icon/back.svg';
import { ReactComponent as FindIcon } from '../../icon/find.svg';
import { ReactComponent as GotoGalleryIcon } from '../../icon/images.svg';
import { ReactComponent as RegExpIcon } from '../../icon/regexp.svg';
import { BookDetail } from '../../utils/BookDetail';
import { formatDate, parseUrlQuery } from '../../utils/functions';
import { readerOperator } from '../../utils/galleryOperator';
import { catalogVisibleStore, cursorStore, findStore } from '../../utils/store';
export const RegExpBtn = () => {
	const [, setVis] = useController(catalogVisibleStore);
	return (
		<button
			className={'btn-catalog icon'}
			onClick={() => {
				setVis(true);
			}}
		>
			<RegExpIcon />
		</button>
	);
};
export const GotoGalleryBtn = () => {
	return (
		<button
			className={'btn-goto-gallery icon goto-btn'}
			onClick={() => {
				window.location.href = '#/gallery';
			}}
		>
			<GotoGalleryIcon />
		</button>
	);
};
export const Back = () => {
	const navigate = useNavigate();
	const addBookmark = useCallback(() => {
		const ele = document.querySelector('#reader-scroll-ele');
		let urlObj = parseUrlQuery(window.location.href);
		delete urlObj['undefined'];
		urlObj['scroll'] = ele!.scrollTop;
		const id = readerOperator.packWillOpen()!.id;
		let url =
			`#/reader/book/${id}?` + new URLSearchParams(urlObj).toString();
		readerOperator.UpdateBookmark({
			...readerOperator.packWillOpen()!,
			url,
			timeStamp: formatDate(new Date())
		});
	}, []);
	return (
		<button
			className="btn-back icon"
			onClick={() => {
				addBookmark();
				navigate(-1);
			}}
		>
			<BackBtn />
		</button>
	);
};

export const MarkBtn = (props: {
	// eslint-disable-next-line no-unused-vars
	bookmarkToast: MutableRefObject<(arg: boolean) => void>;
	book: BookDetail;
}) => {
	return (
		<button
			className="add-bookmark detail-icon"
			onClick={() => {
				props.book.mark();
				// props.bookmarkToast.current(true);
				// (e.target as HTMLButtonElement).disabled = true;
				// setTimeout(() => {
				// 	(e.target as HTMLButtonElement).disabled = false;
				// 	props.bookmarkToast.current(false);
				// }, 1000);
			}}
		>
			<AddBookmarkIcon />
		</button>
	);
};

export const Find = () => {
	const [, setVis] = useController(findStore);
	const [, setCursorStore] = useController(cursorStore);
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey) {
				if (e.key === 'f') {
					setVis((v) => !v);
					setCursorStore([]);
				}
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);
	return (
		<button
			className={'btn-find icon'}
			onClick={() => {
				setVis((v) => !v);
				setCursorStore([]);
			}}
		>
			<FindIcon />
		</button>
	);
};
