import axios from "axios";
import {GET_WORK, PATCH_FINISH, POST_ATTEND} from "../modules/WorkModule";
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

    console.log(result)
    if(result.status === 208){
      message.error("이미 출근하셨습니다");
      return;
    }
  };
}


export const finishAPI = () => {
  const token = localStorage.getItem("accessToken");

  const requestURL = `http://localhost:8989/work/finish`;
  const headers = {
    Authorization :  "Bearer " + token

  }

  return async (dispatch, getState)  => {
    console.log()
    const result = await axios.patch(requestURL, '',{
      headers:headers
    })
        .then(res => res.data)
        .catch(err => message.error("근무시간을 충족하지 못했습니다."));


    console.log(result)

    if(result.status === 200){
      message.success("퇴근완료");
      dispatch({type: PATCH_FINISH, payload: result});
    }

    if(result.status === 400){
      message.error("근무시간을 충족하지 못했습니다.");
    }
  };
}


export const getworkAPI = () => {
  const token = localStorage.getItem("accessToken");

  const requestURL = `http://localhost:8989/work/today`;
  const headers = {
    Authorization :  "Bearer " + token
  }

  return async (dispatch, getState)  => {

    const result = await axios.get(requestURL,{
      headers:headers
    })
        .then(res => res.data)
        .catch(err => console.log(err));


    console.log("result.status", result.status)
    console.log("result ", result)
    if(result.status === 200){
      dispatch({type: GET_WORK, payload: result.data});
    }

    if(result.status === 204){
      dispatch({type: GET_WORK, payload: {}});
    }
  };
}


