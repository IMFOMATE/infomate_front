import { combineReducers } from "redux";
import contactReducer from "./ContactModule";
import mailReducer from "./MailModule";
import boardReducer from './BoardModule';
import memberReducer from "./MemberModule";

const rootReducer = combineReducers({
    contactReducer, boardReducer,
    mailReducer,
    memberReducer

});

export default rootReducer;