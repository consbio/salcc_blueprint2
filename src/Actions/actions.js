import fetch from 'isomorphic-fetch';
/*
 * action types
 */

export const SELECT_UNIT = 'SELECT_UNIT';

export function selectUnit(unit){
    return {
        type: SELECT_UNIT,
        unit
    }
}
export const DESELECT_UNIT = 'DESELECT_UNIT';

export function deselectUnit(unit){
    return {
        type: DESELECT_UNIT,
        unit
    }
}

export const REQUEST_DATA = 'REQUEST_DATA';

function requestData(unit){
    return {
        type: REQUEST_DATA,
        unit
    }
}

export const RECIEVE_DATA = 'RECIEVE_DATA';

function recieveData(unit, json){
    return {
        type: RECIEVE_DATA,
        unit,
        data: (json.data)? json.data : [], //was data
        recievedAt: Date.now()
    }
}

export function fetchData( unit ) {
    return function (dispatch) {
        dispatch(requestData(unit));
        return fetch(process.env.PUBLIC_URL + '/data/' + unit + '.json')
            .then(
                response => response.json(),
                error => console.log('Error occured.', error)
            )
            .then(json => dispatch(recieveData(unit, json)))
    }
}