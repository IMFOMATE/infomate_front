import { combineReducers } from "redux";
import contactReducer from "./ContactModule";
import calendarReducer from "./CalendarMoudule";
import scheduleReducer from "./ScheduleMoudule";
import favCalendarReducer from './FavCalendarMoudule';

const rootReducer = combineReducers({
    contactReducer,
    calendarReducer,
    favCalendarReducer,
    scheduleReducer,
});

export default rootReducer;