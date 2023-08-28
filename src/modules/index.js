import { combineReducers } from "redux";
import contactReducer from "./ContactModule";
import calendarReducer from "./CalendarMoudule";
import scheduleReducer from "./ScheduleMoudule";
import favCalendarReducer from './FavCalendarMoudule';
import mailReducer from "./MailModule";
import boardReducer from './BoardModule';

const rootReducer = combineReducers({
    contactReducer,
    calendarReducer,
    favCalendarReducer,
    scheduleReducer,
    mailReducer,
    boardReducer,
});

export default rootReducer;