
import axios from 'axios';
import { 
    GET_CALENDAR_FINDALL,
    GET_CALENDAR_LIST,
    POST_CALENDAR_REGIT,
} from '../modules/CalendarMoudule';

import { PROTOCOL, SERVER_IP, SERVER_PORT} from './APIConfig';
import { toast } from 'react-hot-toast';


// ### 일정 등록용 캘린더 리스트 조회
// GET http://localhost:8091/calendar/mylist/2

// ### 팔로우 가능 캘린더 리스트
// GET http://localhost:8091/calendar/openCalendarList

// ### 캘린더 상세 조회 한개 조회
// GET http://localhost:8091/calendar/5

// ### 캘린더 삭제
// DELETE http://localhost:8091/calendar/delete/5

// ### 대시보드 용 일별 일정 개수 표시
// GET http://localhost:8091/calendar/summary/2


export const getCalendarFindAllAPI = ({memberCode}) => {

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/calendar/list/${memberCode}`;

    return async (dispatch, getState) => {
        
        const result = await axios.get(requestURL)
                    .then(res => res.data)
                    .catch(err => console.log(err));

        if(result.status === 200) 
            dispatch({ type: GET_CALENDAR_FINDALL,  payload: result });
        
    };
}

export const getCalendarListAPI = ({memberCode}) => {

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/calendar/mylist/${memberCode}`;

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL)
                    .then(res => res.data)
                    .catch(err => console.log(err));

        
        if(result.status === 200) 
            dispatch({ type: GET_CALENDAR_LIST,  payload: result });
        
    };
}

export const postCalendarRegit = ({data}) => {
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/calendar/regist`;

    return async (dispatch, getState) => {
        const result = await axios.post(requestURL, data, {headers:{"Content-Type":'application/json',Accept:'*/*'}})
                    .then(res => res.data)
                    .catch(err => console.log(err));
                    
        
        if(result.status === 200){
            toast.success('등록에 성공했습니다.');
            dispatch({ type: POST_CALENDAR_REGIT,  payload: result });
        }
        
    };
}
