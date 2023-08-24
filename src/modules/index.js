import { combineReducers } from "redux";
import contactReducer from "./ContactModule";
import mailReducer from "./MailModule";
import boardReducer from './BoardModule';

const rootReducer = combineReducers({
    contactReducer, boardReducer,
    mailReducer

});

export default rootReducer;