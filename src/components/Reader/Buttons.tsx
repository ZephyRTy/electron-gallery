import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useController, useData } from 'syill';
import { ReactComponent as AddBookmarkIcon } from '../../icon/addBookmark.svg';
import { ReactComponent as BackBtn } from '../../icon/back.svg';
import { ReactComponent as CatalogIcon } from '../../icon/catalog.svg';
import { ReactComponent as FindIcon } from '../../icon/find.svg';
import { ReactComponent as GotoGalleryIcon } from '../../icon/images.svg';
import { ReactComponent as RegExpIcon } from '../../icon/regexp.svg';
import { BookDetail } from '../../utils/BookDetail';
import { formatDate, parseUrlQuery } from '../../utils/functions/functions';
import { readerOperator } from '../../utils/galleryOperator';
import {
	catalogShowStore,
	cursorStore,
	findStore,
	marksShowStore,
	RegInputVisibleStore
} from '../../utils/store';
export const RegExpBtn = () => {
	const [, setVis] = useController(RegInputVisibleStore);
	return (
		<button
			className={'btn-regexp icon'}
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
	const addBookmark = useCallback(async () => {
		const ele = document.querySelector('#reader-scroll-ele');
		let urlObj = parseUrlQuery(window.location.href);
		delete urlObj['undefined'];
		urlObj['scroll'] = ele!.scrollTop;
		const id = readerOperator.packWillOpen()!.id;
		let url =
			`#/reader/book/${id}?` + new URLSearchParams(urlObj).toString();
		await readerOperator.UpdateBookmark({
			...readerOperator.packWillOpen()!,
			url,
			timeStamp: formatDate(new Date())
		});
	}, []);
	return (
		<button
			className="btn-back icon"
			onClick={() => {
				addBookmark().then(() => {
					navigate(-1);
				});
			}}
		>
			<BackBtn />
		</button>
	);
};
// eslint-disable-next-line no-unused-vars
export const ShowMarksBtn = (props: { book: BookDetail }) => {
	const [marksShow, setMarksShow] = useData(marksShowStore);
	const [, setCatalogShow] = useController(catalogShowStore);
	return (
		<button
			className={
				'btn-show-marks detail-icon' + (marksShow ? ' activeMode' : '')
			}
			onClick={() => {
				setMarksShow((v) => !v);
				setCatalogShow(false);
			}}
		>
			<AddBookmarkIcon />
		</button>
	);
};

export const CatalogBtn = () => {
	const [catalogShow, setCatalogShow] = useData(catalogShowStore);
	const [, setMarksShow] = useController(marksShowStore);
	return (
		<button
			className={'btn-catalog icon' + (catalogShow ? ' activeMode' : '')}
			onClick={() => {
				setCatalogShow((v) => !v);
				setMarksShow(false);
			}}
		>
			<CatalogIcon />
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
