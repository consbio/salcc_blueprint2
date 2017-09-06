import fetch from 'isomorphic-fetch';
import {logException} from '../log';


export const SELECT_UNIT = 'SELECT_UNIT';

export function selectUnit(unit){
    return function (dispatch) {
        dispatch(requestData(unit));
        return fetch(process.env.PUBLIC_URL + '/data/' + unit + '.json')
            .then(
                response => {
                    if (response.status >= 400) {
                        throw new Error('Bad response from server');
                    }
                    return response.json();
                }
            )
            .then(data => dispatch(recieveData(unit, data)))
            .catch((error) => {
                logException(`Error occured fetching unit: ${error}`);
                dispatch(requestError(unit));
            })
    }
}


export const DESELECT_UNIT = 'DESELECT_UNIT';

export function deselectUnit(){
    return {type: DESELECT_UNIT}
}


export const REQUEST_DATA = 'REQUEST_DATA';

function requestData(unit){
    return {
        type: REQUEST_DATA,
        unit
    }
}


export const REQUEST_ERROR = 'REQUEST_ERROR';

function requestError(unit){
    return {
        type: REQUEST_ERROR,
        unit
    }
}


export const RECIEVE_DATA = 'RECIEVE_DATA';

function recieveData(unit, data){
    return {
        type: RECIEVE_DATA,
        unit,
        data: data
    }
}


export function showError(message) {
    return function(dispatch) {
        console.log('Received error', message)
        dispatch(requestError('123')); // FIXME
    }
}