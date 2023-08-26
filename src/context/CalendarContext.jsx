import {createContext, useState} from "react";

export const CalendarFilterContext = createContext();

export const CalendarFilterProvider = ({children}) => {
    const [filter, setFilter] = useState([]);

    return(
        <CalendarFilterContext.Provider value={{filter, setFilter}}>
            {children}
        </CalendarFilterContext.Provider>
    )
}