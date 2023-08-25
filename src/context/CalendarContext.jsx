import {createContext, useState} from "react";

export const CalendarProvider = createContext();

export const CalendarListProvider = ({children}) => {
    const [events, setEvents] = useState({
        events: {},
        filter: []
    });

    return(
        <CalendarProvider.Provider value={{events, setEvents}}>
            {children}
        </CalendarProvider.Provider>
    )
}