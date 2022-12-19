import { useEffect } from 'react';
import { readerOperator } from '../../../utils/data/galleryOperator';
import styles from '../style/reader.module.scss';
import { EpubContent } from './EpubContent';
import { TextContent } from './TextContent';

export const Reader = () => {
	// eslint-disable-next-line no-unused-vars

	useEffect(() => {
		readerOperator.titleUpdate();
	}, [readerOperator.packWillOpen()]);
	return (
		<>
			<main className={styles['reader'] + ' main-content'}>
				{(
					JSON.parse(window.sessionStorage.getItem('currentBook')!)
						.path as string
				)
					.toLocaleLowerCase()
					.endsWith('.txt') ? (
					<TextContent />
				) : (
					<EpubContent />
				)}
			</main>
		</>
	);
};
