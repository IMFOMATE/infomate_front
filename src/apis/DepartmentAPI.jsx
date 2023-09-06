import axios from 'axios';
import {GET_TREEVIEW} from "../modules/DepartmentModule";
import { PROTOCOL, SERVER_IP, SERVER_PORT } from './APIConfig';
import { GET_PART_LIST } from '../modules/ScheduleMoudule';

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


