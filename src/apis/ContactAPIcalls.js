
import {
    POST_REGISTER
   ,GET_ADDRESSBOOK
   ,PUT_ADDRESSBOOK
   ,DELETE_ADDRESSBOOK
   ,GET_CONTACTLIST
} from '../modules/ContactModule';

export const callRegistAPI = ({form, memberCode}) => {

  
    const requestURL = `http://localhost:8989/addressBook/addContact/${memberCode}`

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
            },
            body: form
                
                
            
        }).then(response => response.json());
        console.log("[ContactAPICalls] callRegisterAPI RESULT : ", result); 
        
        if(result.status === 201) {
            alert('연락처 추가 성공')

            dispatch({ type: POST_REGISTER,  payload: result });
        } else {
            alert('연락처 추가 실패')
        }

        window.location.reload();

    };
};

// export const callContactListPagingAPI = ({currentPage}) => {
   

//     if(currentPage !== undefined || currentPage !== null){
//         requestURL = `http://localhost:8989/addressBook/contact/?offset=${currentPage}`;
//     }else {
//         requestURL = `http://localhost:8989/addressBook/contact`;
//     }

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*",
//                 "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
//             }
//         })
//         .then(response => response.json());
//         if(result.status === 200){
//             console.log('[ProduceAPICalls] callProductListForAdminAPI RESULT : ', result);
//             dispatch({ type: GET_CONTACTLIST,  payload: result.data });
//         }
        
//     };
// };

export const callSelectAPI = ({memberCode, currentPage, title}) => {

    let requestURL;
   

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8989/addressBook/contact/${memberCode}/${title}/?offset=${currentPage}`;
    }else {
        requestURL = `http://localhost:8989/addressBook/contact/${memberCode}/${title}`;
    }
    

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",

        })
        .then(response => response.json())
        
        console.log('[ContactAPICalls] callSelectAPI RESULT  {} : ', result);

        dispatch({type: GET_ADDRESSBOOK, payload: result});

        console.log("asdasd", result);
    }
};

export const callContactUpdateAPI = ({contactCode, form}) => {

    const requestURL = `http://localhost:8989/addressBook/addressBookUpdate/${ contactCode }`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                
            },
            body: form
        })
        
        
        .then(response => response.json());

        console.log('[ContactAPICalls] callUpdateAPI RESULT  {} : ', result);

        alert('수정이 완료되었습니다.')
        window.location.reload();

        dispatch({type: PUT_ADDRESSBOOK, payload: result})
    }
}

export const callUpdateAPI = ({contactCode}) => {

    const requestURL = `http://localhost:8989/addressBook/contactUpdate/${ contactCode }`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                
            },
            
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

