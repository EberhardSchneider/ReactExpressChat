import 'skeleton-css-webpack';
import React from 'react';
import ReactDOM from 'react-dom';

import Text from './components/text.jsx';

ReactDOM.render(<Text/>, document.getElementById('app'));

if (module.hot) {
    module.hot.accept();
}