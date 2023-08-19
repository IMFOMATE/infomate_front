import { Outlet } from "react-router-dom";
import CalendarManageNavbar from '../components/calendar/manage/CalendarManageNavbar'
import CalendarManageHeader from '../components/calendar/manage/CalendarManageHeader'

const CalendarManegeLayout = () => {
    

    return (
        <div style={{margin: '10px 30px 10px 30px'}}>
            <CalendarManageHeader value={'스케쥴 관리'} style={{marginBottom:10}} />
            <CalendarManageNavbar />
            <br/>
            <br/>
            <Outlet />
        </div>
    )
}


export default CalendarManegeLayout;
