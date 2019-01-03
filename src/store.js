import thunkMiddleware from 'redux-thunk'
// import createRavenMiddleware from 'raven-for-redux'
import { createLogger } from 'redux-logger'
import { compose, createStore, applyMiddleware } from 'redux'
import { responsiveStoreEnhancer } from 'redux-responsive'

import rootReducer from './Reducers'
import { trackingMiddleware } from './analytics'

const middleware = [thunkMiddleware]

const { NODE_ENV } = process.env

if (NODE_ENV === 'production') {
    middleware.push(trackingMiddleware)
} else {
    middleware.push(createLogger())
}

const store = createStore(
    rootReducer,
    compose(
        responsiveStoreEnhancer,
        applyMiddleware(...middleware)
    )
)

export default store
