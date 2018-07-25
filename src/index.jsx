import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'babel-polyfill'
import ReactGA from 'react-ga'

import { unregister } from './registerServiceWorker'

import App from './components/App'
import store from './store'

// unregister previously installed service workers, which are messing with the routes on the server
unregister()

ReactGA.initialize('UA-38720072-1')

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
