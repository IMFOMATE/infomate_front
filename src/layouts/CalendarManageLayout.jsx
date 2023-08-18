import { Outlet } from "react-router-dom";
import CalendarManageNavbar from '../components/common/calendar/manage/CalendarManageNavbar'
import CalendarManageHeader from '../components/common/calendar/manage/CalendarManageHeader'

const CalendarManegeLayout = () => {
    const containerStyle = {
        margin: 30,

    }

    return (
        <div style={containerStyle}>
            <CalendarManageHeader value={'테스트'} style={{marginBottom:40}} />
            <CalendarManageNavbar />
            <br/>
            <br/>
            <Outlet />
        </div>
    )
}


export default CalendarManegeLayout;
