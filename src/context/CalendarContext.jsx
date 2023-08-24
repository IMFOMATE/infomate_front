import {createContext, useState} from "react";

export const CalendarProvider = createContext();

export const CalendarListProvider = ({children}) => {
    const [calendarList, setCalendarList] = useState([1,2,3,4]);

    return(
        <CalendarProvider.Provider value={{calendarList, setCalendarList}}>
            {children}
        </CalendarProvider.Provider>
    )
}