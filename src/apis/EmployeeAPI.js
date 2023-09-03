import {
    GET_EMPLOYEE
} from '../modules/EmployeeModule';
import { MEMBER_CODE } from './APIConfig';


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