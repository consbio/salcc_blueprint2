import { DESELECT_UNIT, REQUEST_DATA, RECIEVE_DATA, REQUEST_ERROR } from '../Actions/actions'

export default function rootReducer(
    state = {
        // Application state
        isPending: false,
        hasError: false,

        // State of the selected unit
        selectedUnit: null,
        data: null
    },
    action
) {
    switch (action.type) {
        case DESELECT_UNIT:
            return Object.assign({}, state, {
                isPending: false,
                hasError: false,
                selectedUnit: null,
                data: null
            })

        case REQUEST_DATA:
            return Object.assign({}, state, {
                isPending: true,
                hasError: false,
                selectedUnit: action.unit,
                data: null
            })

        case RECIEVE_DATA:
            return Object.assign({}, state, {
                isPending: false,
                selectedUnit: action.unit,
                data: action.data || null
            })

        case REQUEST_ERROR:
            return Object.assign({}, state, {
                isPending: false,
                hasError: true,
                selectedUnit: null,
                data: null
            })

        default:
            return state
    }
}
