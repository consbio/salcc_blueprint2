import { combineReducers } from 'redux';
import {
    SELECT_UNIT,
    DESELECT_UNIT,
    REQUEST_DATA,
    RECIEVE_DATA
} from '../Actions/actions';

function selectedUnit (state = 'reactjs', action){
    switch (action.type){
        case SELECT_UNIT:
            return action.unit;
        default:
            return state
    }
}

function data (
    state = {
        isFetching: false,
        didDeselect: false,
        items: []
    },
    action
) {
    switch (action.type) {
        case DESELECT_UNIT:
            return Object.assign({}, state, {
                didDeselect: true
            });
        case REQUEST_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                didDeselect: false
            });
        case RECIEVE_DATA:
            return Object.assign({}, state, {
                isFetching: false,
                didDeselect: false,
                items: action.data,
                lastUpdated: action.recievedAt
            });
        default:
            return state
    }
}

function dataByUnit (state = {}, action){
    switch (action.type){
        case DESELECT_UNIT:
        case RECIEVE_DATA:
        case REQUEST_DATA:
            return Object.assign({}, state, {
                [action.unit]: data(state[action.unit], action)
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    dataByUnit,
    selectedUnit
})

export default rootReducer;