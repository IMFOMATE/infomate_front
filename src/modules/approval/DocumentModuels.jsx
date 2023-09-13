import { createActions, handleActions } from 'redux-actions';

const initialState = [];

export const GET_DOCUMENT_MAIN = 'document/GET_DOCUMENT_MAIN';

export const GET_DOCUMENT_LIST = 'document/GET_DOCUMENT_LIST';
export const POST_DRAFT = 'document/POST_DRAFT';
export const POST_VACATION = 'document/POST_VACATION';
export const POST_PAYMENT = 'document/POST_PAYMENT';

export const GET_DETAIL = 'document/GET_DETAIL';
export const DELETE_DOCUMENT = 'document/DELETE_DOCUMENT';
export const CANCEL_DOCUMENT = 'document/CANCEL_DOCUMENT';

const actions = createActions({
  [GET_DOCUMENT_MAIN] : () => {},
  [GET_DOCUMENT_LIST] : () => {},
  [POST_DRAFT] : () => {},
  [POST_VACATION] : () => {},
  [POST_PAYMENT] : () => {},
  [GET_DETAIL] : () => {},
  [DELETE_DOCUMENT] : () =>{},
  [CANCEL_DOCUMENT] : () =>{}
})

const documentsReducer = handleActions(
    {
      [GET_DOCUMENT_MAIN] : (state, { payload }) =>  ({
        ...state,[GET_DOCUMENT_MAIN]:payload
      }),
      [GET_DOCUMENT_LIST] : (state, { payload }) =>  {
        return payload;
      },
      [POST_DRAFT] : (state, { payload }) => {
         return {[POST_DRAFT]: payload}
      },
      [POST_VACATION] : (state, { payload }) => ({
        ...state,[POST_VACATION]: payload
      }),
      [POST_PAYMENT] : (state, { payload }) => ({
        ...state, [POST_PAYMENT]: payload
      }),
      [DELETE_DOCUMENT] : (state, { payload }) => ({
        ...state, [DELETE_DOCUMENT]:payload
      }),
      [CANCEL_DOCUMENT] : (state, { payload }) =>  ({
        ...state, [CANCEL_DOCUMENT]: payload
      }),
      [GET_DETAIL] : (state, { payload }) => ({
           ...state, [GET_DETAIL]: payload
      }),
    },
    initialState
);
export default documentsReducer;