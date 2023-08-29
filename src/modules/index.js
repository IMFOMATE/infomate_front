import { combineReducers } from "redux";
import contactReducer from "./ContactModule";
import mailReducer from "./MailModule";
import boardReducer from './BoardModule';
import documentsReducer from "./approval/DocumentModuels";
import calendarReducer from "./CalendarMoudule";
import departmentReducer from "./DepartmentModule";
const rootReducer = combineReducers({
    contactReducer,
    boardReducer,
    mailReducer,
    calendarReducer,
    documentsReducer,
    departmentReducer
});

export default rootReducer;