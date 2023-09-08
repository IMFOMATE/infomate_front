
import {
    GET_MAIL,
    POST_MAIL
} from '../modules/MailModule';

export const callMailSelectAPI = () => {

    const requestURL = "http://localhost:8989/mail/mailList/2";

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'GET'
        })
        .then(response => response.json());



        dispatch({type: GET_MAIL , payload: result});

        console.log("========================== " + result.data);

    

    } 

}

export const callMailContactSelectAPI = ({memberCode}) => {

    const requestURL = `http://localhost:8989/mail/contactList/${memberCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'GET'
        })
        .then(response => response.json());



        dispatch({type: GET_MAIL , payload: result});

        console.log("========================== " + result.data);

       

    } 

}

export const callPostMailAPI = ({form}) => {

    const requestURL = "http://localhost:8989/mail/postMail";

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                "Accept": "*/*",
            },
            body: form
            
        })
        
        .then(response => response.json());

        dispatch({type: POST_MAIL , payload: result})
    }
}