import { combineReducers } from "redux";
import contactReducer from "./ContactModule";
import scheduleReducer from "./ScheduleMoudule";
import favCalendarReducer from './FavCalendarMoudule';
import mailReducer from "./MailModule";
import boardReducer from './BoardModule';
import documentsReducer from "./approval/DocumentModuels";
import calendarReducer from "./CalendarMoudule";
import departmentReducer from "./DepartmentModule";
import approvalReducer from "./approval/ApprovalModuels";
import fileReducer from "./FileModule";
import employeeReducer from "./EmployeeModule";
const rootReducer = combineReducers({
    favCalendarReducer,
    scheduleReducer,
    mailReducer,
    boardReducer,
    contactReducer,
    calendarReducer,
    documentsReducer,
    departmentReducer,
    approvalReducer,
    fileReducer,
    employeeReducer,
});

export default rootReducer;