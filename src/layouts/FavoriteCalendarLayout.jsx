import CalendarManageFavoriteNavbar from '../components/calendar/manage/CalendarManageFavoriteNavbar'
import CalendarMagnageFavoriteFollowerHeader from '../components/calendar/manage/CalendarMagnageFavoriteFollowerHeader';

import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const ManageChkList = createContext(null);    

const FavoriteCalendarLayout = () => {

    const [chk ,setChk] = useState({
        itemAll: false,
        selectList: [],
    })
    
    return (
        <>
            <ManageChkList.Provider value={{chk, setChk}} >
                <CalendarManageFavoriteNavbar />
                <br/>
                <Outlet />
            </ManageChkList.Provider>
        </>
    );
}

export default FavoriteCalendarLayout;