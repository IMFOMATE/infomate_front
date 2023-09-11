import { createActions, handleActions } from 'redux-actions';


const initialState = [];

export const GET_TREEVIEW           = 'department/GET_TREEVIEW';
export const PATCH_UPDATE_DEPT      = 'department/PATCH_UPDATE_DEPT';
export const POST_DEPT_INSERT       = 'department/POST_DEPT_INSERT';
export const GET_DEPTALL            = 'department/GET_DEPTALL';


const actions = createActions({
  [GET_TREEVIEW] : () => {},
  [PATCH_UPDATE_DEPT]: () => {},
  [POST_DEPT_INSERT]: () => {},
  [GET_DEPTALL]: () => {}

});


const departmentReducer = handleActions({
      [GET_TREEVIEW]: (state, { payload }) => {
        return payload;
      },
      [PATCH_UPDATE_DEPT]: (state, {payload}) => {
        return payload;
      },
      [POST_DEPT_INSERT]: (state, {payload}) =>{
        return payload;
      },
      [GET_DEPTALL]: (state, {payload}) => {
        return payload;
      }

    },
    initialState
);



export default departmentReducer;