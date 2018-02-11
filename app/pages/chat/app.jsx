import 'skeleton-css-webpack';
import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/main.css';
import ChatViewController from './components/ChatViewController.jsx';

// user is set in server/views/index.ejs
ReactDOM.render(
  <ChatViewController user={user}/>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}