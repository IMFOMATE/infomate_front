import { combineReducers } from "redux";
import contactReducer from "./ContactModule";
import scheduleReducer from "./ScheduleMoudule";
import favCalendarReducer from './FavCalendarMoudule';
import mailReducer from "./MailModule";
import boardReducer from './BoardModule';
import memberReducer from "./MemberModule";
import documentsReducer from "./approval/DocumentModuels";
import calendarReducer from "./CalendarMoudule";
import departmentReducer from "./DepartmentModule";
import approvalReducer from "./approval/ApprovalModuels";
import fileReducer from "./FileModule";
import employeeReducer from "./EmployeeModule";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import registMemberReducer from "./MemberRegisterModule";

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
    memberReducer,
    registMemberReducer,
});

const persistConfig = {
    key: "root",
    storage: storage,
};


export default persistReducer(persistConfig, rootReducer);