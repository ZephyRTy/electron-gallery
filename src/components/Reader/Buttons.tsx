import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useController, useData } from 'syill';
import { ReactComponent as AddBookmarkIcon } from '../../icon/addBookmark.svg';
import { ReactComponent as BackBtn } from '../../icon/back.svg';
import { ReactComponent as CatalogIcon } from '../../icon/catalog.svg';
import { ReactComponent as ExchangeIcon } from '../../icon/exchange.svg';
import { ReactComponent as FindIcon } from '../../icon/find.svg';
import { ReactComponent as GotoGalleryIcon } from '../../icon/images.svg';
import { ReactComponent as RegExpIcon } from '../../icon/regexp.svg';
import {
	catalogShowStore,
	changeWordStore,
	cursorStore,
	findStore,
	marksShowStore,
	RegInputVisibleStore
} from '../../utils/store';
import { TaskQueueBeforeQuit } from '../../utils/TaskQueue';
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
	const navigate = useNavigate();
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
				navigate(-1);
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
				'btn-show-marks detail-icon' +
				(marksShow ? ' activeMode' : ' not-active')
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
			className={
				'btn-catalog icon' +
				(catalogShow ? ' activeMode' : ' not-active')
			}
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

export const ChangeWordBtn = () => {
	const [dialogShow, setDialogShow] = useData(changeWordStore);
	const [, setMarksShow] = useController(marksShowStore);
	return (
		<button
			className={
				'btn-catalog icon' +
				(dialogShow ? ' activeMode' : ' not-active')
			}
			onClick={() => {
				setDialogShow((v) => !v);
				setMarksShow(false);
			}}
		>
			<ExchangeIcon />
		</button>
	);
};
