import ReminderList from "../../components/calendar/dashboard/ReminderList";
import MiniCalendar from '../../components/calendar/dashboard/MiniCalendar';
import "./main.css"

function Main() {

    return (
        <>
            <div className="header">
                <h3>메인페이지</h3>
                <button>추가</button>
            </div>
            <div style={{display:'flex'}}>
                <ReminderList />
                <MiniCalendar />
            </div>
        </>
    )
}

export default Main;