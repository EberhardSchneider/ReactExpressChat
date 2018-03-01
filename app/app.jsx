import 'skeleton-css-webpack';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';
import RootController from './RootController.jsx';

// window.user is set in server/views/index.ejs
ReactDOM.render(
  <RootController user={window.user}/>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}