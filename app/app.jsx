import 'skeleton-css-webpack';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';
import MainView from './components/MainView.jsx';

ReactDOM.render(<MainView/>, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}