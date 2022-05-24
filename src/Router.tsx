import { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { PackDetail } from './components/Gallery/detail/PackDetail';
import { Gallery } from './components/Gallery/index/Gallery';
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
				<Route
					element={<PackDetail />}
					path="gallery/pack/:pack"
				></Route>
				<Route element={<Gallery />} index />
			</Routes>
		</HashRouter>
	);
};
