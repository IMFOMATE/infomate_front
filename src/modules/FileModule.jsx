import { createActions, handleActions } from 'redux-actions';

const initialState = [];

export const FILE_DOWNLOAD = 'document/FILE_DOWNLOAD';

const actions = createActions({
  [FILE_DOWNLOAD] : () => {},

});

const fileReducer = handleActions(
    {
      [FILE_DOWNLOAD] : (state, { payload }) => ({
        ...state, [FILE_DOWNLOAD]:payload
      }),
    },
    initialState
);
export default fileReducer;