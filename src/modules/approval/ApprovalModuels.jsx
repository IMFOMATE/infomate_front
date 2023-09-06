import { createActions, handleActions } from 'redux-actions';

const initialState = [];

export const POST_APPROVE = 'document/POST_APPROVE';
export const POST_REJECT = 'document/POST_REJECT';
export const POST_TEMP = 'document/POST_TEMP';

const actions = createActions({
  [POST_APPROVE] : () => {},
  [POST_REJECT] : () => {},
  [POST_TEMP] : () => {},
});

const approvalReducer = handleActions(
    {
      [POST_APPROVE] : (state, { payload }) => ({
        ...state, [POST_APPROVE]:payload
      }),
      [POST_REJECT] : (state, { payload }) => ({
        ...state, [POST_REJECT]:payload
      }),
      [POST_TEMP] : (state, { payload }) => ({
        ...state, [POST_TEMP]:payload
      }),
    },
    initialState
);

export default approvalReducer;