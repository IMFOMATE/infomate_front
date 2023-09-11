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

export const callhBoardViewAPI = ({ currentPage }) => {
    console.log('[BoardAPICalls] callSearchBoardAPI Call');
  
    let requestURL;
  
    if (currentPage !== undefined && currentPage !== null) {
      requestURL = `http://localhost:8989/brd/board?offset=${currentPage}`;
    } else {
      requestURL = `http://localhost:8989/brd/board`;
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
        requestURL = `http://localhost:8989/brd/miniboard?offset=${currentPage}`;
    } else {
        requestURL = `http://localhost:8989/brd/miniboard`;
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


export const callPostDeleteAPI = (postCode) => {
    console.log('[BoardAPICalls] callPostDeleteAPI Call');
  
    const requestURL = `http://localhost:8989/brd/board/delete/${postCode}`;
  
    return async (dispatch) => {
      try {
        const response = await fetch(requestURL, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
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

    const requestURL = `http://localhost:8989/cmt/${postCode}/commentView`;

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

    const requestURL = `http://localhost:8989/cmt/${postCode}/newcomment`;

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

    const requestURL = `http://localhost:8989/cmt/${postCode}/updatecomment`;

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

    const requestURL = `http://localhost:8989/cmt/${postCode}/deletecomment`;

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




export const callNoticeViewAPI = () => {
    const requestURL = `http://localhost:8989/brd/board/notice`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"                
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[BoardAPICalls] callNoticeViewAPI RESULT : ', result);
            dispatch({ type: GET_NOTICE,  payload: result.data });
        }
        
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