

import {
    POST_REGISTER
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
        }).then(response => response.text());

        console.log("[ContactAPICalls] callRegisterAPI RESULT : ", result);



        if(result.status === 201){
            dispatch({ type: POST_REGISTER,  payload: result });
        }     
        
    };
}