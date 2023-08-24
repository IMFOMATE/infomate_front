import { combineReducers } from "redux";
import contactReducer from "./ContactModule";
import boardReducer from './BoardModule';

const rootReducer = combineReducers({
    contactReducer, boardReducer
});

export default rootReducer;