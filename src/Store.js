import rootReducer from './modules';
import { composeWithDevTools} from 'redux-devtools-extension';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistStore } from "redux-persist";


export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk))
);

export const persistor = persistStore(store);

export default { store, persistor };