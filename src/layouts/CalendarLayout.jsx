
import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom"

export const ScheduleProvider = createContext(null);

const CalendarLayout = () => {

    const [schedule, setSchedule] = useState({
        title: '',
        startDate: '',
        endDate: '',
        content: '',
        address: '',
        repeat: false,
        important: false,
        allDay: false,
        corpSchdl: false,
        calendar: 0,
        participantList: [{memberCode:1, memberName:'홍길동' }], // dummy data
    });

    return(
        <>
            <ScheduleProvider.Provider value={{schedule, setSchedule}}>
                <Outlet />
            </ScheduleProvider.Provider>
        </>
    )
}

export default CalendarLayout;