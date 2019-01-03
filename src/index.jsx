import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Raven from 'raven-js'
import 'babel-polyfill'
import ReactGA from 'react-ga'

import { unregister } from './registerServiceWorker'

import App from './components/App'
import store from './store'

// unregister previously installed service workers, which are messing with the routes on the server
unregister()

if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize('UA-82274034-10')

    // Initialize raven for our DSN
    if (process.env.SENTRY_DSN) {
        Raven.config(process.env.SENTRY_DSN).install()
    }
}

ReactGA.pageview(window.location.pathname)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
