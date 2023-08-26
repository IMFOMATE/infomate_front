
import axios from 'axios';
import { 
    GET_CALENDAR_FINDALL,
    GET_CALENDAR_LIST,
    PATCH_CALENDAR_UPDATE,
    POST_CALENDAR_REGIT,
} from '../modules/CalendarMoudule';

import { PROTOCOL, SERVER_IP, SERVER_PORT, MEMBER_CODE} from './APIConfig';
import { message } from 'antd';

// ### 팔로우 가능 캘린더 리스트
// GET http://localhost:8091/calendar/openCalendarList

// ### 캘린더 상세 조회 한개 조회
// GET http://localhost:8091/calendar/5

// ### 캘린더 삭제
// DELETE http://localhost:8091/calendar/delete/5

// ### 대시보드 용 일별 일정 개수 표시
// GET http://localhost:8091/calendar/summary/2


export const getCalendarFindAllAPI = () => {

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/calendar/list/${MEMBER_CODE}`;

    return async (dispatch, getState) => {
        
        const result = await axios.get(requestURL)
                    .then(res => res.data);
        
        if(result.status === 200) 
            dispatch({ type: GET_CALENDAR_FINDALL,  payload: result });
        
    };
}

export const getCalendarListAPI = () => {

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/calendar/mylist/${MEMBER_CODE}`;

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL)
                    .then(res => res.data)
                    
        if(result.status === 200) 
            dispatch({ type: GET_CALENDAR_LIST,  payload: result });
        
    };
}

export const postCalendarRegit = ({data}) => {

    data = {...data, memberCode: MEMBER_CODE};
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/calendar/regist`;

    return async (dispatch, getState) => {
        const result = await axios.post(requestURL, data, {headers:{"Content-Type":'application/json',Accept:'*/*'}})
                    .then(res => res.data)
        
        if(result.status === 200){
            message.success('등록에 성공했습니다.');
            dispatch({ type: POST_CALENDAR_REGIT,  payload: result });
        }
        
    };
}

export const patchCalendarUpdate = ({data}) => {
    data = {...data, memberCode: MEMBER_CODE}
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/calendar/update`;

    return async (dispatch, getState) => {
        const result = await axios.patch(requestURL, data, {headers:{"Content-Type":'application/json',Accept:'*/*'}})
                    .then(res => res.data)
                    .catch(e => console.log(e));
        
        if(result.status === 200){
            console.log(result);
            message.success('수정에 성공했습니다.');
            return dispatch({ type: PATCH_CALENDAR_UPDATE,  payload: result });
        }
        
        message.success('수정에 실패했습니다.');
    };
}


export const patchDefaultCalendarUpdate = ({data}) => {
    data = {...data, memberCode: MEMBER_CODE}
    
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/calendar/updateDafault`;
    return async (dispatch, getState) => {
        const result = await axios.patch(requestURL, data, {headers:{"Content-Type":'application/json',Accept:'*/*'}})
                    .then(res => res.data)
                    .catch(e => console.log(e));
        
        if(result.status === 200){
            message.success('기본 캘린더가 변경되었습니다.');
            return dispatch({ type: PATCH_CALENDAR_UPDATE,  payload: result });
        }
        
        message.success('수정에 실패했습니다.');
    };
}