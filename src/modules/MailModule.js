import { createActions, handleActions } from 'redux-actions';
import { GET_CONTACTLIST } from './ContactModule';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_MAIL = 'contact/GET_SELECTMAIL';
export const POST_MAIL = 'contact/POST_POSTMAIL';


const actions = createActions({
    [GET_MAIL]: () => {},
    [POST_MAIL]: () => {},
    [GET_CONTACTLIST]: () => {},
   
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
        [GET_CONTACTLIST]: (state, {payload}) => {

            return payload
        }
    },
    initialState

    );

    

export default mailReducer;

