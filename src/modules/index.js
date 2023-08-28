import { combineReducers } from "redux";
import contactReducer from "./ContactModule";
import mailReducer from "./MailModule";
import boardReducer from './BoardModule';
import documentsReducer from "./approval/DocumentModuels";
import calendarReducer from "./CalendarMoudule";
const rootReducer = combineReducers({
    contactReducer,
    boardReducer,
    mailReducer,
    calendarReducer,
    documentsReducer
});

export default rootReducer;