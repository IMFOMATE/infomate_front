import {handleActions} from 'redux-actions';

const initialState = {};

export const POST_ATTEND = 'work/POST_ATTEND';

export const PATCH_FINISH = 'work/PATCH_FINISH';

export const GET_WORK = 'work/GET_WORK';


const workReducer = handleActions({
      [POST_ATTEND]: (state, {payload}) => ({
        ...state, [POST_ATTEND]: payload
      }),
      [PATCH_FINISH]: (state, {payload}) => ({
        ...state, [PATCH_FINISH]: payload
      }),
      [GET_WORK]: (state, {payload}) => ({
        ...state, [GET_WORK]: payload
      }),
    }, initialState
);


export default workReducer;