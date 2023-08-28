import { createActions, handleActions } from 'redux-actions';

const initialState = [];

export const GET_DOCUMENT_MAIN = 'document/GET_DOCUMENT_MAIN';
export const GET_DOCUMENT_APRPROVALLIST = 'document/GET_DOCUMENT_APRPROVALLIST';


const actions = createActions({
  [GET_DOCUMENT_MAIN] : () => {},
  [GET_DOCUMENT_APRPROVALLIST] : () => {},
})

const documentsReducer = handleActions(
    {
      [GET_DOCUMENT_MAIN] :  (state, { payload }) => {
        return payload;
      },
      [GET_DOCUMENT_APRPROVALLIST] : (state, { payload }) => {
        return payload;
      },
    },
    initialState
);
export default documentsReducer;