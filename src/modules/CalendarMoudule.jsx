import { handleActions } from 'redux-actions';

const initialState = {};

export const GET_CALENDAR_FINDALL = 'calendar/GET_FINDALL'
export const GET_CALENDAR_LIST = 'calendar/GET_LIST'
export const GET_CALENDAR_FIND_ALL_PUBLIC = 'Calendar/GET_FIND_ALL_PUBLIC'
export const POST_CALENDAR_REGIT = 'calendar/POST_REGIT'
export const PUT_CALENDAR_UPDATE = 'calendar/PUT'
export const PATCH_CALENDAR_UPDATE = 'calendar/PATCH'
export const DELETE_CALENDAR = 'calendar/DELETE'
export const PURGE_CALENDAR = 'PURGE_CALENDAR'

const calendarReducer = handleActions({
        [PURGE_CALENDAR] : (state) => {
            return initialState;
        },
        [GET_CALENDAR_LIST]: (state, { payload }) => ({   
            ...state, [GET_CALENDAR_LIST]: payload
        }),
        [GET_CALENDAR_FIND_ALL_PUBLIC]: (state, { payload }) => ({
            ...state, [GET_CALENDAR_FIND_ALL_PUBLIC]: payload 
        }),
        [GET_CALENDAR_FINDALL]: (state, { payload }) => ({
            ...state, [GET_CALENDAR_FINDALL]: payload 
        }),
        [POST_CALENDAR_REGIT]: (state, { payload }) => ({
            ...state, [POST_CALENDAR_REGIT]: payload
        }),
        [PUT_CALENDAR_UPDATE]: (state, { payload }) => ({
            ...state, [PUT_CALENDAR_UPDATE]: payload
        }),
        [PATCH_CALENDAR_UPDATE]: (state, { payload }) => ({
            ...state, [PATCH_CALENDAR_UPDATE]: payload
        }),
        [DELETE_CALENDAR]: (state, { payload }) => ({
            ...state, [DELETE_CALENDAR]: payload
        }),
    }, initialState
);


export default calendarReducer;