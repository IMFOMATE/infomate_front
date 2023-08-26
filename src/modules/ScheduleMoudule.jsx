import { createActions, handleActions } from 'redux-actions';

const initialState = [];

export const GET_SCHEDULE_FINDALL = 'SCHEDULE/GET_FINDALL'
export const GET_SCHEDULE_DETAIL = 'SCHEDULE/GET_DETAIL'
export const POST_SCHEDULE_REGIT = 'SCHEDULE/POST_REGIT'
export const PATCH_SCHEDULE = 'SCHEDULE/PATCH'
export const PUT_SCHEDULE = 'SCHEDULE/PUT'
export const DELETE_SCHEDULE = 'SCHEDULE/DELETE'


const scheduleReducer = handleActions({
        [GET_SCHEDULE_DETAIL]: (state, { payload }) => {
            return payload;
        },
        [POST_SCHEDULE_REGIT]: (state, { payload }) => {
            return payload;
        },
        [PATCH_SCHEDULE]: (state, { payload }) => {
            return payload;
        },
    }, initialState
);

export default scheduleReducer;