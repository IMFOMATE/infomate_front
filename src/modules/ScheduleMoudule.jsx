import { createActions, handleActions } from 'redux-actions';

const initialState = [];

export const GET_SCHEDULE_FINDALL = 'SCHEDULE/GET_FINDALL'
export const GET_SCHEDULE_DETAIL = 'SCHEDULE/GET_DETAIL'
export const POST_SCHEDULE_REGIT = 'SCHEDULE/POST_REGIT'
export const DELETE_SCHEDULE = 'SCHEDULE/DELETE'

// export const  = 'SCHEDULE/'
// export const  = 'SCHEDULE/'
// export const  = 'SCHEDULE/'
// export const  = 'SCHEDULE/'
// export const  = 'SCHEDULE/'
// export const  = 'SCHEDULE/'
// export const  = 'SCHEDULE/'
// export const  = 'SCHEDULE/'
// export const  = 'SCHEDULE/'
// export const  = 'SCHEDULE/'
// export const  = 'SCHEDULE/'
// export const  = 'SCHEDULE/'
// export const  = 'SCHEDULE/'
// export const  = 'SCHEDULE/'

// const actions = createActions({
//     [GET_SCHEDULE]: () => {},
// });


const scheduleReducer = handleActions({
        [GET_SCHEDULE_DETAIL]: (state, { payload }) => {
            return payload;
        },
        [POST_SCHEDULE_REGIT]: (state, { payload }) => {
            return payload;
        },
    }, initialState
);

export default scheduleReducer;