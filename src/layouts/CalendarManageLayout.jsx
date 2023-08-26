import { NavLink, Outlet } from "react-router-dom";
import CalendarManageNavbar from '../components/calendar/manage/CalendarManageNavbar'
import CalendarManageHeader from '../components/calendar/manage/CalendarManageHeader'
import ButtonInline from '../components/common/button/ButtonInline';

const CalendarManegeLayout = () => {
    
    return (
        <div style={{margin: '10px 30px 10px 30px'}}>
            <CalendarManageHeader value={'스케쥴 관리'} style={{marginBottom:10}} />
            <CalendarManageNavbar />
            <br/>
            <br/>
            <Outlet />
            <div style={{textAlign: 'center', marginTop:70}}>
                <NavLink to='/calendar'>
                    <ButtonInline value='캘린더로 돌아가기' style={{width:'15%', minWidth:150, height:40}} />
                </NavLink>
            </div>

            
        </div>
    )
}


export default CalendarManegeLayout;
