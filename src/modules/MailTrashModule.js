import { createActions, handleActions } from 'redux-actions';
import { GET_CONTACTLIST } from './ContactModule';


/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_TRASH = 'mail/GET_TRASH';
export const PUT_TRASH = 'mail/PUT_TRASH';
export const DELETE_TRASH = 'mail/DELETE_TRASH';



const actions = createActions({

    [GET_TRASH]: () => {},
    [PUT_TRASH]: () => {},
    [DELETE_TRASH] : () => {},
    
})


/* 리듀서 */
const mailTrashReducer = handleActions (
    
    {
        [GET_TRASH]: (state, {payload}) => {

            return payload
        },
        [PUT_TRASH]: (state, {payload}) => {

            return payload
        },
        [DELETE_TRASH]: (state, {payload}) => {

            return payload
        }
    
    },
    
    initialState

    );

    

export default mailTrashReducer;


