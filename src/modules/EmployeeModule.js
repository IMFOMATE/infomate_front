import { createActions, handleActions } from "redux-actions";



/*초기값*/
const initialState = [];

/* 액션 */
export const GET_EMPLOYEE               = 'employee/GET_EMPLOYEE';
export const GET_DEPTLIST               = 'employee/GET_DEPTLIST';
export const GET_DEPTSEARCH             = 'employee/GET_DEPTSEARCH';
export const GET_DEPTALL                = 'employee/GET_DEPTALL';

const actions = createActions({
    [GET_EMPLOYEE]: () => {},
    [GET_DEPTLIST]: () => {},
    [GET_DEPTSEARCH]: () => {},
    [GET_DEPTALL]: () => {}

});


/* 리듀서 */
const employeeReducer = handleActions(
    {
        [GET_EMPLOYEE]: (state, {payload}) => {
            return payload;
        },
        [GET_DEPTLIST]: (state, {payload}) => {
            return payload;
        },
        [GET_DEPTSEARCH]: (state, {payload}) => {
            return payload;
        },
        [GET_DEPTALL]: (state, {payload}) => {
            return payload;
        }

    },
    initialState
)



export default employeeReducer;