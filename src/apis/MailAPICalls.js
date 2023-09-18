
import {
    GET_MAIL,
    POST_MAIL,
    DELETE_MAIL,
    GET_FILE,
    GET_CONTACT_MAIL
} from '../modules/MailModule';
import {
    DELETE_TRASH,
    GET_TRASH,
    PUT_TRASH
} from '../modules/MailTrashModule'
import {PROTOCOL, SERVER_IP, SERVER_PORT} from "./APIConfig";

export const callMailSelectAPI = ({memberCode, currentPage, title}) => {

    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/mail/mailList/${memberCode}/${title}/?offset=${currentPage}`;
    }else {
        requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/mail/mailList/${memberCode}/${title}`;
    }

    

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'GET'
        })
        .then(response => response.json());

        
        dispatch({type: GET_MAIL , payload: result});

        console.log("========================== " + result.data);

        // window.location.reload();

    } 

}


export const callMiniMailSelectAPI = ({memberCode, currentPage, title}) => {

    let requestURL;

    requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/mail/miniMail/${memberCode}/${title}/?offset=${currentPage}`;

    

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

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/mail/contactList/${memberCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'GET'
        })
        .then(response => response.json());



        dispatch({type: GET_CONTACT_MAIL , payload: result});

        console.log("========================== " + result.data);

       

    } 

}

export const callPostMailAPI = ({form}) => {

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/mail/postMail`;

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

        alert("메일전송 성공")
    }
}

export const callDeleteMailAPI = ({mailCode}) => {

    console.log("mailCode뭐들어오냐", mailCode);

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/mail/deleteMail/${mailCode}`

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                "Accept": "*/*",
                
            },
           
        })

        .then(response => response.json());

        dispatch({type: DELETE_MAIL, payload: result})
        
        alert("삭제가 완료되었습니다")

        window.location.reload();
    }
}


export const callUpdateStatusAPI = ({mailCode}) => {

    console.log("mailCode뭐들어오냐", mailCode);

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/mail/updateMail/${mailCode}`

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                "Accept": "*/*",
                
            },
           
        })

        .then(response => response.json());

        dispatch({type: DELETE_MAIL, payload: result})
        
        window.location.reload();
    }
}

export const callSelectTrashAPI = ({memberCode}) => {

    console.log("memberCode", memberCode);

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/mail/selectTrash/${memberCode}`

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Accept": "*/*",
                
            },
           
        })

        .then(response => response.json());

        dispatch({type: GET_TRASH, payload: result})

        console.log("res" , result);
        
        
    }
}

export const callDeleteTrashAPI = ({memberCode}) => {

    console.log("{callDeleteTrashAPI } memberCode", memberCode);

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/mail/deleteTrash/${memberCode}`

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                "Accept": "*/*",
                
            },
           
        })

        .then(response => response.json());

        dispatch({type: DELETE_TRASH, payload: result})
        
        window.location.reload();
        
    }
}

export const callUpdateTrashAPI = ({memberCode}) => {

    console.log(" { callUpdateTrashAPI } memberCode", memberCode);

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/mail/updateTrash/${memberCode}`

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                "Accept": "*/*",
                
            },
           
        })

        .then(response => response.json());

        dispatch({type: PUT_TRASH, payload: result})
        
        window.location.reload();

        alert("복구 완료")
        
    }
}

export const callFileAPI = ({mailCode}) => {

    console.log("mailCode", mailCode);

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/mail/selectFile/${mailCode}`

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Accept": "*/*",
                
            },
           
        })

        .then(response => response.json());

        dispatch({type: GET_FILE, payload: result})

        console.log("res" , result);
        
        
    }
}



