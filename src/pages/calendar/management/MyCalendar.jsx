import ButtonInline from '../../../components/common/button/ButtonInline';
import CalendarAdd from '../../../components/common/calendar/manage/CalendarAdd';
import MyCalendarItem from '../../../components/common/calendar/manage/MyCalendarItem'

import './myCalendar.css';

const MyCalendar = (props) => {


    return (
        <>  
            <div className='c-my-calendar'>
                <div>
                    <CalendarAdd />
                </div>
                <div>
                    {props?.data?.map(item => <MyCalendarItem name={item.memberId} defaultValue={item.defaulCalendar} text={item.text}/>)}
                    
                    <MyCalendarItem name='1' defaultValue={true} text='회사 캘린더'/> {/* 예제 */}
                </div>
                <div style={{textAlign: 'center', marginTop:70}}>
                    <ButtonInline isCancel={true} value='캘린더로 돌아가기' style={{width:'15%', minWidth:150, height:50}} />
                </div>
            </div>
        </>
    )
}

export default MyCalendar;