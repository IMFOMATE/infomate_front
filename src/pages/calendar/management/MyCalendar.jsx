import CalendarAdd from '../../../components/common/calendar/manage/CalendarAdd';
import MyCalendarItem from '../../../components/common/calendar/manage/MyCalendarItem'

import './myCalendar.css';

const MyCalendar = (props) => {


    return (
        <>  <div className='c-my-calendar'>
                <div>
                    <CalendarAdd />
                </div>
                <div>
                    {props?.data?.map(item => <MyCalendarItem name={item.memberId} defaultValue={item.defaulCalendar} text={item.text}/>)}
                    
                    <MyCalendarItem name='1' defaultValue={true} text='회사 캘린더'/> {/* 예제 */}
                    
                </div>
            </div>
        </>
    )
}

export default MyCalendar;