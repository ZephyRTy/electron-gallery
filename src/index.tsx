import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Header } from './components/Gallery/Header';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { MainRouter } from './Router';
ReactDOM.render(
	<React.StrictMode>
		<Header />
		<MainRouter />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
