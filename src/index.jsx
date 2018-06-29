import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'babel-polyfill'

// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();

import App from './components/App'
import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
