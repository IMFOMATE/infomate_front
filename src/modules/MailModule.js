import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_MAIL = 'contact/GET_SELECTMAIL';


const actions = createActions({
    [GET_MAIL]: () => {},
   
})


/* 리듀서 */
const mailReducer = handleActions (
    
    {
        [GET_MAIL]: (state, {payload}) => {

            return payload
        },

  
    },
    initialState

    );

    

export default mailReducer;

