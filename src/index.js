import 'babel-polyfill';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { selectUnit } from './Actions/actions';
import rootReducer from './Reducers';
import React from 'react';
import ReactDOM from 'react-dom';
//import react router deps
//import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
//import store, { history } from './store';

import './index.css';

//import components
import App from './components/App';
//import registerServiceWorker from './registerServiceWorker';


//ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();

const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
)

// TODO: for testing purposes only!
// store.dispatch(selectUnit('I2054'));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
