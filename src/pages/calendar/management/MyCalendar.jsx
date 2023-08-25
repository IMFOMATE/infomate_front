import { useEffect, useState } from 'react';
import CalendarAdd from '../../../components/calendar/manage/CalendarAdd';
import MyCalendarItem from '../../../components/calendar/manage/MyCalendarItem'

import styles from './myCalendar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCalendarListAPI } from '../../../apis/CalendarAPICalls';

const MyCalendar = () => {


    const [selectItem, setSelectItem] = useState([]);

    const calendarList = useSelector(state => state.calendarReducer);
    const dispatch = useDispatch();
    const memberCode = 2; // 수정 예정

    useEffect(()=> {
        dispatch(getCalendarListAPI({memberCode: memberCode}))
    },[])
    

    const checkSelectHandler = e => {
        if(selectItem.includes(e.target.id)){
            setSelectItem([...selectItem.filter(item=>item !== e.target.id)])
        }else{
            setSelectItem([...selectItem, e.target.id]);
        }
    }

    const radioOnChangeHandler = e => {
        
        console.log(e.target.id);
    }

    return (
        <>  
            <div className={styles.calendar}>
                <div>
                    <CalendarAdd />
                </div>
                <div>
                    {
                        calendarList.data?.sort((prev, next) => (
                            prev.indexNo - next.indexNo
                        )).map((item,index) => <MyCalendarItem 
                                                key={index}
                                                id={item?.id}
                                                memberCode={item?.memberCode}
                                                defaultCalendar={item?.defaultCalendar}
                                                name={item.name}
                                                defaultColorValue={item?.labelColor}
                                                isDefaultCheck={item?.isDefaultCheck}
                                                openStatus={item?.openStatus}
                                                onChange={checkSelectHandler}
                                                radioOnChange={radioOnChangeHandler}
                                                selectOnChange={()=>{}}
                                                colorOnChang={()=>{}}
                                                />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default MyCalendar;