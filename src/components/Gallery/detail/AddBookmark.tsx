import { MutableRefObject, useCallback } from 'react';
import { useController } from 'syill';
import { ReactComponent as AddBookmarkIcon } from '../../../icon/addBookmark.svg';
import globalConfig from '../../../types/constant';
import { BasicData } from '../../../types/global';
import { FileOperator } from '../../../utils/fileOperator';
import { formatDate, parseUrlQuery } from '../../../utils/functions';
import { imageStateStore } from '../../../utils/store';

export function AddBookmark(props: {
	fileOperator: FileOperator;
	pack: string | undefined;
	// eslint-disable-next-line no-unused-vars
	bookmarkToast: MutableRefObject<(arg: boolean) => void>;
}) {
	const { fileOperator, pack, bookmarkToast } = props;
	const [zoom] = useController(imageStateStore);
	const handleClick = useCallback(
		(e) => {
			let top = Math.round(
				document.getElementsByClassName('pack-detail-list')[0].scrollTop
			);
			let imgSrc = '';
			if (zoom.length > 0) {
				imgSrc = '/' + zoom().split('/').pop()!;
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
			let data = fileOperator.current(
				parseInt(pack!),
				false
			) as BasicData;

			// 记录当前图片的位置
			let href = window.location.href;
			let url = '#' + href.split('#')[1].split('?')[0] + '?';
			if (href.includes('&scroll')) {
				const urlObj = parseUrlQuery(href);
				for (const key in urlObj) {
					if (key !== 'scroll') {
						url += `${key}=${urlObj[key]}&`;
					} else {
						url += `scroll=${top}&`;
					}
				}
				// url = `#${href
				// 	.split('#')
				// 	.pop()
				// 	?.replace(/scroll=[0-9]+/, '&scroll=' + top)}`;
			} else {
				url = `#${href.split('#')[1]}&scroll=` + top;
			}
			fileOperator.bookmarksUpdate({
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
			disabled={!globalConfig.r18}
			onClick={handleClick}
		>
			<AddBookmarkIcon />
		</button>
	);
}
