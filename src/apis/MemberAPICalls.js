import { PROTOCOL, SERVER_IP, SERVER_PORT} from './APIConfig';
import {
    GET_MEMBER
    , POST_LOGIN
    , POST_REGISTER
} from '../modules/MemberModule';

export const callGetMemberAPI = ({ memberId }) => {
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/v1/members/${memberId}`;

    return async (dispatch, getState) => {

        
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
            .then(response => response.json());

        console.log('[MemberAPICalls] callGetMemberAPI RESULT : ', result);

        dispatch({ type: GET_MEMBER, payload: result });

    };
}

export const callLoginAPI = ({ form }) => {
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/auth/login`;

    return async (dispatch, getState) => {

        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 보안상의 이유로 브라우저는 스크립트에서 시작한 교차 출처 HTTP요청을 제한한다.
        // 서버에서 cors 허용을 해주어야 함
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Access-Control-Allow-Origin": "*",     // 모든 도메인에서 접근할 수 있음을 의미 (특정도메인을 넣고싶으면 * 대신 http://test.com)
            },
            body: JSON.stringify({
                memberId: form.memberId,
                memberPassword: form.memberPassword
            })
        })
            .then(response => response.json());

        console.log('[MemberAPICalls] callLoginAPI RESULT : ', result);
        if (result.status === 200) {
            window.localStorage.setItem('accessToken', result.data.accessToken);
        }
        dispatch({ type: POST_LOGIN, payload: result });

    };
}


export const callLogoutAPI = () => {


    return async (dispatch, getState) => {

        dispatch({ type: POST_LOGIN, payload: '' });
        console.log('[MemberAPICalls] callLogoutAPI RESULT : SUCCESS');
    };
}


export const callRegisterAPI = ({ form, image }) => {
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/auth/regist`;

    const formData = new FormData();

    for (const key in form) { 
        formData.append(key, form[key]);
    }

    if (image){
        formData.append("image", image);
    }

    return async (dispatch, getState) => {
        
        console.log("form =-==-=-=- ", form);
        console.log("image-=-", image);

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                // "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: formData,
        })
            .then(response => response.json());

        console.log('[MemberAPICalls] callRegisterAPI RESULT : ', result);

        if (result.status === 201) {
            dispatch({ type: POST_REGISTER, payload: result });
        }
    };
}