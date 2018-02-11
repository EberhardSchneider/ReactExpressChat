import 'skeleton-css-webpack';
import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/main.css';
import LoginView from './components/LoginView.jsx';

// message is set in server/views/login.ejs
ReactDOM.render(
  <LoginView message={message}/>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}