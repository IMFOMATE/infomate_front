import { createActions, handleActions } from 'redux-actions';

const initialState = [];

export const GET_DOCUMENT_MAIN = 'document/GET_DOCUMENT_MAIN';
export const GET_DOCUMENT_APRPROVALLIST = 'document/GET_DOCUMENT_APRPROVALLIST';
export const GET_DOCUMENT_REFLIST = 'document/GET_DOCUMENT_REFLIST';
export const GET_DOCUMENT_CREDIT = 'document/GET_DOCUMENT_CREDIT';
export const POST_DRAFT = 'document/POST_DRAFT';
export const POST_VACATION = 'document/POST_VACATION';
export const POST_PAYMENT = 'document/POST_PAYMENT';

export const GET_DETAIL = 'document/GET_DETAIL';


const actions = createActions({
  [GET_DOCUMENT_MAIN] : () => {},
  [GET_DOCUMENT_APRPROVALLIST] : () => {},
  [GET_DOCUMENT_REFLIST] : () => {},
  [GET_DOCUMENT_CREDIT] : () => {},
  [POST_DRAFT] : () => {},
  [POST_VACATION] : () => {},
  [POST_PAYMENT] : () => {},
  [GET_DETAIL] : () => {},
})

const documentsReducer = handleActions(
    {
      [GET_DOCUMENT_MAIN] : (state, { payload }) => {
        return payload;
      },
      [GET_DOCUMENT_APRPROVALLIST] : (state, { payload }) => {
        return payload;
      },
      [GET_DOCUMENT_REFLIST] : (state, { payload }) => {
        return payload;
      },
      [GET_DOCUMENT_CREDIT] : (state, { payload }) => {
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
      [GET_DETAIL] : (state, { payload }) => {
        return payload;
      },
    },
    initialState
);
export default documentsReducer;