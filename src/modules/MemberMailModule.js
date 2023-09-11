import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_MEMBERMAIL  = 'member/GET_MEMBERMAIL';



const actions = createActions({
    [GET_MEMBERMAIL]: () => {},
});

/* 리듀서 */
const memberMailReducer = handleActions(

   
    {
        [GET_MEMBERMAIL]: (state, { payload }) => {
            
            return payload;
        },
    },
    initialState
);

export default memberMailReducer;