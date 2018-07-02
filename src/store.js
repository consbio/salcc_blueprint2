import thunkMiddleware from 'redux-thunk'
import Raven from 'raven-js'
// import createRavenMiddleware from 'raven-for-redux'
import { createLogger } from 'redux-logger'
import { compose, createStore, applyMiddleware } from 'redux'
import { responsiveStoreEnhancer } from 'redux-responsive'

import rootReducer from './Reducers'

// Initialize raven for our DSN
if (process.env.NODE_ENV !== 'development') {
    Raven.config('https://ee2fb0698ed04309baa26d4af81b0305@sentry.io/213163').install()
}


const loggerMiddleware = createLogger()

const store = createStore(
    rootReducer,
    compose(
        responsiveStoreEnhancer,
        applyMiddleware(
            /* createRavenMiddleware(Raven), */
            thunkMiddleware,
            loggerMiddleware
        )
    )
)

export default store
