import axios from 'axios';
import { 
    GET_SCHEDULE_DETAIL,
    POST_SCHEDULE_REGIT,
    PATCH_SCHEDULE,
    DELETE_SCHEDULE,
} from '../modules/ScheduleMoudule';
import { PROTOCOL, SERVER_IP, SERVER_PORT, MEMBER_CODE} from './APIConfig';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { message } from 'antd';

dayjs.extend(utc);

export const getScheduleDetail = ({scheduleId}) => {

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/schedule/${MEMBER_CODE}/${scheduleId}`;

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL)
                    .then(res => res.data)
                    .catch(err => err);

        if(result?.status === 200) {
            dispatch({ type: GET_SCHEDULE_DETAIL,  payload: result });
            return ;
        }
        
        message.error("알수 없는 에러가 발생했습니다.")    
    };
}

export const postScheduleRegist = ({data}) => {
    data = {...data, memberCode: MEMBER_CODE}    
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/schedule/regist/${MEMBER_CODE}`;
    
    data = {...data, startDate: dayjs(data.startDate).format('YYYY-MM-DDTHH:MM:ss'), endDate: dayjs(data.endDate).format('YYYY-MM-DDTHH:MM:ss')}
    return async (dispatch, getState) => {
        const result = await axios.post(requestURL, data, {headers:{"Content-Type":'application/json','Accept':'*/*'}})
                        .then(res => res)
                        .catch(err => err);

        if(result?.status === 200){
            message.success("일정이 등록 되었습니다.")
            dispatch({ type: POST_SCHEDULE_REGIT,  payload: result});
            console.log('1');
            return ;
        } 
        
        message.error("누락된 필드가 존재합니다.")
    
    };
}

export const patchScheduleUpdate = ({data}) => {
    data = {...data, memberCode: MEMBER_CODE}

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/schedule/update/${MEMBER_CODE}`;
    
    return async (dispatch, getState) => {
        const result = await axios.patch(requestURL, data, {headers:{"Content-Type":'application/json','Accept':'*/*'}})
                        .then(res => res)
                        .catch(err => console.log(err));

        if(result?.status === 200){
            dispatch({ type: PATCH_SCHEDULE,  payload: result});
            return message.success("일정이 변경 되었습니다.");  
        }
    
        message.error("변경에 실패 했습니다")
    
    };
}


export const deleteSchedule = ({scheduleId}) => {

    console.log(scheduleId);
    
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/schedule/delete/${scheduleId}/${MEMBER_CODE}`;
    
    
    return async (dispatch, getState) => {
        const result = await axios.delete(requestURL, {headers:{"Content-Type":'application/json','Accept':'*/*'}})
                        .then(res => res)
                        .catch(err => err);

        if(result?.status === 200){
            message.success("일정이 삭제 되었습니다.")
            dispatch({ type: DELETE_SCHEDULE,  payload: result});
            return ;
        } 
        
        message.error("변경에 실패 했습니다")
    
    };
}