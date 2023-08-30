import CalendarManageFavoriteNavbar from '../components/calendar/manage/CalendarManageFavoriteNavbar'

import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Pagenation } from '../components/common/Pagenation';

export const ManageChkList = createContext(null);    
export const PageableContext = createContext({
    prev: false,
    next: false,
    pageNum: 1,
    total: 1,
});    

const FavoriteCalendarLayout = () => {

    const [chk ,setChk] = useState({
        itemAll: false,
        selectList: [],
    })
    
    // const [pageable, setPageable] = useState({});



    return (
        <>
            <ManageChkList.Provider value={{chk, setChk}} >
                {/* <PageableContext.Provider value={{pageable, setPageable}}> */}
                    <CalendarManageFavoriteNavbar />
                    <br/>
                    <Outlet />
                    <br/>
                    {/* <Pagenation pageable={{...pageable}} /> */}
                {/* </PageableContext.Provider> */}
            </ManageChkList.Provider>
        </>
    );
}

export default FavoriteCalendarLayout;