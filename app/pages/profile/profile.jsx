import 'skeleton-css-webpack';
import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/main.css';
import Profile from './components/Profile.jsx';

ReactDOM.render(<Profile/>, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}