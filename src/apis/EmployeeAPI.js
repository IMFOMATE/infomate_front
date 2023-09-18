import {
    // GET_DEPTSEARCH,
    GET_EMPLOYEE,
    GET_DEPTALL,
    GET_EMPLIST,
    GET_DEPTLIST
} from '../modules/EmployeeModule';
import {Pageable, PROTOCOL, SERVER_IP, SERVER_PORT} from './APIConfig';
// import { GET_DEPTLIST, GET_EMPLIST } from '../modules/EmployeeModule';
import axios from 'axios';
import { message } from 'antd';


//사용함.
export const callEmployeeInfoAPI = ({memberCode}) =>{
    
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/emp/info/${memberCode}`;

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

// 미사용 정리 필요
export const callDeptListAPI = ({currentPage}) => {     // 직원 전체
    
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/department/emp/listall?offset=${currentPage}`;
    }else {
        requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/department/emp/listall`;
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


export const callDeptAllAPI = ({ deptCode }) => {      // 부서만 조회
    
    const requestURL= `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/department/dept/list`;

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



// export const callSearchDeptAPI =({search}) => {
//     console.log('[EmployeeAPI] callSearchDeptAPI call');

//     const requestURL =`http://localhost:8989/department/dept/search?s=${search}`;

//     return async (dispatch, getState) => {
        
//         const result = await fetch(requestURL, {
//             method: "GET",
//             headers: {
//                 "Constent-Type" : "application/json",
//                 "Accept": "*/*"
//             }
//         })
//         .then(response => response.json());

//         console.log('[EmployeeAPI] callSearchDeptAPI call : ', result);

//         dispatch({ type: GET_DEPTLIST , payload: result.data});
//     }


// }


//  직원 전체 조회 사용중
export const getEmpListAPI = ({page, findSearch}) => {
    const {pageOption, sort} = Pageable({page:page.number, size:page.size, sortId: page.sortId, sortDirection: page.sortDirection});
    console.log('findSearch check ======> ', findSearch);

    let requestURL = '';
    if(findSearch){
      requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/department/openEmpList?${pageOption}&${sort}&s=${findSearch}`;
    } else {
        requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/department/openEmpList?${pageOption}&${sort}`;
    }


    return async (dispatch, getState) => {
        const result = await axios.get(requestURL, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                "Accept": "*/*"
            }
        })
        .then (res => res.data)
        .catch(res => res)
        
        console.log('[EmployeeAPI]===========result값',result);
        if(result === undefined || result === ''){
            message.error('조회할 내용이 없습니다.')
            dispatch({ type: GET_EMPLIST, payload: undefined});
            return;
        }
        if(result?.status === 200){
            dispatch({ type: GET_EMPLIST, payload: result})
            return;
        }
        if(result?.response.status === 500){
            message.error('조회할 내용이 없습니다.')
            return;
        }

        console.log("=============값" , result);
        console.log("findSearch=========" , findSearch);
    }
}