import axios from "axios";
import {POST_APPROVE, POST_REJECT} from "../modules/approval/ApprovalModuels";


export const rejectAPI = ({fetchData}) => {

  const requestURL = `http://localhost:8989/approval/reject`;
  const headers = {
    'Content-Type' : 'application/json',
  }

    return async (dispatch, getState)  => {

    const result = await axios.patch(requestURL,fetchData, {
      headers:headers
    })
        .then(res => res.data)
        .catch(err => console.log(err));

      if(result.status === 200){
        dispatch({type: POST_REJECT, payload: result});
      }
  };
}

export const approvalAPI = ({fetchData}) => {

  console.log(fetchData)
  const requestURL = `http://localhost:8989/approval/approve`;
  const headers = {
    'Content-Type' : 'application/json',
  }
  return async (dispatch, getState)  => {

    const result = await axios.patch(
        requestURL,
        fetchData,
        {headers: headers})
        .then(res => res.data)
        .catch(err => console.log(err));

    if(result.status === 200){
      dispatch({type: POST_APPROVE, payload: result});
    }
  };


}