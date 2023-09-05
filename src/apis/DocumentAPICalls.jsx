import axios from 'axios';
import {
  GET_DETAIL,
  GET_DOCUMENT_LIST,
  GET_DOCUMENT_MAIN, POST_DRAFT, POST_PAYMENT, POST_VACATION,
} from '../modules/approval/DocumentModuels';

// 결재 메인 화면
export const getMainAPI = ({memberCode}) => {



  const requestURL = `http://localhost:8989/document/main/${memberCode}`;

  return async (dispatch, getState)  => {

    const result = await axios.get(requestURL)
        .then(res => res.data)
        .catch(err => console.log(err));

    if(result.status === 200){
      dispatch({type: GET_DOCUMENT_MAIN, payload: result});
    }

  };
}

export const getList = ({ docStatus ,filter, page, size}) => {

  const requestURL = `http://localhost:8989/document/approval/${docStatus}?status=${filter}&page=${page}&size=${size}`;

  return async (dispatch, getState)  => {

    const result = await axios.get(requestURL)
        .then(res => res.data)
        .catch(err => console.log(err));

    if(result.status === 200){
      dispatch({type: GET_DOCUMENT_LIST, payload: result.data});
    }
  };
}


// 기안문서등록
export const draftRegistAPI = (form)=>{

  const requestURL = `http://localhost:8989/document/regist/draft`;

  return async (dispatch, getState)  => {

    const result = await axios.post(requestURL, form)
        .then(res => res.data);

    if(result.status === 200){
      dispatch({type: POST_DRAFT, payload: result.data});
    }

  };
};
// 휴가 문서 등록

export const vacationRegistAPI = (form)=>{

  const requestURL = `http://localhost:8989/document/regist/vacation`;

  return async (dispatch, getState)  => {

    const result = await axios.post(requestURL, form)
        .then(res => res.data);

    if(result.status === 200){
      dispatch({type: POST_VACATION, payload: result.data});
    }

  };
};

//지출승인서
export const paymentRegistAPI = (form)=>{

  const requestURL = `http://localhost:8989/document/regist/payment`;

  return async (dispatch, getState)  => {

    const result = await axios.post(requestURL, form)
        .then(res => res.data);

    if(result.status === 200){
      dispatch({type: POST_PAYMENT, payload: result.data});
    }


  };
};





//문서세부내용
export const getDocumentDetailAPI = ({documentCode})=>{

  const requestURL = `http://localhost:8989/document/${documentCode}`;

  return async (dispatch, getState)  => {

    const result = await axios.get(requestURL)
        .then(res => res.data)
        .catch(err => console.log(err));

    if(result.status === 200){
      dispatch({type: GET_DETAIL, payload: result.data});
    }

  };
};