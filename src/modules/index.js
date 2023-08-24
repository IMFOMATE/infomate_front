import { combineReducers } from "redux";
import contactReducer from "./ContactModule";
import mailReducer from "./MailModule";

const rootReducer = combineReducers({
    contactReducer,
    mailReducer
    
});

export default rootReducer;