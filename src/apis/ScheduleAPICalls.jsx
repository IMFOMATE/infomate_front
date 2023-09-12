import axios from 'axios';
import { 
    GET_SCHEDULE_DETAIL,
    POST_SCHEDULE_REGIT,
    PATCH_SCHEDULE,
    DELETE_SCHEDULE,
    GET_SCHEDULE_COUNT,
    GET_SCHEDULE_REMINDER,
} from '../modules/ScheduleMoudule';
import { PROTOCOL, SERVER_IP, SERVER_PORT } from './APIConfig';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { message } from 'antd';

dayjs.extend(utc);


export const getScheduleDayPerCount = ({startDay, endDay}) => {

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/schedule/dayCount?startDay=${startDay.format('YYYY-MM-DD')}&endDay=${endDay.format('YYYY-MM-DD')}`;

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL,{headers: {
            "Accept": "*/*",
            "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
        }})
                    .then(res => res.data)
                    .catch(err => err);

        if(result?.status === 200) {
            dispatch({ type: GET_SCHEDULE_COUNT,  payload: result });
            return ;
        }
        
        message.error("알수 없는 에러가 발생했습니다.")    
    };
}

export const getScheduleReminder = () => {

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/schedule/reminder`;

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL,{headers: {
                        "Accept": "*/*",
                        "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                    }}).then(res => res.data);

        if(result?.status === 200) {
            dispatch({ type: GET_SCHEDULE_REMINDER,  payload: result });
            return ;
        }
        
        message.error("알수 없는 에러가 발생했습니다.")    
    };
}

export const getScheduleDetail = ({scheduleId}) => {

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/schedule/${scheduleId}`;

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL, {headers: {
                        "Accept": "*/*",
                        "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                    }}).then(res => res.data);

        if(result?.status === 200) {
            dispatch({ type: GET_SCHEDULE_DETAIL,  payload: result });
            return ;
        }
        
        message.error("알수 없는 에러가 발생했습니다.")    
    };
}

export const postScheduleRegist = ({data}) => {

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/schedule/regist`;
    
    data = {...data, startDate: dayjs(data.startDate).format('YYYY-MM-DDTHH:mm:ss'), endDate: dayjs(data.endDate).format('YYYY-MM-DDTHH:mm:ss')}

    if(data?.participantList?.length > 0) 
        data = {...data, participantList: [...data.participantList?.map(item => ({memberCode: item.member.memberCode}))]}

    return async (dispatch, getState) => {
        const result = await axios.post(requestURL, data, {headers: {
                            "Accept": "*/*",
                            "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                        }}).then(res => res);

        if(result?.status === 200){
            message.success("일정이 등록 되었습니다.")
            dispatch({ type: POST_SCHEDULE_REGIT,  payload: result});

            return ;
        } 
        
        message.error("누락된 필드가 존재합니다.")
    
    };
}

export const patchScheduleUpdate = ({data}) => {

    if(data?.participantList?.length > 0) 
        data = {...data, participantList: [...data.participantList.map(item => ({memberCode: item.member.memberCode, scheduleCode: data.id}))]}
    
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/schedule/update`;
    
    return async (dispatch, getState) => {
        const result = await axios.patch(requestURL, data,{headers: {
                            "Accept": "*/*",
                            "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                        }}).then(res => res);

        if(result?.status === 200){
            dispatch({ type: PATCH_SCHEDULE,  payload: result});
            return message.success("일정이 변경 되었습니다.");  
        }
    
        message.error("변경에 실패 했습니다")
    
    };
}


export const deleteSchedule = ({scheduleId}) => {

    console.log(scheduleId);
    
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/schedule/delete/${scheduleId}`;
    
    
    return async (dispatch, getState) => {
        const result = await axios.delete(requestURL, {headers:{
                            "Accept": "*/*",
                            "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                        }}).then(res => res);
        
        if(result?.status === 200){
            message.success("일정이 삭제 되었습니다.")
            dispatch({ type: DELETE_SCHEDULE,  payload: result});
            return ;
        }
        
        if(result?.status === 400){
            message.error(result.message)
            dispatch({ type: DELETE_SCHEDULE,  payload: result});
            return ;
        }
        
        message.error("변경에 실패 했습니다")
    };
}