
import { createContext, useState } from "react";
import { Outlet } from "react-router-dom"

export const ScheduleProvider = createContext(null);

const CalendarLayout = () => {

    const [schedule, setSchedule] = useState({});

    return(
        <>
            <ScheduleProvider.Provider value={{schedule, setSchedule}}>
                <Outlet />
            </ScheduleProvider.Provider>
        </>
    )
}

export default CalendarLayout;