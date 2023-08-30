import { 
    GET_BOARD,
    POST_POST,
    GET_POST
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


// export const callPostUpdateAPI = () => {   // 게시글 수정
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
        
        
    };