import { useNavigate } from 'react-router-dom';
import { 
    GET_BOARD,
    POST_POST,
    GET_POST,
    PUT_POST,
    DELETE_POST,
    GET_NOTICE,
    GET_COMMON,
    GET_ANONY,
    GET_DEPT,
    GET_COMMENT,
    POST_COMMENT,
    PUT_COMMENT,
    DELETE_COMMENT,
    GET_MAINBOARD,
    

} from '../modules/BoardModule.jsx';
import {PROTOCOL, SERVER_IP, SERVER_PORT} from "./APIConfig";

export const callhBoardViewAPI = ({ currentPage ,boardCategory}) => {
    console.log('[BoardAPICalls] callSearchBoardAPI Call');

    console.log("boardCategory " , boardCategory)
    
  
    let requestURL;
  
    if (currentPage !== undefined && currentPage !== null) {
      requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/brd/board?offset=${currentPage}`;
    } else {
      requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/brd/board`;
    }
  
    console.log(`[BoardAPICalls] requestURL: `, requestURL);
  
    return async (dispatch, getState) => {
      try {
        const response = await fetch(requestURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }
  
        const result = await response.json();
  
        console.log('[BoardAPICalls] callSearchBoardAPI RESULT : ', result);
  
        dispatch({ type: GET_BOARD, payload: result.data });
      } catch (error) {
        console.error("API 요청 오류:", error);
        // 오류 처리 로직 추가
      }
    };
  };

  export const callMainBoardViewAPI = ({currentPage}) => {   // 게시판 조회
    console.log('[MainBoardAPICalls] callSearchBoardAPI Call');

    let requestURL;

    if(currentPage !== undefined && currentPage !== null){
        requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/brd/miniboard?offset=${currentPage}`;
    } else {
        requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/brd/miniboard`;
    }

    console.log(`[MainBoardAPICalls] requesURL : `, requestURL);
    
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            }
        })
        .then(response => response.json());

        console.log('[MainBoardAPICalls] callSearchBoardAPI RESULT : ', result);

        dispatch({ type: GET_MAINBOARD,  payload: result.data });
        
    };    
}

export const callPostPostAPI = ({form}) => {   // 게시글 생성
    console.log('[BoardAPICalls] callPostPostAPI Call ==== {}', JSON.stringify(form));

    const data = JSON.parse(window.localStorage.getItem("authToken"));

    form.member.memberCode = data.memberCode;
    // form.member.memberCode = 521;
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/brd/board/posting`;

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

        console.log('[BoardAPICalls] callPostPostAPI RESULT : ', result.data);

        dispatch({ type: POST_POST,  payload: result.data });
        
    };    
}


export const callPostUpdateAPI = ({postCode, form}) => {   // 게시글 수정
    console.log('[BoardeAPICalls] callPostUpdateAPI Call');

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/brd/board/update`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
            },
            body: JSON.stringify(form)
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callPostUpdateAPI RESULT : ', result.data );

        dispatch({ type: PUT_POST,  payload: result.data });
        
    };    
}



export const callPostViewAPI = ({postCode}) => { // 게시글 보기
    
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/brd/board/post/${postCode}`;

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


export const callPostDeleteAPI = (postCode) => {
    console.log('[BoardAPICalls] callPostDeleteAPI Call');
  
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/brd/board/delete/${postCode}`;
  
    return async (dispatch) => {
      try {
        const response = await fetch(requestURL, {
          method: 'DELETE',
          headers: {
            Accept: '*/*',
            Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete post.');
        }
  
        const result = await response.json();
  
        console.log('[BoardAPICalls] callPostDeleteAPI RESULT : ', result.data);
  
        // 성공적으로 삭제되었을 때 액션을 디스패치합니다.
        dispatch({ type: DELETE_POST, payload: result.data });
      } catch (error) {
        console.error('[BoardAPICalls] callPostDeleteAPI Error: ', error);
      }
    };
  };


export const callCommentViewAPI = ({postCode, form}) => {   // 댓글 조회
    console.log('[BoardeAPICalls] callCommentViewAPI Call');

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/cmt/${postCode}/commentView`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
            },
            body: JSON.stringify(form)
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callCommentViewAPI RESULT : ', result.data );

        dispatch({ type: GET_COMMENT,  payload: result.data });
        
    };    
}


export const callNewCommentAPI = ({postCode, form}) => {   // 댓글 생성
    console.log('[BoardeAPICalls] callNewCommentAPI Call');

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/cmt/${postCode}/newcomment`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
            },
            body: JSON.stringify(form)
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callNewCommentAPI RESULT : ', result.data );

        dispatch({ type: DELETE_POST,  payload: result.data });
        
    };    
}



export const callCommentUpdateAPI = ({postCode, form}) => {   // 댓글 수정
    console.log('[BoardeAPICalls] callCommentUpdateAPI Call');

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/cmt/${postCode}/updatecomment`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
            },
            body: JSON.stringify(form)
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callCommentUpdateAPI RESULT : ', result.data );

        dispatch({ type: DELETE_POST,  payload: result.data });
        
    };    
}



export const callCommentDeleteAPI = ({postCode, form}) => {   // 댓글 삭제
    console.log('[BoardeAPICalls] callCommentDeleteAPI Call');

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/cmt/${postCode}/deletecomment`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
            },
            body: JSON.stringify(form)
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callCommentDeleteAPI RESULT : ', result.data );

        dispatch({ type: DELETE_POST,  payload: result.data });
        
    };    
}

export const callCommonView = async () => {     // 게시판 카테고리 나누기
    try {
      const response = await fetch(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/brd/board/common`);
      if (!response.ok) {
        throw new Error('서버에서 데이터를 가져오지 못했습니다.');
      }
      return await response.json();
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
      throw error;
    }
  };