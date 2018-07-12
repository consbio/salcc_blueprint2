import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'babel-polyfill'
import ReactGA from 'react-ga'

import App from './components/App'
import store from './store'

// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();

ReactGA.initialize('UA-38720072-1')

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
