import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const POST_REGISTER = 'contact/POST_REGISTER';
export const GET_ADDRESSBOOK = 'contact/GET_ADDRESSBOOK';
export const PUT_ADDRESSBOOK = 'contact/PUT_ADDRESSBOOK';
export const DELETE_ADDRESSBOOK = 'contact/DELETE_ADDRESSBOOK';
export const GET_CONTACTLIST = 'contact/GET_CONTACTLIST';


const actions = createActions({
    [POST_REGISTER]: () => {},
    [GET_ADDRESSBOOK]: () => {},
    [PUT_ADDRESSBOOK]: () => {},
    [DELETE_ADDRESSBOOK]: () => {},
    [GET_CONTACTLIST]: () => {},
})


/* 리듀서 */
const contactReducer = handleActions (
    
    {
        [POST_REGISTER]: (state, {payload}) => {

            return payload
        },

        [GET_ADDRESSBOOK]: (state, { payload }) => {

            return payload;
        },

        [PUT_ADDRESSBOOK]: (state, { payload }) => {

            return payload;
        },
        [DELETE_ADDRESSBOOK]: (state, { payload }) => {

            return payload;
        },
        [GET_CONTACTLIST]: (state, { payload }) => {

            return payload;
        }
    },
    initialState

    );

    

export default  contactReducer;

