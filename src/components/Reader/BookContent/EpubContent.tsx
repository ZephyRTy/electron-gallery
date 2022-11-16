/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import { Book, Rendition } from 'epubjs';
import React, { useEffect, useState } from 'react';
import { readerOperator } from '../../../utils/data/galleryOperator';
import { OpenInExplorerBtn } from '../../Gallery/Buttons';
import { Sidebar, SidebarContainer } from '../../Menu';
import { Back, CatalogBtn, Find, RegExpBtn } from '../Buttons';
import { EpubSideCatalog } from './EpubSideCatalog';
import { SideEnter3D } from './SideEnter3D';
function viewportToPixels(value) {
	let parts = value.match(/([0-9\.]+)(vh|vw)/);
	let q = Number(parts[1]);
	let side =
		window[['innerHeight', 'innerWidth'][['vh', 'vw'].indexOf(parts[2])]];
	return side * (q / 100);
}

export const EpubContext = React.createContext(null as any as Book);
export const EpubContent = () => {
	const [rendition, setRendition] = useState(null as Rendition | null);
	const [book, setBook] = useState(null as any);

	useEffect(() => {
		const filePath = readerOperator.loadEpub();
		const book = new Book(filePath);
		const bookRendition = book.renderTo('viewer', {
			width: 800,
			height: viewportToPixels('96vh'),
			manager: 'continuous',
			flow: 'paginated'
		});
		(window as any).book = book;
		setBook(book);
		bookRendition.hooks.render.register((content, view) => {
			if (content.document?.body) {
				content.document.onwheel = async (e) => {
					if (e.deltaY > 0) {
						await bookRendition.next();
					} else {
						await bookRendition.prev();
					}
				};
			}
			content.window?.addEventListener('unload', () => {
				if (content.document) {
					content.document.onwheel = null;
				}
			});
		});
		// bookRendition.on('selected', (cfiRange, contents) => {
		// 	console.log(bookRendition.getRange(cfiRange));
		// });
		//TODO selected 事件可以获取选区和epubCfi，通过Annotation可以实现笔记功能
		bookRendition.display().then(() => {
			setRendition(bookRendition);
		});
		return () => {
			bookRendition.destroy();
		};
	}, []);
	useEffect(() => {
		if (!rendition) return;
	}, [rendition]);
	useEffect(() => {
		if (!book) return;
	}, [book]);
	return (
		<EpubContext.Provider value={book}>
			<SideEnter3D
				render={() => {
					return <EpubSideCatalog rendition={rendition} />;
				}}
			/>
			<SidebarContainer>
				<Sidebar menuPosition="middle">
					<Back />
					<RegExpBtn />
					<CatalogBtn />
					<Find />
					<OpenInExplorerBtn filePath={''} />
				</Sidebar>
			</SidebarContainer>
			<div id="viewer"></div>
		</EpubContext.Provider>
	);
};
