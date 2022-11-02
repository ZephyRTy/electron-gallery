/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useController } from 'syill';
import { getImgFrom24fa } from '../../crawler/fa24';
import { ReactComponent as AddIcon } from '../../icon/add.svg';
import { ReactComponent as BackBtn } from '../../icon/back.svg';
import { ReactComponent as BookmarkIcon } from '../../icon/bookmark.svg';
import { ReactComponent as GotoReaderIcon } from '../../icon/books.svg';
import { ReactComponent as Crawler } from '../../icon/crawler.svg';
import { ReactComponent as ShowDirs } from '../../icon/directory.svg';
import { ReactComponent as OpenInExplorerIcon } from '../../icon/folder-open.svg';
import { ReactComponent as HomePageIcon } from '../../icon/homepage.svg';
import { ReactComponent as RefreshIcon } from '../../icon/refresh.svg';
import { ReactComponent as RenameIcon } from '../../icon/rename.svg';
import { ReactComponent as SelectPacksIcon } from '../../icon/select.svg';
import { ReactComponent as SettingIcon } from '../../icon/setting.svg';
import { ReactComponent as StaredIcon } from '../../icon/stared.svg';
import { ReactComponent as TrashIcon } from '../../icon/trash.svg';
import galleryConfig from '../../types/constant';
import {
	BasicBookmark,
	BasicData,
	BasicFolder,
	Mode
} from '../../types/global';
import { FileOperator } from '../../utils/fileOperator';
import { configVisibleStore, fileDropVisibleStore } from '../../utils/store';
export const HomePage = (props: {
	activeMode: Mode;
	currentMode: Mode;
	type: 'reader' | 'gallery';
}) => {
	return (
		<button
			className={
				'btn-homepage icon' +
				(props.activeMode === props.currentMode ? ' activeMode' : '')
			}
			onClick={() => {
				window.location.href = '#/' + props.type + '';
			}}
		>
			<HomePageIcon />
		</button>
	);
};

export const Back = (props: {
	inSelect: number;
	setInSelect: (v: number) => void;
}) => {
	const navigate = useNavigate();
	return (
		<button
			className="btn-back icon"
			onClick={() => {
				if (props.inSelect) {
					props.setInSelect(0);
					return;
				}
				navigate(-1);
			}}
		>
			<BackBtn />
		</button>
	);
};

export const Stared = (props: {
	activeMode: Mode;
	currentMode: Mode;
	type: 'reader' | 'gallery';
}) => {
	return (
		<button
			className={
				'btn-stared icon' +
				(props.activeMode === props.currentMode ? ' activeMode' : '')
			}
			onClick={() => {
				window.location.href =
					'#/' + props.type + '?stared=true&page=1';
			}}
		>
			<StaredIcon />
		</button>
	);
};

export const Add = <
	A extends BasicData,
	B extends BasicBookmark,
	C extends BasicFolder
>(props: {
	util: FileOperator<A, B, C>;
}) => {
	const [visible, setVisible] = useController(fileDropVisibleStore);
	return (
		<>
			<button
				className="btn-add icon"
				onClick={() => {
					setVisible((v) => !v);
				}}
			>
				<AddIcon />
			</button>
		</>
	);
};

export const BookmarkBtn = (props: {
	activeMode: Mode;
	currentMode: Mode;
	type: 'reader' | 'gallery';
}) => {
	return (
		<button
			className={
				'btn-bookmark icon' +
				(props.activeMode === props.currentMode ? ' activeMode' : '')
			}
			onClick={() => {
				window.location.href =
					'#/' + props.type + '?bookmark=true&page=1';
			}}
		>
			<BookmarkIcon />
		</button>
	);
};
export const Refresh = <
	A extends BasicData,
	B extends BasicBookmark,
	C extends BasicFolder
>(props: {
	util: FileOperator<A, B, C>;
}) => {
	return (
		<button
			className="btn-refresh icon"
			onClick={() => {
				props.util.refresh();
			}}
		>
			<RefreshIcon />
		</button>
	);
};

export const SelectPacks = (props: {
	inSelect: number;
	handleClick: () => void;
}) => {
	return (
		<button
			className="btn-newDir icon"
			onClick={props.handleClick}
			style={{ display: props.inSelect ? 'initial' : 'none' }}
		>
			<SelectPacksIcon />
		</button>
	);
};

export const ShowDir = (props: {
	activeMode: Mode;
	currentMode: Mode;
	type: 'reader' | 'gallery';
}) => {
	return (
		<button
			className={
				'btn-showDir icon' +
				(props.activeMode === props.currentMode ? ' activeMode' : '')
			}
			onClick={() => {
				window.location.href =
					'#/' + props.type + '?show_dir=true&page=1';
			}}
		>
			<ShowDirs />
		</button>
	);
};

export const RenameBtn = (props: {
	handleClick: () => void;
	inRename: boolean;
}) => {
	return (
		<button
			className="btn-rename icon"
			disabled={!galleryConfig.r18}
			onClick={props.handleClick}
			style={{ display: props.inRename ? 'initial' : 'none' }}
		>
			<RenameIcon />
		</button>
	);
};

export const CrawlerBtn = (props: {}) => {
	const [active, setActive] = useState(false);
	const [err, setErr] = useState(false);
	useEffect(() => {
		if (active) {
			getImgFrom24fa()
				.then((res) => {
					setActive(false);
					setErr(false);
				})
				.catch((err) => {
					setActive(false);
					setErr(true);
					setTimeout(() => {
						setErr(false);
					}, 3000);
				});
		}
	}, [active]);
	return (
		<button
			className={'btn-crawler icon'}
			disabled={!galleryConfig.r18}
			onClick={() => {
				if (active) {
					return;
				}
				setActive(true);
			}}
		>
			<Crawler
				className={`${active ? 'crawler--active' : ''} ${
					err ? 'crawler--error' : ''
				}`}
			/>
		</button>
	);
};

export const ConfigBtn = () => {
	const [visible, setVisible] = useController(configVisibleStore);
	return (
		<button
			className={'btn-setting icon'}
			onClick={(e) => {
				setVisible(true);
			}}
		>
			<SettingIcon fill="black" />
		</button>
	);
};

export const OpenInExplorerBtn = (props: { handleClick: () => void }) => {
	return (
		<button
			className={'btn-open-folder icon'}
			onClick={() => {
				props.handleClick();
			}}
		>
			<OpenInExplorerIcon />
		</button>
	);
};

export const GotoReaderBtn = () => {
	return (
		<button
			className={'btn-goto-reader icon goto-btn'}
			onClick={() => {
				window.location.href = '#/reader';
			}}
		>
			<GotoReaderIcon />
		</button>
	);
};

export const TrashBtn = () => {
	return (
		<button className={'btn-trash icon'} onClick={() => {}}>
			<TrashIcon />
		</button>
	);
};
