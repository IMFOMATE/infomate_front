
import {
    GET_MAIL,
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

// export const callMailSendAPI = ({memberCode}) => {

//     const requestURL = "http://localhost:8989/mail/mailList";

//     return async (dispatch, getState) => {
        
//         const result = await fetch(requestURL, {
//             method: 'GET'
//         })
//     }
// }