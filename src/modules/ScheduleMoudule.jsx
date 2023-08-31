import { createActions, handleActions } from 'redux-actions';

const initialState = [];

export const GET_SCHEDULE_FINDALL = 'SCHEDULE/GET_FINDALL'
export const GET_SCHEDULE_DETAIL = 'SCHEDULE/GET_DETAIL'
export const POST_SCHEDULE_REGIT = 'SCHEDULE/POST_REGIT'
export const PATCH_SCHEDULE = 'SCHEDULE/PATCH'
export const PUT_SCHEDULE = 'SCHEDULE/PUT'
export const DELETE_SCHEDULE = 'SCHEDULE/DELETE'


const actions = createActions({
    [GET_SCHEDULE_DETAIL]: () => {},
    [POST_SCHEDULE_REGIT]: () => {},
    [PATCH_SCHEDULE]: () => {},
    [DELETE_SCHEDULE]: () => {}
});

const scheduleReducer = handleActions({
        [GET_SCHEDULE_DETAIL]: (state, { payload }) => ({
           ...state, [GET_SCHEDULE_DETAIL] : payload
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
    }, initialState
);

export default scheduleReducer;