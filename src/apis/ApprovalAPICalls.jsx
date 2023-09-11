import axios from "axios";
import {POST_APPROVE, POST_REJECT, POST_TEMP} from "../modules/approval/ApprovalModuels";


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
    IsSave: tempIsSave
  }


  return async (dispatch, getState) => {

    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }

    const result = await axios.post(
        requestURL,
        formData,
        {headers: headers,
        params:params}
    )
        .then(res => res.data)
        .catch(err => console.log(err));

    if (result.status === 200) {
      dispatch({type: POST_TEMP, payload: result});
    }
  };
};