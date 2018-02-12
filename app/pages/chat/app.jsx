import 'skeleton-css-webpack';
import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/main.css';
import ChatController from './components/ChatController.jsx';

// user is set in server/views/index.ejs
ReactDOM.render(
  <ChatController user={user}/>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}