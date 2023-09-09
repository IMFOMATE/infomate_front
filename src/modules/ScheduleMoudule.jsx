import { createActions, handleActions } from 'redux-actions';

const initialState = [];

export const GET_SCHEDULE_FINDALL = 'SCHEDULE/GET_FINDALL'
export const GET_SCHEDULE_DETAIL = 'SCHEDULE/GET_DETAIL'
export const GET_SCHEDULE_COUNT = 'SCHEDULE/GET_DAYCOUNT'
export const GET_SCHEDULE_REMINDER = 'SCHEDULE/GET_REMINDER'
export const POST_SCHEDULE_REGIT = 'SCHEDULE/POST_REGIT'
export const PATCH_SCHEDULE = 'SCHEDULE/PATCH'
export const PUT_SCHEDULE = 'SCHEDULE/PUT'
export const DELETE_SCHEDULE = 'SCHEDULE/DELETE'
export const GET_PART_LIST = 'DEPARTMENT/GET_PART_LIST'
export const PURGE_SCHEDULE = 'PURGET_SCHEDULE'


const actions = createActions({
    [GET_SCHEDULE_DETAIL]: () => {},
    [POST_SCHEDULE_REGIT]: () => {},
    [PATCH_SCHEDULE]: () => {},
    [DELETE_SCHEDULE]: () => {}
});

const scheduleReducer = handleActions({
        [PURGE_SCHEDULE] : (state) => {
            return initialState;
        },
        [GET_SCHEDULE_DETAIL]: (state, { payload }) => ({
           ...state, [GET_SCHEDULE_DETAIL] : payload
        }),
        [GET_SCHEDULE_COUNT]: (state, { payload }) => ({
            ...state, [GET_SCHEDULE_COUNT] : payload
        }),
        [GET_SCHEDULE_REMINDER]: (state, { payload }) => ({
            ...state, [GET_SCHEDULE_REMINDER] : payload
        }),
        [POST_SCHEDULE_REGIT]: (state, { payload }) => ({
            ...state, [POST_SCHEDULE_REGIT] : payload
        }),
        [PATCH_SCHEDULE]: (state, { payload }) => ({
            ...state, [PATCH_SCHEDULE] : payload
        }),
        [DELETE_SCHEDULE]: (state, { payload }) => ({
            ...state, [DELETE_SCHEDULE] : payload
        }),
        [GET_PART_LIST]: (state, { payload }) => ({
            ...state, [GET_PART_LIST] : payload
        }),
    }, initialState
);

export default scheduleReducer;