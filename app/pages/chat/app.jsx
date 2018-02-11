import 'skeleton-css-webpack';
import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/main.css';
import ChatView from './components/ChatView.jsx';

ReactDOM.render(<ChatView user={user}/>, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}