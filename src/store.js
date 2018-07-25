import thunkMiddleware from 'redux-thunk'
// import createRavenMiddleware from 'raven-for-redux'
import { createLogger } from 'redux-logger'
import { compose, createStore, applyMiddleware } from 'redux'
import { responsiveStoreEnhancer } from 'redux-responsive'

import rootReducer from './Reducers'

const loggerMiddleware = createLogger()

const store = createStore(
    rootReducer,
    compose(
        responsiveStoreEnhancer,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )
)

export default store
