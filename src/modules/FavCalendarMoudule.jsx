import { handleActions } from 'redux-actions';

const initialState = {};

export const GET_FAV_CALENDAR_FINDALL = 'favCalendar/GET_FINDALL'
export const GET_FAV_CALENDAR_LIST = 'favCalendar/GET_LIST'
export const GET_FAV_CALENDAR_FOLLOWER = 'favCalendar/GET_FOLLOWER'

export const POST_FAV_CALENDAR_REGIT = 'favCalendar/POST_REGIT'
export const PUT_FAV_CALENDAR_UPDATE = 'favCalendar/PUT'
export const PATCH_FAV_CALENDAR_UPDATE = 'favCalendar/PATCH'
export const PATCH_FAV_CALENDAR_STATE_UPDATE = 'favCalendar/PATCH'
export const DELETE_FAV_CALENDAR = 'favCalendar/DELETE'
export const PURGE_FAV_CALENDAR = 'PURGE_FAV_CALENDAR'

const favCalendarReducer = handleActions({
        [PURGE_FAV_CALENDAR] : (state) => {
            return initialState;
        },
        [GET_FAV_CALENDAR_LIST]: (state, { payload }) => ({   
            ...state, [GET_FAV_CALENDAR_LIST]: payload
        }),
        [GET_FAV_CALENDAR_FINDALL]: (state, { payload }) => ({
            ...state, [GET_FAV_CALENDAR_FINDALL]: payload 
        }),
        [GET_FAV_CALENDAR_FOLLOWER]: (state, { payload }) => ({
            ...state, [GET_FAV_CALENDAR_FOLLOWER]: payload
        }),
        [POST_FAV_CALENDAR_REGIT]: (state, { payload }) => ({
            ...state, [POST_FAV_CALENDAR_REGIT]: payload
        }),
        [PATCH_FAV_CALENDAR_UPDATE]: (state, { payload }) => ({
            ...state, [PATCH_FAV_CALENDAR_UPDATE]: payload
        }),
        [PATCH_FAV_CALENDAR_STATE_UPDATE]: (state, { payload }) => ({
            ...state, [PATCH_FAV_CALENDAR_STATE_UPDATE]: payload
        }),
        
        [DELETE_FAV_CALENDAR]: (state, { payload }) => ({
            ...state, [DELETE_FAV_CALENDAR]: payload
        }),
    }, initialState
);


export default favCalendarReducer;