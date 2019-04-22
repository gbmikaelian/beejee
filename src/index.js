import React from 'react';
import './index.css';
import { render } from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Root from './components/Root';
import { BrowserRouter as Router } from 'react-router-dom';

const initialState = {};

const store = configureStore(initialState);
render(
    <Router>
        <Provider store={store}>
            <Root/>
        </Provider>
    </Router>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
serviceWorker.unregister();
