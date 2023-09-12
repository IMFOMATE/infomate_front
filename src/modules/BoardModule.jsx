import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_POST            = 'post/GET_POST';    // 게시글 조회
export const GET_BOARD           = 'board/GET_BOARD';   // 게시판
export const POST_POST           = 'post/POST_POST';   // 게시글 생성
export const PUT_POST            = 'post/PUT_POST';    // 게시글 수정
export const DELETE_POST         = 'post/DELETE_POST';  // 게시글 삭제
export const GET_NOTICE          = 'board/GET_BOARD_NOTICE';    //  공지사항 조회
export const GET_COMMON          = 'board/GET_BOARD_COMMON';    // 일반게시판 조회
export const GET_ANONY           = 'board/GET_BOARD_ANONY'; // 익명게시판 조회
export const GET_DEPT            = 'board/GET_BOARD_DEPT';  // 부서게시판 조회
export const GET_MAINBOARD       = 'board/GET_MAINBOARD';
export const GET_COMMENT         = 'comment/GET_COMMENT';   // 댓글 조회
export const POST_COMMENT        = 'comment/POST_COMMENT';  // 댓글 생성
export const PUT_COMMENT         = 'comment/PUT_COMMENT';   // 댓글 수정
export const DELETE_COMMENT      = 'comment/DELETE_COMMENT';    // 댓글 삭제

const actions = createActions({
    [GET_POST]: () => {},
    [GET_BOARD]: () => {},
    [POST_POST]: () => {},
    [PUT_POST]: () => {},
    [GET_NOTICE]: () => {},
    [GET_COMMON]: () => {},
    [GET_ANONY]: () => {},
    [GET_DEPT]: () => {},
    [GET_MAINBOARD]: () => {},
    [GET_COMMENT]: () => {}
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
        [POST_POST]: (state, { payload }) => ({
            ...state, [POST_POST]: payload
        }),
        
        [PUT_POST]: (state, { payload }) => {

            return payload;
        },
        [DELETE_POST]: (state, { payload }) => {

            return payload;
        },
        [GET_NOTICE]: (state, { payload }) => {

            return payload;
        },
        [GET_COMMON]: (state, { payload }) => {

            return payload;
        },
        [GET_ANONY]: (state, { payload }) => {

            return payload;
        },
        [GET_DEPT]: (state, { payload }) => {

            return payload;
        },
        [GET_MAINBOARD]: (state, { payload }) => {

            return payload;
        },
        [GET_COMMENT]: (state, { payload }) => {

            return payload;
        },
        // [GET_COMMENT]: (state, { payload }) => {

        //     return payload;
        // },
        // [POST_COMMENT]: (state, { payload }) => {

        //     return payload;
        // },
        // [PUT_COMMENT]: (state, { payload }) => {

        //     return payload;
        // },
        // [DELETE_COMMENT]: (state, { payload }) => {

        //     return payload;
        // },
    },
    initialState
);

export default boardReducer;