import 'skeleton-css-webpack';
import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/main.css';
import LoginView from './components/LoginView.jsx';

ReactDOM.render(<LoginView/>, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}