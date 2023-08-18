import CalendarManageFavoriteNavbar from '../components/common/calendar/manage/CalendarManageFavoriteNavbar'
import { Outlet } from 'react-router-dom';

const FavoriteCalendarLayout = () => {
    return (
        <>
            <CalendarManageFavoriteNavbar />
            <br/>
            <br/>
            <Outlet />
        </>
    );
}

export default FavoriteCalendarLayout;