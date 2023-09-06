
import axios from 'axios';
import { 
    GET_FAV_CALENDAR_FINDALL,
    POST_FAV_CALENDAR_REGIT, 
    DELETE_FAV_CALENDAR, 
    GET_FAV_CALENDAR_FOLLOWER,
    PATCH_FAV_CALENDAR_STATE_UPDATE
} from '../modules/FavCalendarMoudule';

import { PROTOCOL, SERVER_IP, SERVER_PORT, MEMBER_CODE, Pageable} from './APIConfig';
import { message } from 'antd';

export const getFavCalendarfollowAllAPI = ({page}) => {

    const {pageOption, sort} = Pageable({page:page.number, size:page.size, sortId: page.sortId, sortDirection: page. sortDirection});

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/calendar/favorite/follow?${pageOption}&${sort}`;

    return async (dispatch, getState) => {
        
        const result = await axios.get(requestURL,{headers: {
            "Accept": "*/*",
            "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
        }})
                    .then(res => res.data);
        
        if(result.status === 200) 
            dispatch({ type: GET_FAV_CALENDAR_FINDALL,  payload: result });
    };
}

export const getFavCalendarFollwerAPI = ({page}) => {

    const {pageOption, sort} = Pageable({page:page.number, size:page.size, sortId: page.sortId, sortDirection: page. sortDirection});
    
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/calendar/favorite/followerList?${pageOption}&${sort}`;

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL,{headers: {
            "Accept": "*/*",
            "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
        }})
                    .then(res => res.data)
                    
        if(result.status === 200) {
            dispatch({ type: GET_FAV_CALENDAR_FOLLOWER,  payload: result });
            return ;
        }
    };
}

export const postFavCalendarRegit = ({data}) => {
    
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/calendar/favorite/follwer/regist`;

    return async (dispatch, getState) => {
        const result = await axios.post(requestURL, data, {headers: {
            "Accept": "*/*",
            "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
        }})
                    .then(res => res.data)
                    .catch(err => err);
        
        if(result.status === 200){
            message.success(result.message);
            dispatch({ type: POST_FAV_CALENDAR_REGIT,  payload: result });
            return ;
        }
        if(result.status === 208){
            message.error(result.data)
            return;
        } 
        message.error('등록에 실패했습니다.');
    };
}

export const patchFavCalendarStateUpdate = ({data}) => {

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/calendar/favorite/follower`;
    
    return async (dispatch, getState) => {
        const result = await axios.patch(requestURL, data, {headers: {
            "Accept": "*/*",
            "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
        }})
                    .then(res => res.data)
                    .catch(e => console.log(e));
        
        if(result.status === 200){
            message.success(result.message);
            dispatch({ type: PATCH_FAV_CALENDAR_STATE_UPDATE,  payload: result });
            return ;
        }
        
        message.error('수정에 실패했습니다.');
    };
}

export const deleteFavCalendar = ({data}) => {    
    
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/calendar/favorite/DeleteFollowCalendar`;

    return async (dispatch, getState) => {
        const result = await axios.delete(requestURL, {data}, {headers: {
            "Accept": "*/*",
            "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
        }})
                    .then(res => res.data)
                    .catch(e => console.log(e));
        
        if(result.status === 200){
            message.success(result.message);
            dispatch({ type: DELETE_FAV_CALENDAR,  payload: result });
            return ;
        }
        
        message.error('삭제에 실패했습니다.');
    };
}