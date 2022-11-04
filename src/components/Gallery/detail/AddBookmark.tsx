import { MutableRefObject, useCallback, useRef } from 'react';
import { ReactComponent as AddBookmarkIcon } from '../../../icon/addBookmark.svg';
import galleryConfig from '../../../types/constant';
import { NormalImage } from '../../../types/global';
import { formatDate, parseUrlQuery } from '../../../utils/functions';
import { GalleryOperator } from '../../../utils/galleryOperator';
import { imageStateStore } from '../../../utils/store';

export function AddBookmark(props: {
	fileOperator: GalleryOperator;
	pack: string | undefined;
	// eslint-disable-next-line no-unused-vars
	bookmarkToast: MutableRefObject<(arg: boolean) => void>;
}) {
	const { fileOperator, pack, bookmarkToast } = props;
	const zoom = useRef(imageStateStore).current;
	const handleClick = useCallback(
		(e) => {
			let top = Math.round(
				document.getElementsByClassName('pack-detail-list')[0].scrollTop
			);
			let imgSrc = '';
			if (zoom.current.length > 0) {
				imgSrc = '/' + zoom.current.split('/').pop()!;
			} else {
				let elements = Array.from(
					document.getElementsByClassName('pack-detail')
				) as HTMLImageElement[];
				let imgIndex = 0;
				for (let i = 0; i < elements.length - 1; i++) {
					if (
						elements[i].offsetTop > top &&
						top < elements[i + 1].offsetTop
					) {
						if (
							elements[i].offsetTop - top <
							elements[i + 1].offsetTop - top
						) {
							imgIndex = i;
						} else {
							imgIndex = i + 1;
						}
						break;
					}
				}
				if (imgIndex < 0) {
					imgIndex = 0;
				}
				imgSrc = '/' + elements[imgIndex].src.split('/').pop();
			}
			let data = fileOperator.packWillOpen(
				parseInt(pack!),
				false
			) as NormalImage;
			// 记录当前图片的位置
			let href = window.location.href;
			let url = window.location.hash.split('?')[0] + '?';
			const urlObj = parseUrlQuery(href);
			for (const key in urlObj) {
				if (typeof urlObj[key] === 'undefined' && key.length <= 0) {
					continue;
				}
				if (key !== 'scroll') {
					url += `${key}=${urlObj[key]}&`;
				}
			}
			if (!urlObj.page) {
				url += 'page=1&';
			}
			url += `scroll=${top + 1}&`;
			fileOperator.UpdateBookmark({
				...data,
				cover: imgSrc,
				url,
				timeStamp: formatDate(new Date())
			});
			bookmarkToast.current(true);

			(e.target as HTMLButtonElement).disabled = true;
			setTimeout(() => {
				(e.target as HTMLButtonElement).disabled = false;
				bookmarkToast.current(false);
			}, 1000);
		},
		[fileOperator, pack, bookmarkToast]
	);
	return (
		<button
			className="add-bookmark detail-icon"
			disabled={!galleryConfig.r18}
			onClick={handleClick}
		>
			<AddBookmarkIcon />
		</button>
	);
}
