import { 
    GET_BOARD,
    POST_POST,
    GET_POST,
    PUT_POST,
    GET_NOTICE,
    GET_COMMON,
    GET_ANONY,
    GET_DEPT   

} from '../modules/BoardModule.jsx';

export const callhBoardViewAPI = ({currentPage}) => {   // 게시판 조회
    console.log('[BoardAPICalls] callSearchBoardAPI Call');

    let requestURL;

    if(currentPage !== undefined && currentPage !== null){
        requestURL = `http://localhost:8989/brd/board?offset=${currentPage}`;
    } else {
        requestURL = `http://localhost:8989/brd/board`;
    }

    console.log(`[BoardAPICalls] requesURL : `, requestURL);
    
    
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

        dispatch({ type: GET_BOARD,  payload: result.data });
        
    };    
}


export const callPostPostAPI = ({form}) => {   // 게시글 생성
    console.log('[BoardAPICalls] callPostPostAPI Call ==== {}', JSON.stringify(form));

    form.member.memberCode = 22;
    const requestURL = `http://localhost:8989/brd/board/posting`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify(form)
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callPostPostAPI RESULT : ', result);

        dispatch({ type: POST_POST,  payload: result });
        
    };    
}


export const callPostUpdateAPI = ({postCode, form}) => {   // 게시글 수정
    console.log('[BoardeAPICalls] callPostUpdateAPI Call');

    const requestURL = `http://localhost:8989/brd/board/update/${postCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callPostUpdateAPI RESULT : ', result.data);

        dispatch({ type: PUT_POST,  payload: result.data });
        
    };    
}



export const callPostViewAPI = ({postCode}) => { // 게시글 보기
    
    const requestURL = `http://localhost:8989/brd/board/post/${postCode}`;

    return async (dispatch) => {

        const result = await fetch(requestURL, {
            method: "GET",
            "Content-Type": "application/json",
                "Accept": "*/*",
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callPostViewAPI RESULT : ', result);

            dispatch({ type: GET_POST,  payload: result.data });
        }
}



export const callNoticeViewAPI = () => {    // 공지사항 조회   
    const requestURL = "http://localhost:8989/brd/board/notice";

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
    const requestURL = "http://localhost:8989/brd/board/common";

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
    const requestURL = "http://localhost:8989/brd/board/anony";

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
    const requestURL = "http://localhost:8989/brd/board/dept";

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callDeptViewAPI RESULT : ', result);

        dispatch({ type: GET_DEPT, payload: result.data });
    };    
}