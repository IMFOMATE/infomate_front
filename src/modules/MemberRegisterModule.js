import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const MEMBER_REGISTER  = 'member/MEMBER_REGISTER';
export const RESET_REGIST = 'member/RESET_REGIST';

const actions = createActions({
    [MEMBER_REGISTER]: () => {},
    [RESET_REGIST]: () => {},
});

const registMemberReducer = handleActions(
    {
        [MEMBER_REGISTER]: (state, { payload }) => {
            
            return payload;
        },
        [RESET_REGIST]: (state, action) => {
            return initialState;
        }

    },
    initialState
);

export default registMemberReducer;