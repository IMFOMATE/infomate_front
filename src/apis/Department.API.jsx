import axios from 'axios';
import {GET_TREEVIEW} from "../modules/DepartmentModule";

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