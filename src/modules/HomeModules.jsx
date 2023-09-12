import {createActions, handleActions} from "redux-actions";


const initialState = {};

export const GET_CREDIT = 'home/GET_CREDIT'

const actions = createActions({
  [GET_CREDIT] : () => {},
});

const homeMainReducer = handleActions({
      PURGE : (state) =>{
        return initialState;
      },
      [GET_CREDIT]: (state, {payload}) => ({
        ...state, [GET_CREDIT]: payload
      }),
    }, initialState
);

export default homeMainReducer;