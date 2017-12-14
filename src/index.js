import 'babel-polyfill';
import thunkMiddleware from 'redux-thunk';
import Raven from 'raven-js';
import createRavenMiddleware from 'raven-for-redux';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './Reducers';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
// import registerServiceWorker from './registerServiceWorker';


// registerServiceWorker();

Raven.config('https://ee2fb0698ed04309baa26d4af81b0305@sentry.io/213163').install()


const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
        /*createRavenMiddleware(Raven),*/
        thunkMiddleware,
        loggerMiddleware
    )
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
