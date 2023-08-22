
import {
    POST_REGISTER
   ,GET_ADDRESSBOOK
} from '../modules/ContactModule';

export const callRegistAPI = ({form}) => {
    const requestURL = "http://localhost:8989/addressBook/addContact";

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            },
            body: JSON.stringify({
                photo: form.photo,
                contactName: form.name,
                company: form.company,
                department: form.department,
                contactEmail: form.email,
                contactPhone: form.phone,
                companyPhone: form.companyPhone,
                companyAddress: form.companyAddress,
                memo: form.memo,
            })
        }).then(response => response.json());
        console.log("[ContactAPICalls] callRegisterAPI RESULT : ", result);
        
        if(result.status === 201) {
            alert('연락처 추가 성공')
            dispatch({ type: POST_REGISTER,  payload: result });
        }



    };
};

export const callSelectAPI = () => {
    const requestURL = "http://localhost:8989/addressBook/contact/2";

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",

        })
        .then(response => response.json());

        

        console.log('[ContactAPICalls] callLoginAPI RESULT  {} : ', result);

        dispatch({type: GET_ADDRESSBOOK, payload: result});
    }
};

