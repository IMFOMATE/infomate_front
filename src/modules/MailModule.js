import { createActions, handleActions } from 'redux-actions';
import { GET_CONTACTLIST } from './ContactModule';


/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_MAIL = 'contact/GET_SELECTMAIL';
export const POST_MAIL = 'contact/POST_POSTMAIL';
export const DELETE_MAIL = 'contact/DELETE_MAIL';
export const GET_FILE = 'contact/GET_FILE';
export const GET_CONTACT_MAIL = 'contact/GET_CONTACT_MAIL'




const actions = createActions({
    [GET_MAIL]: () => {},
    [POST_MAIL]: () => {},
    [DELETE_MAIL]: () => {},
    [GET_FILE]: () => {},
    [GET_CONTACT_MAIL]: () => {},
   
})


/* 리듀서 */
const mailReducer = handleActions (
    
    {
        [GET_MAIL]: (state, {payload}) => {

            return payload
        },
        [POST_MAIL]: (state, {payload}) => {

            return payload
        },
        [GET_CONTACT_MAIL]: (state, {payload}) => {

            return {...state, [GET_CONTACT_MAIL]: payload}
        },
        [DELETE_MAIL]: (state, {payload}) => {

            return payload
        },
        [GET_FILE]: (state, {payload}) => ({
            ...state, [GET_FILE] :payload
        })
    },
    initialState

    );

    

export default mailReducer;

