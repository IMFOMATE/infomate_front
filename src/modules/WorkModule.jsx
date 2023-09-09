import {handleActions} from 'redux-actions';

const initialState = {};

export const POST_ATTEND = 'work/POST_ATTEND';

export const PATCH_FINISH = 'work/PATCH_FINISH';


const workReducer = handleActions({
      [POST_ATTEND]: (state, {payload}) => ({
        ...state, [POST_ATTEND]: payload
      }),
      [PATCH_FINISH]: (state, {payload}) => ({
        ...state, [PATCH_FINISH]: payload
      }),
    }, initialState
);


export default workReducer;