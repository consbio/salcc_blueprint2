import { combineReducers } from 'redux'
import { responsiveStateReducer } from 'redux-responsive'

import { DESELECT_UNIT, REQUEST_DATA, RECIEVE_DATA, REQUEST_ERROR, SET_TAB } from '../Actions/actions'

const updateObject = (oldObject, newObject) => Object.assign({}, oldObject, newObject)

const initialState = {
    // Application state
    isPending: false,
    hasError: false,
    // width: window.innerWidth,
    activeTab: null,

    // State of the selected unit
    selectedUnit: null,
    data: null
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case DESELECT_UNIT:
            return updateObject(state, {
                isPending: false,
                hasError: false,
                selectedUnit: null,
                data: null
            })

        case RECIEVE_DATA:
            return updateObject(state, {
                isPending: false,
                selectedUnit: action.unit,
                data: action.data || null
            })

        case REQUEST_DATA:
            return updateObject(state, {
                isPending: true,
                hasError: false,
                selectedUnit: action.unit,
                data: null
            })

        case REQUEST_ERROR:
            return updateObject(state, {
                isPending: false,
                hasError: true,
                selectedUnit: null,
                data: null
            })

        case SET_TAB:
            return updateObject(state, { activeTab: action.tab })

        default:
            return state
    }
}

export default combineReducers({
    browser: responsiveStateReducer,
    app: mainReducer
})
