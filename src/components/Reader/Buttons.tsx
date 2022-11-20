import { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useController, useData } from 'syill';
import { ReactComponent as AddBookmarkIcon } from '../../icon/addBookmark.svg';
import { ReactComponent as BackBtn } from '../../icon/back.svg';
import { ReactComponent as CatalogIcon } from '../../icon/catalog.svg';
import { ReactComponent as FindIcon } from '../../icon/find.svg';
import { ReactComponent as GotoGalleryIcon } from '../../icon/images.svg';
import { ReactComponent as NextEpisodeIcon } from '../../icon/next.svg';
import { ReactComponent as PrevEpisodeIcon } from '../../icon/prev.svg';
import { ReactComponent as RegExpIcon } from '../../icon/regexp.svg';
import { readerOperator } from '../../utils/data/galleryOperator';
import { parseUrlQuery } from '../../utils/functions/functions';
import {
	catalogShowStore,
	cursorStore,
	findStore,
	marksShowStore,
	RegInputVisibleStore
} from '../../utils/store';
import { TaskQueueBeforeQuit } from '../../utils/TaskQueue';
import { TextContext } from './BookContent/TextContent';
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
export const Back = (props: { quitBehavior?: () => Promise<any> }) => {
	const navigator = useNavigate();
	const book = useContext(TextContext);
	useEffect(() => {
		if (!props.quitBehavior) return;
		TaskQueueBeforeQuit.add(() => {
			return props.quitBehavior!();
		}, 'addBookmark');
		return () => {
			if (!props.quitBehavior) return;
			TaskQueueBeforeQuit.remove('addBookmark');
		};
	}, [props.quitBehavior]);
	return (
		<button
			className="btn-back icon"
			onClick={async () => {
				if (props.quitBehavior) {
					await props.quitBehavior();
				}
				if (book.getMaxEpisode() === 1) {
					navigator(-1);
				} else {
					window.location.href = readerOperator.loadPrevPage();
				}
			}}
		>
			<BackBtn />
		</button>
	);
};
// eslint-disable-next-line no-unused-vars
export const ShowMarksBtn = () => {
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

export const FindInEpub = () => {
	const [, setVis] = useController(findStore);
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey) {
				if (e.key === 'f') {
					setVis((v) => !v);
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
			}}
		>
			<FindIcon />
		</button>
	);
};

export const PrevEpisodesBtn = () => {
	let [searchParams] = useSearchParams();
	let currentEpisode = Number(searchParams.get('episode') || '1');
	const book = useContext(TextContext);
	return (
		<button
			className={'btn-find icon episode-btn'}
			disabled={currentEpisode === 1}
			onClick={() => {
				const urlObj = parseUrlQuery(window.location.href);
				urlObj.scroll = 0;
				urlObj.episode = currentEpisode - 1;
				window.location.href = `#/reader/book/${
					book.id
				}?${new URLSearchParams(urlObj).toString()}`;
			}}
		>
			<PrevEpisodeIcon />
		</button>
	);
};
export const NextEpisodesBtn = () => {
	let [searchParams] = useSearchParams();
	const book = useContext(TextContext);
	let currentEpisode = Number(searchParams.get('episode') || '1');
	return (
		<button
			className={'btn-find icon episode-btn'}
			disabled={book ? currentEpisode === book.getMaxEpisode() : true}
			onClick={() => {
				const urlObj = parseUrlQuery(window.location.href);
				urlObj.scroll = 0;
				urlObj.episode = currentEpisode + 1;
				window.location.href = `#/reader/book/${
					book.id
				}?${new URLSearchParams(urlObj).toString()}`;
			}}
		>
			<NextEpisodeIcon />
		</button>
	);
};
