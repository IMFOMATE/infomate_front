import {createContext, useState} from "react";

export const CalendarProvider = createContext();

export const CalendarListProvider = ({children}) => {
    const [calendarList, setCalendarList] = useState([]);

    return(
        <CalendarProvider.Provider value={{calendarList, setCalendarList}}>
            {children}
        </CalendarProvider.Provider>
    )
}