import { combineReducers } from "redux";
import contactReducer from "./ContactModule";
import calendarReducer from "./CalendarMoudule";
import scheduleReducer from "./ScheduleMoudule";

const rootReducer = combineReducers({
    contactReducer,
    calendarReducer,
    // calendarListReducer,
    scheduleReducer,
});

export default rootReducer;