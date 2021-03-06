import fetch from 'isomorphic-fetch'
import { logException } from '../log'

export const SET_TAB = 'SET_TAB'
export const setTab = tab => ({
    type: SET_TAB,
    tab
})

export const REQUEST_DATA = 'REQUEST_DATA'
function requestData(unit) {
    return {
        type: REQUEST_DATA,
        unit
    }
}

export const REQUEST_ERROR = 'REQUEST_ERROR'
function requestError(unit) {
    return {
        type: REQUEST_ERROR,
        unit
    }
}

export const RECIEVE_DATA = 'RECIEVE_DATA'
function recieveData(unit, data) {
    return {
        type: RECIEVE_DATA,
        unit,
        data
    }
}

export const SELECT_UNIT = 'SELECT_UNIT'
export function selectUnit(unit) {
    return (dispatch) => {
        dispatch(requestData(unit))
        return fetch(`${process.env.PUBLIC_URL}/data/${unit}.json`)
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error('Bad response from server')
                }
                return response.json()
            })
            .then(data => dispatch(recieveData(unit, data)))
            .catch((error) => {
                logException(`Error occured fetching unit: ${error}`)
                dispatch(requestError(unit))
            })
    }
}

export const DESELECT_UNIT = 'DESELECT_UNIT'
export function deselectUnit() {
    return { type: DESELECT_UNIT }
}

export const SET_PLACE = 'SET_PLACE'
export const setPlace = place => ({
    type: SET_PLACE,
    place
})

export const SET_PLACES = 'SET_PLACES'
export const setPlaces = places => ({
    type: SET_PLACES,
    places
})

export const SET_PIXEL_MODE = 'SET_PIXEL_MODE'
export const setPixelMode = isPixelMode => ({
    type: SET_PIXEL_MODE,
    isPixelMode
})

export const SET_PIXEL_VALUES = 'SET_PIXEL_VALUES'

export const setPixelValues = (pixelLocation, pixelValues, isPending) => ({
    type: SET_PIXEL_VALUES,
    pixelLocation,
    pixelValues,
    isPending
})

export const SET_VIDEO_OPEN = 'SET_VIDEO_OPEN'
export const setVideoOpen = isVideoOpen => ({
    type: SET_VIDEO_OPEN,
    isVideoOpen
})
