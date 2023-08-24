import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_POST            = 'product/GET_POST';    // 게시글 조회
export const GET_BOARD           = 'product/GET_BOARD';   // 게시판
export const POST_POST           = 'product/POST_POST';   // 게시글 생성
export const PUT_POST            = 'product/PUT_POST';    // 게시글 수정

const actions = createActions({
    [GET_POST]: () => {},
    [GET_BOARD]: () => {},
    [POST_POST]: () => {},
    [PUT_POST]: () => {}
});

/* 리듀서 */
const boardReducer = handleActions(
    {
        [GET_POST]: (state, { payload }) => {
            
            return payload;
        },
        [GET_BOARD]: (state, { payload }) => {
            
            return payload;
        },

        [POST_POST]: (state, { payload }) => {

            return payload;
        },
        [PUT_POST]: (state, { payload }) => {

            return payload;
        }        
    },
    initialState
);

export default boardReducer;