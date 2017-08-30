import 'babel-polyfill';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './Reducers';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


//import components
import App from './components/App';
// import registerServiceWorker from './registerServiceWorker';


// registerServiceWorker();

const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
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
