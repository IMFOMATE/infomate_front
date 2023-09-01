import {
    GET_EMPLOYEE
} from '../modules/EmployeeModule';
import { MEMBER_CODE } from './APIConfig';
import { GET_DEPTLIST } from '../modules/EmployeeModule';


export const callEmployeeInfoAPI = () =>{
    
    const requestURL = `http://localhost:8989/emp/info/${MEMBER_CODE}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "*/*"
            }
        })
        .then(response => response.json());

        console.log('[EmployeeAPI] callEmployeeInfoAPI RESULT : ' , result);
        if(result.status === 200){
            console.log('[EmployeeAPI] callEmployeeInfoAPI SUCCESS');
            dispatch({type: GET_EMPLOYEE, payload: result.data});
        }
    };
}


export const callDeptListAPI = () => {
    
    const requestURL= 'http://localhost:8989/department/emp/list'

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "*/*"
            }
        })
        .then(response => response.json());

        console.log('[EmployeeAPI] callDeptListAPI RESULT : ' , result);
        if(result.status === 200){
            dispatch({type: GET_DEPTLIST, payload: result.data});
        }
    }
}