import axios from "axios";
import {POST_ATTEND} from "../modules/WorkModule";
import { message } from 'antd';


export const attendAPI = () => {
  const token = localStorage.getItem("accessToken");

  const requestURL = `http://localhost:8989/work/attend`;
  const headers = {
    Authorization :  "Bearer " + token

  }

  return async (dispatch, getState)  => {

    const result = await axios.post(requestURL, '',{
      headers:headers
    })
        .then(res => res.data)
        .catch(err => console.log(err));

    if(result.status === 200){
      message.success("출근완료");
      dispatch({type: POST_ATTEND, payload: result});
    }
  };
}


export const FinishAPI = () => {
  const token = localStorage.getItem("accessToken");

  const requestURL = `http://localhost:8989/work/attend`;
  const headers = {
    Authorization :  "Bearer " + token

  }

  return async (dispatch, getState)  => {

    const result = await axios.patch(requestURL, '',{
      headers:headers
    })
        .then(res => res.data)
        .catch(err => console.log(err));

    if(result.status === 200){
      message.success("출근완료");
      dispatch({type: POST_ATTEND, payload: result});
    }
  };
}