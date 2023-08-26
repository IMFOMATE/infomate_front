import { useEffect, useState } from 'react';
import CalendarAdd from '../../../components/calendar/manage/CalendarAdd';
import MyCalendarItem from '../../../components/calendar/manage/MyCalendarItem'

import styles from './myCalendar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CALENDAR_LIST } from '../../../modules/CalendarMoudule';
import { patchCalendarUpdate, patchDefaultCalendarUpdate } from '../../../apis/CalendarAPICalls';

const MyCalendar = () => {


    const [selectItem, setSelectItem] = useState([]);
    const calendarList = useSelector(state => state.calendarReducer[GET_CALENDAR_LIST]);
    const dispatch = useDispatch();

    useEffect(()=> {
        
    },[calendarList])
    

    const checkSelectHandler = e => {
        if(selectItem.includes(e.target.id)){
            setSelectItem([...selectItem.filter(item=>item !== e.target.id)])
        }else{
            setSelectItem([...selectItem, e.target.id]);
        }
    }

    const radioOnChangeHandler = e => {
        console.log(e.target.id);
        dispatch(patchDefaultCalendarUpdate({data: {id:parseInt(e.target.id)}}))
    }

    const publicOnChangeHandler = e => {
        // console.log(e.target.value);
        dispatch(patchCalendarUpdate({data: {id:parseInt(e.target.id), openStatus: e.target.value }}))
    }

    console.log(calendarList);
    return (
        <>  
            <div className={styles.calendar}>
                <div>
                    <CalendarAdd />
                </div>
                <div>
                    <div className={styles.delete}>
                        <div>container</div>
                    </div>
                    {
                        calendarList?.data.sort((prev, next) => (
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
                                                    selectOnChange={publicOnChangeHandler}
                                                />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default MyCalendar;