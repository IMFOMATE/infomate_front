import axios from 'axios';
import { 
    DELETE_CALENDAR,
    GET_CALENDAR_FINDALL,
    GET_CALENDAR_FIND_ALL_PUBLIC,
    GET_CALENDAR_LIST,
    PATCH_CALENDAR_UPDATE,
    POST_CALENDAR_REGIT,
} from '../modules/CalendarMoudule';

import { PROTOCOL, SERVER_IP, SERVER_PORT, Pageable} from './APIConfig';
import { message } from 'antd';

export const getCalendarFindAllAPI = () => {
 
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/calendar/list`;

    return async (dispatch, getState) => {
        
        const result = await axios.get(requestURL,{headers:{
            "Accept": "*/*",
            "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
        }})
                    .then(res => res.data);
        
        if(result.status === 200) 
            dispatch({ type: GET_CALENDAR_FINDALL,  payload: result });
        
    };
}

export const getCalendarListAPI = () => {

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/calendar/mylist`;

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL,{headers: {
                        "Accept": "*/*",
                        "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                    }}).then(res => res.data)
                    
        if(result.status === 200) {
            dispatch({ type: GET_CALENDAR_LIST,  payload: result });
            return ;
        }
    };
}

export const getCalendarPublicListAPI = ({page}) => {

    const {pageOption, sort} = Pageable({page:page.number, size:page.size, sortId: page.sortId, sortDirection: page.sortDirection});
    
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/calendar/openCalendarList?${pageOption}&${sort}`;
    

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL,{headers:{
            "Accept": "*/*",
            "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
        }})
                    .then(res => res.data)
                    .catch(res => res)

        if(result === undefined || result === ''){
            message.error('조회할 내용이 없습니다.')
            dispatch({ type: GET_CALENDAR_FIND_ALL_PUBLIC,  payload: undefined });
            return;
        }
        if(result?.status === 200) {
            dispatch({ type: GET_CALENDAR_FIND_ALL_PUBLIC,  payload: result });
            return;
        }
        if(result?.response.status === 500) {
            message.error('조회할 내용이 없습니다.')
            return;
        }
        
    };
}

export const postCalendarRegit = ({data}) => {

    
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/calendar/regist`;

    return async (dispatch, getState) => {
        const result = await axios.post(requestURL, data, {headers:{
            "Accept": "*/*",
            "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
        }})
                    .then(res => res.data)
        
        if(result.status === 200){
            message.success(result.message);
            dispatch({ type: POST_CALENDAR_REGIT,  payload: result });
            return ;
        }
        
    };
}

export const patchCalendarUpdate = ({data}) => {
    
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/calendar/update`;

    return async (dispatch, getState) => {
        const result = await axios.patch(requestURL, data, {headers:{
            "Accept": "*/*",
            "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
        }})
                    .then(res => res.data)
                    .catch(e => console.log(e));
        
        if(result?.status === 200){
            message.success(result.message);
            dispatch({ type: PATCH_CALENDAR_UPDATE,  payload: result });
            return ;
        }
        
        message.success('수정에 실패했습니다.');
    };
}


export const patchDefaultCalendarUpdate = ({data}) => {
    
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/calendar/updateDafault`;
    return async (dispatch, getState) => {
        const result = await axios.patch(requestURL, data, {headers: {
            "Accept": "*/*",
            "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
        }})
                    .then(res => res.data)
                    .catch(e => console.log(e));
        
        if(result.status === 200){
            message.success(result.message);
            dispatch({ type: PATCH_CALENDAR_UPDATE,  payload: result });
            return ;
        }
        
        message.error('수정에 실패했습니다.');
    };
}

export const patchChangeCalendarIndexNo = ({data}) => {    

    console.log(data);
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/calendar/changeIndexNo`;
    return async (dispatch, getState) => {
        const result = await axios.patch(requestURL, data, {headers: {
            "Accept": "*/*",
            "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
        }})
                    .then(res => res.data)
                    .catch(e => console.log(e));
        
        if(result?.status === 200){
            message.success(result.message);
            dispatch({ type: PATCH_CALENDAR_UPDATE,  payload: result });
            return ;
        }
        
        message.error('수정에 실패했습니다.');
    };
}


export const deleteCalendar = ({scheduleId}) => {    
    
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/calendar/delete/${scheduleId}`;
    return async (dispatch, getState) => {
        const result = await axios.delete(requestURL, {headers: {
            "Accept": "*/*",
            "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
        }})
                    .then(res => res.data)
                    .catch(e => console.log(e));
        
        if(result?.status === 200){
            message.success(result.message);
            dispatch({ type: DELETE_CALENDAR,  payload: result });
            return ;
        }
        
        message.error('삭제에 실패했습니다.');
    };
}