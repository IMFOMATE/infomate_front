import { createActions, handleActions } from 'redux-actions';


const initialState = [];

export const GET_TREEVIEW = 'department/GET_TREEVIEW';

const actions = createActions({
  [GET_TREEVIEW] : () => {},
});


const departmentReducer = handleActions({
      [GET_TREEVIEW]: (state, { payload }) => {
        return payload;
      },
    },
    initialState
);

export default departmentReducer;