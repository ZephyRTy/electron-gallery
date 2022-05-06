import { HashRouter, Route, Routes } from 'react-router-dom';
import { PackDetail } from './components/Gallery/detail/PackDetail';
import { Gallery } from './components/Gallery/index/Gallery';
export const MainRouter = () => {
	return (
		<HashRouter>
			<Routes>
				<Route element={<Gallery />} path="/">
					<Route element={<Gallery />} path="gallery" />
				</Route>
				<Route
					element={<PackDetail />}
					path="gallery/pack/:pack"
				></Route>
				<Route element={<Gallery />} index />
			</Routes>
		</HashRouter>
	);
};
