import axios from 'axios';
import {GET_TREEVIEW} from "../modules/DepartmentModule";
import { PROTOCOL, SERVER_IP, SERVER_PORT } from './APIConfig';
import { GET_PART_LIST } from '../modules/ScheduleMoudule';
import { PATCH_UPDATE_DEPT, POST_DEPT_INSERT, GET_DEPTALL } from '../modules/DepartmentModule';
import { message } from 'antd';


export const treeviewAPI = ()=>{
  const requestURL = `http://localhost:8989/department/treeview`;

  return async (dispatch, getState)  => {

    const result = await axios.get(requestURL)
        .then(res => res.data)
        .catch(err => console.log(err));

    console.log(result)
    if(result.status === 200){
      dispatch({type: GET_TREEVIEW, payload: result});
    }
  };

}

export const getParticipantList = ()=>{
  const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/department/participantList`;

  return async (dispatch, getState)  => {

    const result = await axios.get(requestURL)
        .then(res => res.data)
        .catch(err => console.log(err));

    if(result?.status === 200){
      dispatch({type: GET_PART_LIST, payload: result});
    }
  };

}




export const updateDeptAPI = ({form}) =>{

  console.log('updateDeptAPI', form);

  const requestURL = `http://localhost:8989/department/save`;

  return async(dispatch, getState) => {

    const result = await axios.put(requestURL, form ,{
      headers:{
        "Accept": "*/*",
        "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
      }
    })

    if(result.status === 200) {
      message.success(result.message);
      dispatch({type: PATCH_UPDATE_DEPT, payload: result});
    }
  }
}


export const insertDeptAPI = (deptName) => {
    console.log("[insertDeptAPI] =========> ");
  
    const requestURL =`http://localhost:8989/department/regist`;

    return async (dispatch, getState) => {

      const result = await fetch(requestURL, {
          method: "POST",
          headers:{
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
      },body: JSON.stringify(deptName)
    })
    .then(response => response.json());

    console.log("[insertDeptAPI] ===> ", result);

      dispatch({ type: POST_DEPT_INSERT, payload: result});
      
    };

}





export const callDeptAllAPI = ({ deptCode }) => {      // 부서만 조회
    
  const requestURL= 'http://localhost:8989/department/dept/list'

  return async (dispatch, getState) => {

      const result = await fetch(requestURL, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Accept" : "*/*",
              // "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
          }
      })
      .then(response => response.json());

      console.log('[EmployeeAPI] callDeptAllAPI RESULT : ' , result);
      if(result.status === 200){
          dispatch({type: GET_DEPTALL, payload: result.data});
      }
  }
}
