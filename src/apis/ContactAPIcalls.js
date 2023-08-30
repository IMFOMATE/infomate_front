
import {
    POST_REGISTER
   ,GET_ADDRESSBOOK
   ,PUT_ADDRESSBOOK
   ,DELETE_ADDRESSBOOK
} from '../modules/ContactModule';

export const callRegistAPI = ({form}) => {
    const requestURL = "http://localhost:8989/addressBook/addContact"

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
            },
            body: form
                // photo: form.contactPhoto,
                // contactName: form.name,
                // company: form.company,
                // department: form.department,
                // contactEmail: form.email,
                // contactPhone: form.phone,
                // companyPhone: form.companyPhone,
                // companyAddress: form.companyAddress,
                // memo: form.memo,
                // contactLike: form.like,
                
            
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
        

        

        console.log('[ContactAPICalls] callSelectAPI RESULT  {} : ', result);

        dispatch({type: GET_ADDRESSBOOK, payload: result});
    }
};

export const callUpdateAPI = ({contactCode}) => {

    const requestURL = `http://localhost:8989/addressBook/contactUpdate/${ contactCode }`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method: "PUT",

        })
        .then(response => response.json());

        console.log('[ContactAPICalls] callUpdateAPI RESULT  {} : ', result);

        dispatch({type: PUT_ADDRESSBOOK, payload: result})
    }
};

export const callDeleteContactAPI = ({contactCode}) => {

    const requestURL = `http://localhost:8989/addressBook/deleteContact/${ contactCode }`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "DELETE",
        })
        .then(response => response.json());

        console.log('[callDeleteContactAPI] callDeleteContactAPI result {} : ' ,result);

        dispatch({type: DELETE_ADDRESSBOOK, payload: result})

        
        alert("연락처가 삭제되었습니다.")
        window.location.reload();

        
    }
}

