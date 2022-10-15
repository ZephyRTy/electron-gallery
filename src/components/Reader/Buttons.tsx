import { MutableRefObject } from 'react';
import { useNavigate } from 'react-router';
import { useController } from 'syill';
import { ReactComponent as AddBookmarkIcon } from '../../icon/addBookmark.svg';
import { ReactComponent as BackBtn } from '../../icon/back.svg';
import { ReactComponent as CatalogIcon } from '../../icon/catalog.svg';
import { ReactComponent as GotoGalleryIcon } from '../../icon/images.svg';
import { formatDate, parseUrlQuery } from '../../utils/functions';
import { readerOperator } from '../../utils/galleryOperator';
import { catalogVisibleStore } from '../../utils/store';
export const CatalogBtn = () => {
	const [, setVis] = useController(catalogVisibleStore);
	return (
		<button
			className={'btn-catalog icon'}
			onClick={() => {
				setVis(true);
			}}
		>
			<CatalogIcon />
		</button>
	);
};
export const GotoGalleryBtn = () => {
	return (
		<button
			className={'btn-goto-gallery icon'}
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
	return (
		<button
			className="btn-back icon"
			onClick={() => {
				navigate(-1);
			}}
		>
			<BackBtn />
		</button>
	);
};

export const AddBookmark = (props: {
	// eslint-disable-next-line no-unused-vars
	bookmarkToast: MutableRefObject<(arg: boolean) => void>;
}) => {
	return (
		<button
			className="add-bookmark detail-icon"
			onClick={(e) => {
				const ele = document.querySelector('#reader-scroll-ele');
				let urlObj = parseUrlQuery(window.location.href);
				delete urlObj['undefined'];
				urlObj['scroll'] = ele!.scrollTop;
				let url =
					`#/reader/book/${readerOperator.current()!.id}?` +
					new URLSearchParams(urlObj).toString();
				readerOperator.bookmarksUpdate({
					...readerOperator.current()!,
					url,
					timeStamp: formatDate(new Date())
				});
				props.bookmarkToast.current(true);
				(e.target as HTMLButtonElement).disabled = true;
				setTimeout(() => {
					(e.target as HTMLButtonElement).disabled = false;
					props.bookmarkToast.current(false);
				}, 1000);
			}}
		>
			<AddBookmarkIcon />
		</button>
	);
};
