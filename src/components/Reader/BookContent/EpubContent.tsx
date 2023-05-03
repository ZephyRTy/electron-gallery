/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import { Rendition } from 'epubjs';
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EpubDetail } from '../../../utils/data/EpubDetail';
import { readerOperator } from '../../../utils/data/galleryOperator';
import { formatDate } from '../../../utils/functions/functions';
import { EpubCommentDialog } from '../../Dialog';
import { OpenInExplorerBtn } from '../../Gallery/Buttons';
import { Sidebar, SidebarContainer } from '../../Menu';
import { Back, CatalogBtn, Find, ShowMarksBtn } from '../Buttons';
import { EpubSideCatalog } from './EpubSideCatalog';
import { EpubSideMarkDiv } from './EpubSideMarkDiv';
import { Progress } from './Progress';
import { SideEnter3D } from './SideEnter/SideEnter3D';
function viewportToPixels(value) {
	let parts = value.match(/([0-9\.]+)(vh|vw)/);
	let q = Number(parts[1]);
	let side =
		window[['innerHeight', 'innerWidth'][['vh', 'vw'].indexOf(parts[2])]];
	return side * (q / 100);
}

export const EpubContext = React.createContext(null as any as EpubDetail);
export const EpubContent = () => {
	const [rendition, setRendition] = useState(null as Rendition | null);
	const [book, setBook] = useState(null as any as EpubDetail);
	const [searchParams] = useSearchParams();
	let href = decodeURIComponent(searchParams.get('href') || '');
	useEffect(() => {
		readerOperator.loadEpub().then(async (book) => {
			setBook(book);
			const rendition = book.renderTo('viewer');
			if (href) {
				await rendition.display(href);
			} else {
				await rendition.display();
			}
			setRendition(rendition);
			(window as any).book = book;
			(window as any).rendition = rendition;
		});

		return () => {
			book?.destroy();
		};
	}, []);
	const quit = useCallback(async () => {
		await readerOperator.UpdateBookmark({
			...book!.getMeta(),
			url: `#/reader/book/${
				readerOperator.packWillOpen()!.id
			}?href=${encodeURIComponent(rendition!.location.start.cfi)}`,
			timeStamp: formatDate(new Date())
		});
	}, [book, rendition]);
	return (
		<EpubContext.Provider value={book}>
			<SideEnter3D
				renderCatalog={() => {
					return (
						<EpubSideCatalog
							navigation={book?.navigation}
							rendition={rendition}
						/>
					);
				}}
				renderMarkDiv={() => {
					return <EpubSideMarkDiv rendition={rendition} />;
				}}
			/>
			<EpubCommentDialog />
			<SidebarContainer>
				<Sidebar menuPosition="middle">
					<Back quitBehavior={quit} />
					<CatalogBtn />
					<ShowMarksBtn />
					<Find />
					<OpenInExplorerBtn filePath={''} />
				</Sidebar>
			</SidebarContainer>
			<div id="viewer"></div>
			<Progress rendition={rendition} />
		</EpubContext.Provider>
	);
};
