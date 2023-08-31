import { 
    GET_BOARD,
    POST_POST,
    GET_POST,
    // PUT_POST,
    GET_NOTICE,
    GET_COMMON,
    GET_ANONY,
    GET_DEPT   

} from '../modules/BoardModule.jsx';

export const callhBoardViewAPI = () => {   // 게시판 조회
    console.log('[BoardAPICalls] callSearchBoardAPI Call');

    const requestURL = `http://localhost:8989/board/`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            }
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callSearchBoardAPI RESULT : ', result);

        dispatch({ type: GET_BOARD,  payload: result });
        
    };    
};


export const callPostPostAPI = () => {   // 게시글 생성
    console.log('[BoardAPICalls] callPostPostAPI Call');

    const requestURL = `http://localhost:8989/board/posting`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
                // "Accept": "*/*",
                // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callPostPostAPI RESULT : ', result);

        dispatch({ type: POST_POST,  payload: result });
        
    };    
}


// export const callPostUpdateAPI = () => {   // 게시글 수정 쓸 때 맨 위에 주석 풀어야 됨 !!!
//     console.log('[BoardeAPICalls] callPostUpdateAPI Call');

//     const requestURL = `http://localhost:8989/board/post`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: "PUT",
//         })
//         .then(response => response.json());

//         console.log('[BoardAPICalls] callPostUpdateAPI RESULT : ', result);

//         dispatch({ type: PUT_POST,  payload: result });
        
//     };    
// }

export const callPostViewAPI = () => { // 게시글 보기
    const requestURL = "http://localhost:8989/board/post";

    return async (dispatch, getState) => {


        const result = await fetch(requestURL, {
            method: "GET",
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callPostViewAPI RESULT : ', result);

            dispatch({ type: GET_POST,  payload: result.data });
        }
}



export const callNoticeViewAPI = () => {    // 공지사항 조회   
    const requestURL = "http://localhost:8989/board/notice";

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callNoticeViewAPI RESULT : ', result);

        dispatch({ type: GET_NOTICE, payload: result.data });
    };    
}



export const callCommonViewAPI = () => {    // 일반게시판 조회   
    const requestURL = "http://localhost:8989/board/common";

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callCommonViewAPI RESULT : ', result);

        dispatch({ type: GET_COMMON, payload: result.data });
    };    
}


export const callAnonyViewAPI = () => {    // 익명게시판 조회   
    const requestURL = "http://localhost:8989/board/anony";

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callAnonyViewAPI RESULT : ', result);

        dispatch({ type: GET_ANONY, payload: result.data });
    };    
}


export const callDeptViewAPI = () => {    // 부서별게시판 조회   
    const requestURL = "http://localhost:8989/board/dept";

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callDeptViewAPI RESULT : ', result);

        dispatch({ type: GET_DEPT, payload: result.data });
    };    
}