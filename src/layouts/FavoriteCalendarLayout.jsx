import CalendarManageFavoriteNavbar from '../components/calendar/manage/CalendarManageFavoriteNavbar'
import CalendarMagnageFavoriteFollowerHeader from '../components/calendar/manage/CalendarMagnageFavoriteFollowerHeader';
import { Outlet } from 'react-router-dom';

const FavoriteCalendarLayout = () => {
    return (
        <>
            <CalendarManageFavoriteNavbar />
            <br/>
            <CalendarMagnageFavoriteFollowerHeader />
            <br/>
            <Outlet />
        </>
    );
}

export default FavoriteCalendarLayout;