import { combineReducers } from 'redux'
import { createResponsiveStateReducer } from 'redux-responsive'

import {
    DESELECT_UNIT,
    REQUEST_DATA,
    RECIEVE_DATA,
    REQUEST_ERROR,
    SET_TAB,
    SET_PLACE,
    SET_PLACES,
    SET_PIXEL_MODE,
    SET_PIXEL_VALUES
} from '../Actions/actions'

const updateObject = (oldObject, newObject) => Object.assign({}, oldObject, newObject)

const initialState = {
    // Application state
    isPending: false,
    hasError: false,
    activeTab: 'Map',
    place: null, // selected location from search
    places: [], // other places returned from search
    isPixelMode: false, // if true, map is in pixel mode

    // State of the selected unit
    selectedUnit: null,
    data: null,
    isDataLoaded: false,

    // State of the current pixel
    pixelValues: null,
    pixelLocation: null // {latitude: <lat>, longitude: <long>}
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case DESELECT_UNIT:
            return updateObject(state, {
                isPending: false,
                hasError: false,
                selectedUnit: null,
                data: null,
                isDataLoaded: false
            })

        case RECIEVE_DATA:
            return updateObject(state, {
                isPending: false,
                selectedUnit: action.unit,
                data: action.data || null,
                isDataLoaded: !!action.data
            })

        case REQUEST_DATA:
            return updateObject(state, {
                isPending: true,
                hasError: false,
                selectedUnit: action.unit,
                data: null,
                isDataLoaded: false
            })

        case REQUEST_ERROR:
            return updateObject(state, {
                isPending: false,
                hasError: true,
                selectedUnit: null,
                data: null,
                isDataLoaded: false
            })

        case SET_PLACE:
            return updateObject(state, { place: action.place, activeTab: 'Map' })

        case SET_PLACES:
            return updateObject(state, { places: action.places })

        case SET_PIXEL_MODE:
            return updateObject(state, {
                isPixelMode: action.isPixelMode,
                selectedUnit: action.isPixelMode ? null : state.selectedUnit
            })

        case SET_PIXEL_VALUES:
            return updateObject(state, {
                pixelLocation: action.pixelLocation,
                pixelValues: action.pixelValues
            })

        case SET_TAB:
            return updateObject(state, { activeTab: action.tab })

        default:
            return state
    }
}

export default combineReducers({
    // Add an extra field to the responsive reducer so we know if we are using a mobile viewport
    browser: createResponsiveStateReducer(null, {
        extraFields: ({ lessThan }) => ({ isMobile: lessThan.small })
    }),
    app: mainReducer
})
