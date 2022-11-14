import { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { PackDetail } from './components/Gallery/detail/PackDetail';
import { Gallery } from './components/Gallery/index/Gallery';
import { Reader } from './components/Reader/BookContent/Reader';
import { Bookshelf } from './components/Reader/index/Bookshelf';
import { ImgServer } from './server/imgServer';
export const MainRouter = () => {
	useEffect(() => {
		ImgServer.getInstance().on();
		return () => {
			ImgServer.getInstance().off();
		};
	}, []);
	return (
		<HashRouter>
			<Routes>
				<Route element={<Gallery />} path="gallery" />
				<Route element={<Bookshelf />} path="reader" />
				<Route element={<Reader />} path="reader/book/:bookID" />
				<Route
					element={<PackDetail />}
					path="gallery/pack/:pack"
				></Route>
				<Route element={<Bookshelf />} index />
			</Routes>
		</HashRouter>
	);
};
