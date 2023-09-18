import axios from 'axios';
import {
  CANCEL_DOCUMENT,
  DELETE_DOCUMENT,
  GET_DETAIL,
  GET_DOCUMENT_LIST,
  GET_DOCUMENT_MAIN, POST_DRAFT, POST_PAYMENT, POST_VACATION,
} from '../modules/approval/DocumentModuels';
import { message } from 'antd';
import {PROTOCOL, SERVER_IP, SERVER_PORT} from "./APIConfig";

// 결재 메인 화면
export const getMainAPI = () => {
  const token = localStorage.getItem("accessToken");
  const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/document/main`;


  return async (dispatch, getState)  => {

    const result = await axios.get(requestURL, {
      headers : {
        Authorization :  "Bearer " + token
      }
    })
        .then(res => res.data)
        .catch(err => console.log(err));

    if(result?.status === 200){
      dispatch({type: GET_DOCUMENT_MAIN, payload: result});
    }

  };
}

export const getList = ({ docStatus ,filter, page, size}) => {

  const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/document/approval/${docStatus}?status=${filter}&page=${page}&size=${size}`;
  const token = localStorage.getItem("accessToken");

  return async (dispatch, getState)  => {

    const result = await axios.get(requestURL,{
      headers : {
        Authorization :  "Bearer " + token
      }
    })
        .then(res => res.data)
        .catch(err => console.log(err));


    // if(result.data.length === 0 || result === ''){
    //   message.error('조회할 내용이 없습니다.')
    //   dispatch({ type: GET_DOCUMENT_LIST,  payload: undefined });
    //   return;
    // }

    if(result.status === 200){
      dispatch({type: GET_DOCUMENT_LIST, payload: result});
    }
  };
}


// 기안문서등록
export const draftRegistAPI = (form, temp)=>{
  const token = localStorage.getItem("accessToken");
  const tempParam = temp ? `?temp=${temp}` : '';


  const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/document/regist/draft${tempParam}`;

  return async (dispatch, getState)  => {

    const result = await axios.post(requestURL, form,{
      headers : {
        Authorization :  "Bearer " + token
      }
    }).then(res => res.data);

    console.log("result:",result)
    if(result.status === 200){
      message.success('결재 상신에 성공했습니다');
      dispatch({type: POST_DRAFT, payload: result});
    }

  };
};
// 휴가 문서 등록

export const vacationRegistAPI = (form, temp)=>{
  const token = localStorage.getItem("accessToken");
  const tempParam = temp ? `?temp=${temp}` : '';
  const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/document/regist/vacation${tempParam}`;

  return async (dispatch, getState)  => {

    const result = await axios.post(requestURL, form,{
      headers : {
        Authorization :  "Bearer " + token
      }
    }).then(res => res.data);

    if(result?.status === 200){
      message.success('휴가신청서 등록완료');
      dispatch({type: POST_VACATION, payload: result});
    }

  };
};

//지출승인서
export const paymentRegistAPI = (form, temp)=>{
  const token = localStorage.getItem("accessToken");
  const tempParam = temp ? `?temp=${temp}` : '';
  const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/document/regist/payment${tempParam}`;

  return async (dispatch, getState)  => {

    const result = await axios.post(requestURL, form,{
      headers : {
        Authorization :  "Bearer " + token
      }
    })
        .then(res => res.data);

    if(result.status === 200){
      message.success('지출승인서 등록완료');
      dispatch({type: POST_PAYMENT, payload: result});
    }
  };
};




//문서세부내용
export const getDocumentDetailAPI = ({documentCode})=>{
  const token = localStorage.getItem("accessToken");
  const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/document/${documentCode}`;

  return async (dispatch, getState)  => {

    const result = await axios.get(requestURL,{
      headers : {
        Authorization :  "Bearer " + token
      }
    })
        .then(res => res.data)
        .catch(err => console.log(err));

    if(result.status === 200){
      dispatch({type: GET_DETAIL, payload: result.data});
    }

  };
};

export const deleteDocumentAPI = ({documentCode})=>{
  const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/document/delete/${documentCode}`;

  return async (dispatch, getState)  => {

    const result = await axios.delete(requestURL)
        .then(res => res.data)
        .catch(err => console.log(err));

    if(result.status === 200){
      message.success(`삭제완료`);
      dispatch({type: DELETE_DOCUMENT, payload: result.data});
    }

  }
}

export const cancelDocumentAPI = ({documentCode})=>{
  const token = localStorage.getItem("accessToken");

  const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/document/cancel/${documentCode}`;
  const headers = {
    Authorization :  "Bearer " + token
  }
  return async (dispatch, getState)  => {

    const result = await axios.patch(requestURL,'',{
      headers:headers
    })
        .then(res => res.data)
        .catch(err => console.log(err));

    if(result.status === 200){
      message.success('결재 취소 완료');
      dispatch({type: CANCEL_DOCUMENT, payload: result.data});
    }
  }
}