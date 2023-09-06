import {
    GET_DEPTSEARCH,
    GET_EMPLOYEE,
    GET_DEPTALL
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


export const callDeptListAPI = ({currentPage}) => {     // 직원 전체
    
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8989/department/emp/listall?offset=${currentPage}`;
    }else {
        requestURL = `http://localhost:8989/department/emp/listall`;
    }
    
    console.log('[EmployeeAPI] requestURL : ', requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"

            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[EmployeeAPI] callDeptListAPI RESULT : ', result);
            dispatch({ type:GET_DEPTLIST, payload: result.data })
        }
    };
}


export const callDeptAlltAPI = () => {      // 부서만 조회
    
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
            dispatch({type: GET_DEPTALL, payload: result.data});
        }
    }
}



export const callSearchDeptAPI =({search}) => {
    console.log('[EmployeeAPI] callSearchDeptAPI call');

    const requestURL =`http://localhost:8989/department/dept/search?s=${search}`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Constent-Type" : "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        console.log('[EmployeeAPI] callSearchDeptAPI call : ', result);

        dispatch({ type: GET_DEPTLIST , payload: result.data});
    }


}