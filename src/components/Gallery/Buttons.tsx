/* eslint-disable no-unused-vars */
import { useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ReactComponent as AddIcon } from '../../icon/add.svg';
import { ReactComponent as BackBtn } from '../../icon/back.svg';
import { ReactComponent as BookmarkIcon } from '../../icon/bookmark.svg';
import { ReactComponent as HomePageIcon } from '../../icon/homepage.svg';
import { ReactComponent as RefreshIcon } from '../../icon/refresh.svg';
import { ReactComponent as SelectPacksIcon } from '../../icon/select.svg';
import { ReactComponent as StaredIcon } from '../../icon/stared.svg';
import { FileOperator } from '../../utils/fileOperator';
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
	inSelect: boolean;
	setInSelect: (v: boolean) => void;
}) => {
	const navigate = useNavigate();
	return (
		<button
			className="btn-back icon"
			onClick={() => {
				if (props.inSelect) {
					props.setInSelect(false);
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
	const fileInput = useRef(null);
	useLayoutEffect(() => {
		(fileInput.current as any).setAttribute('webkitdirectory', '');
		(fileInput.current as any).setAttribute('directory', '');
	}, []);
	return (
		<>
			<input
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
			/>

			<button className="btn-add icon">
				<label htmlFor="file-input">
					<AddIcon />
				</label>
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
	inSelect: boolean;
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
