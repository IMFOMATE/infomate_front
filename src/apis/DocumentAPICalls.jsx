import axios from 'axios';
import {
  GET_DOCUMENT_APRPROVALLIST, GET_DOCUMENT_CREDIT,
  GET_DOCUMENT_MAIN, GET_DOCUMENT_REFLIST, POST_DRAFT,
} from '../modules/approval/DocumentModuels';
import {useNavigate} from "react-router-dom";

// 결재 메인 화면
export const getMainAPI = ({memberCode}) => {

  const requestURL = `http://localhost:8989/document/main/${memberCode}`;

  return async (dispatch, getState)  => {

    const result = await axios.get(requestURL)
        .then(res => res.data)
        .catch(err => console.log(err));


    console.log(result)
    if(result.status === 200){
      dispatch({type: GET_DOCUMENT_MAIN, payload: result});
    }

  };
}

//기안문서
export const getApprovalList = ({filter, memberCode, page}) => {

  const requestURL = `http://localhost:8989/document/approval/${memberCode}?page=${page}$status=${filter}`;

  return async (dispatch, getState)  => {

    const result = await axios.get(requestURL)
        .then(res => res.data)
        .catch(err => console.log(err));

    if(result.status === 200){
       dispatch({type: GET_DOCUMENT_APRPROVALLIST, payload: result.data});
    }

  };
}

//참조문서
export const getRefList = ({filter, memberCode, page}) => {

  const requestURL = `http://localhost:8989/ref/viewer/${memberCode}?page=${page}$status=${filter}`;

  return async (dispatch, getState)  => {

    const result = await axios.get(requestURL)
        .then(res => res.data)
        .catch(err => console.log(err));

    if(result.status === 200){
      dispatch({type: GET_DOCUMENT_REFLIST, payload: result.data});
    }

  };
}

//결재대기문서
export const getCreditList = ({ memberCode, page}) => {

  const requestURL = `http://localhost:8989/document/credit/${memberCode}?page=${page}`;

  return async (dispatch, getState)  => {

    const result = await axios.get(requestURL)
        .then(res => res.data)
        .catch(err => console.log(err));

    if(result.status === 200){
      dispatch({type: GET_DOCUMENT_CREDIT, payload: result.data});
    }

  };
}


//문서등록
export const draftRegistAPI = ({form})=>{

  const requestURL = `http://localhost:8989/document/regist/draft`;

  return async (dispatch, getState)  => {
    const result = await axios.post(requestURL,form,
        {headers:{Accept:'*/*'}})
        .then(res => res.data)

    if(result.status === 200){
      dispatch({type: POST_DRAFT, payload: result.data});
    }

  };
};