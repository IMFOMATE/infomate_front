
import { createContext, useState } from "react";
import { Outlet } from "react-router-dom"

export const ScheduleProvider = createContext(null);
export const ScheduleModalProvider = createContext(null);


const ProviderContainer = ({children}) => {
    const [schedule, setSchedule] = useState(null);
    const [isModal, setIsModal] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    return (
        <>
        <ScheduleProvider.Provider value={{schedule, setSchedule, isMobile, setIsMobile}}>
            <ScheduleModalProvider.Provider value={{isModal, setIsModal}}>
                    {children}  
                </ScheduleModalProvider.Provider>
            </ScheduleProvider.Provider>
        </>
    )
}

const CalendarLayout = () => {

    return(
        <>
            <ProviderContainer>
                    <Outlet />
            </ProviderContainer>
        </>
    )
}

export default CalendarLayout;