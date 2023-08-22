
import {
    GET_MAIL,
} from '../modules/MailModule';

export const callMailSelectAPI = ({mail}) => {

    const requestURL = "http://localhost:8989/addressBook/contact/2";

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'GET'
        })
        .then(response => response.json());

        dispatch({type: GET_MAIL , payload: result});

    } 

}