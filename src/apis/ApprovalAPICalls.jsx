import axios from "axios";
import {POST_APPROVE, POST_REJECT, POST_TEMP} from "../modules/approval/ApprovalModuels";
import {message} from "antd";


export const rejectAPI = ({fetchData}) => {
  const token = localStorage.getItem("accessToken");

  const requestURL = `http://localhost:8989/approval/reject`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: "Bearer " + token

  }

  return async (dispatch, getState) => {

    const result = await axios.patch(requestURL, fetchData, {
      headers: headers
    })
        .then(res => res.data)
        .catch(err => console.log(err));

    if (result.status === 200) {
      message.success('결재 반려했습니다.');
      dispatch({type: POST_REJECT, payload: result});
    }
  };
}

export const approvalAPI = ({fetchData}) => {
  const token = localStorage.getItem("accessToken");
  const requestURL = `http://localhost:8989/approval/approve`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: "Bearer " + token
  }
  return async (dispatch, getState) => {

    const result = await axios.patch(
        requestURL,
        fetchData,
        {headers: headers})
        .then(res => res.data)
        .catch(err => console.log(err));

    if (result.status === 200) {
      message.success('결재 완료');
      dispatch({type: POST_APPROVE, payload: result});
    }
  };
}
export const tempAPI = (formData, type, docId, tempIsSave) => {
  const token = localStorage.getItem("accessToken");
  const requestURL = `http://localhost:8989/document/temp/${type}/${docId ?? null}`;

  const headers = {
    Authorization: "Bearer " + token
  }
  const params = {
    isSave: tempIsSave
  }


  return async (dispatch, getState) => {


    const result = await axios.patch(
        requestURL,
        formData,
        {headers: headers,
        params:params}
    )
        .then(res => res.data)
        .catch(err => console.log(err));

    if (result.status === 200) {
      params.isSave ? message.success('결재 상신에 성공했습니다') : message.success('임시저장 완료');
      dispatch({type: POST_TEMP, payload: result});
    }
  };
};