import axios from 'axios';
import {
  GET_DOCUMENT_MAIN,
} from '../modules/approval/DocumentModuels';

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
export const getApprovalList = ({memberCode}) => {

  const requestURL = `http://localhost:8989/document/approval/${memberCode}`;

  return async (dispatch, getState)  => {

    const result = await axios.get(requestURL)
        .then(res => res.data)
        .catch(err => console.log(err));

    if(result.status === 200){
       dispatch({type: GET_DOCUMENT_MAIN, payload: result.data});
    }

  };
}
