import { createActions, handleActions } from 'redux-actions';

const initialState = [];

export const GET_DOCUMENT_MAIN = 'document/GET_DOCUMENT_MAIN';

export const GET_DOCUMENT_LIST = 'document/GET_DOCUMENT_LIST';
export const POST_DRAFT = 'document/POST_DRAFT';
export const POST_VACATION = 'document/POST_VACATION';
export const POST_PAYMENT = 'document/POST_PAYMENT';

export const GET_DETAIL = 'document/GET_DETAIL';
export const DELETE_DOCUMENT = 'document/DELETE_DOCUMENT';


const actions = createActions({
  [GET_DOCUMENT_MAIN] : () => {},
  [GET_DOCUMENT_LIST] : () => {},
  [POST_DRAFT] : () => {},
  [POST_VACATION] : () => {},
  [POST_PAYMENT] : () => {},
  [GET_DETAIL] : () => {},
  [DELETE_DOCUMENT] : () =>{}
})

const documentsReducer = handleActions(
    {
      [GET_DOCUMENT_MAIN] : (state, { payload }) =>  {
        return payload;
      },
      [GET_DOCUMENT_LIST] : (state, { payload }) =>  {
        return payload;
      },
      [POST_DRAFT] : (state, { payload }) => {
        return payload;
      },
      [POST_VACATION] : (state, { payload }) => {
        return payload;
      },
      [POST_PAYMENT] : (state, { payload }) => {
        return payload;
      },
      [DELETE_DOCUMENT] : (state, { payload }) => {
        return payload;
      },
      [GET_DETAIL] : (state, { payload }) => ({
           ...state, [GET_DETAIL]: payload
      }),
    },
    initialState
);
export default documentsReducer;