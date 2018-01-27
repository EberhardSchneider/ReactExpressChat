import 'skeleton-css-webpack';
import React from 'react';
import ReactDOM from 'react-dom';

import ChatView from './components/ChatView.jsx';

ReactDOM.render(<ChatView/>, document.getElementById('app'));

if (module.hot) {
    module.hot.accept();
}