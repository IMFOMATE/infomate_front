
import axios from 'axios';
import { 
    GET_SCHEDULE_DETAIL,
    POST_SCHEDULE_REGIT,
} from '../modules/ScheduleMoudule';
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

export const getScheduleDetail = ({scheduleId}) => {

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/schedule/${scheduleId}`;

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL)
                    .then(res => res.data)
                    .catch(err => console.log(err));

        if(result?.status === 200) 
            dispatch({ type: GET_SCHEDULE_DETAIL,  payload: result.data });
        
    };
}

export const postScheduleRegist = ({data}) => {
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/schedule/regist`;


    return async (dispatch, getState) => {
        const result = await axios.post(requestURL, data, {headers:{"Content-Type":'application/json','Accept':'*/*'}})
        // const result = await axios({method:'post',url:requestURL,data:data,headers:{"Content-Type":'application/json','Accept':'*/*'}})
                    .then(res => res)
                    .catch(err => console.log(err));

        if(result?.status === 200){
            dispatch({ type: POST_SCHEDULE_REGIT,  payload: result?.data});
            return document.location.href='/calendar';
            
        } 
        
        toast.error("누락된 필드도 존재합니다.")
    
    };
}
