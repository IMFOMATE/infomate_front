import { createActions, handleActions } from "redux-actions";



/*초기값*/
const initialState = [];

/* 액션 */
export const GET_EMPLOYEE               = 'employee/GET_EMPLOYEE';

const actions = createActions({
    [GET_EMPLOYEE]: () => {}
});


/* 리듀서 */
const employeeReducer = handleActions(
    {
        [GET_EMPLOYEE]: (state, {payload}) => {
            return payload;
        }
    },
    initialState
)

export default employeeReducer;