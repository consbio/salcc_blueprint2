import ReactGA from 'react-ga'

import { RECIEVE_DATA, SET_TAB, SET_PIXEL_MODE } from './Actions/actions'

const events = {
    [RECIEVE_DATA]: {
        category: 'Simple Viewer',
        action: 'Select Unit',
        data: 'selectedUnit'
    },
    [SET_TAB]: {
        category: 'Simple Viewer',
        action: 'Select Tab',
        data: 'activeTab'
    },
    [SET_PIXEL_MODE]: {
        category: 'Simple Viewer',
        action: 'Set Pixel Mode',
        data: 'isPixelMode'
    }
}

const trackEvent = ({ category, action, data }, state) => {
    const label = data && state[data] !== undefined && state[data] !== null ? state[data].toString() : null

    ReactGA.event({ category, action, label })
}

export const trackingMiddleware = store => next => (action) => {
    const { type } = action

    // Apply the action so that we can get the resulting state
    const result = next(action)

    if (events[type]) {
        trackEvent(events[type], store.getState().app)
    }

    return result
}

export default trackingMiddleware
