import ButtonInline from '../../../components/common/button/ButtonInline';
import CalendarAdd from '../../../components/calendar/manage/CalendarAdd';
import MyCalendarItem from '../../../components/calendar/manage/MyCalendarItem'

import styles from './myCalendar.module.css';
import { NavLink } from 'react-router-dom';
// import { useParams, useSearchParams } from 'react-router-dom';


const MyCalendar = (props) => {

    // props.data= [
        // {id: '1',radioName: '1',isDafualtRadio:true,text:'test' },
    // ]

    const data =[{},{},{},{},{},{},{},] // 테스트

    return (
        <>  
            <div className={styles.calendar}>
                <div>
                    <CalendarAdd />
                </div>
                <div>
                    {data?.map(item => <MyCalendarItem id={item?.id} radioName={item?.radioName} isDefualtRadio={item.isDefaultRadio} text={item.text} colorValue={item?.colorValue} isCheck={item?.isCheck}/>)}
                    
                    <MyCalendarItem id={1} radioName='1' isDafualtRadio={true} text='회사 캘린더' colorValue={'#FF0000'} isCheck={true}/> {/* 예제 */}
                </div>
            </div>
        </>
    )
}

export default MyCalendar;