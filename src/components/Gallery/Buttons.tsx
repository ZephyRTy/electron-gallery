/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useController } from 'syill';
import { getImgFrom24fa } from '../../crawler/fa24';
import { ReactComponent as AddIcon } from '../../icon/add.svg';
import { ReactComponent as BackBtn } from '../../icon/back.svg';
import { ReactComponent as BookmarkIcon } from '../../icon/bookmark.svg';
import { ReactComponent as Crawler } from '../../icon/crawler.svg';
import { ReactComponent as ShowDirs } from '../../icon/directory.svg';
import { ReactComponent as HomePageIcon } from '../../icon/homepage.svg';
import { ReactComponent as RefreshIcon } from '../../icon/refresh.svg';
import { ReactComponent as RenameIcon } from '../../icon/rename.svg';
import { ReactComponent as SelectPacksIcon } from '../../icon/select.svg';
import { ReactComponent as StaredIcon } from '../../icon/stared.svg';
import { FileOperator } from '../../utils/fileOperator';
import { visibleStore } from '../../utils/store';
export const HomePage = () => {
	return (
		<button
			className="btn-homepage icon"
			onClick={() => {
				window.location.href = '#/gallery';
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

export const Stared = () => {
	return (
		<button
			className="btn-stared icon"
			onClick={() => {
				window.location.href = '#/gallery?stared=true&page=1';
			}}
		>
			<StaredIcon />
		</button>
	);
};

export const Add = (props: { util: FileOperator }) => {
	const [visible, setVisible] = useController(visibleStore);
	// useLayoutEffect(() => {
	// 	(fileInput.current as any).setAttribute('webkitdirectory', '');
	// 	(fileInput.current as any).setAttribute('directory', '');
	// }, []);
	return (
		<>
			{/* <input
				id="file-input"
				type={'file'}
				onChange={(e) => {
					let path = (e.target as any).files[0].path
						?.split('\\')
						.slice(0, -1)
						.join('\\');
					let cover = (e.target as any).files[0].name;
					let title = path.split('\\').pop();
					props.util.addNewPack({ path, cover, title });
				}}
				ref={fileInput}
			/> */}
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

export const BookmarkBtn = () => {
	return (
		<button
			className="btn-bookmark icon"
			onClick={() => {
				window.location.href = '#/gallery?bookmark=true&page=1';
			}}
		>
			<BookmarkIcon />
		</button>
	);
};
export const Refresh = (props: { util: FileOperator }) => {
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
			style={{ display: props.inSelect ? 'initial' : 'none' }}
			onClick={props.handleClick}
		>
			<SelectPacksIcon />
		</button>
	);
};

export const ShowDir = (props: {}) => {
	return (
		<button
			className="btn-showDir icon"
			onClick={() => {
				window.location.href = '#/gallery?show_dir=true&page=1';
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
			style={{ display: props.inRename ? 'initial' : 'none' }}
			onClick={props.handleClick}
		>
			<RenameIcon />
		</button>
	);
};

export const CrawlerBtn = (props: {}) => {
	const [active, setActive] = useState(false);
	const [err, setErr] = useState(false);
	return (
		<button
			className={'btn-crawler icon'}
			onClick={() => {
				setActive(true);
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
