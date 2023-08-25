import { createActions, handleActions } from 'redux-actions';

const initialState = [];

export const GET_CALENDAR_FINDALL = 'calendar/GET_FINDALL'
export const GET_CALENDAR_LIST = 'calendar/GET_LIST'
export const POST_CALENDAR_REGIT = 'calendar/POST_REGIT'
export const DELETE_CALENDAR = 'calendar/DELETE'
export const GET_FAV_CALENDAR_FINDALL = 'favCalendar/GET_FINDALL'


const actions = createActions({
    [GET_CALENDAR_FINDALL]: () => {},
    [GET_CALENDAR_LIST]: () => {},
    [POST_CALENDAR_REGIT]: () => {},
});


 const calendarReducer = handleActions({
        [GET_CALENDAR_FINDALL]: (state, { payload }) => {
            console.log('GET_CALENDAR_FINDALL',state);
            return payload;
        },
        [GET_CALENDAR_LIST]: (state, { payload }) => {
            console.log('GET_CALENDAR_LIST',state);
            return payload;
        },
        [POST_CALENDAR_REGIT]: (state, { payload }) => {
            return payload;
        },
    }, initialState
);
export default calendarReducer