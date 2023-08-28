import { useEffect, useState } from 'react';
import CalendarAdd from '../../../components/calendar/manage/CalendarAdd';
import MyCalendarItem from '../../../components/calendar/manage/MyCalendarItem'

import styles from './myCalendar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_CALENDAR, GET_CALENDAR_LIST, PATCH_CALENDAR_UPDATE, POST_CALENDAR_REGIT } from '../../../modules/CalendarMoudule';
import { getCalendarListAPI, patchCalendarUpdate, patchDefaultCalendarUpdate, postCalendarRegit } from '../../../apis/CalendarAPICalls';
import { MEMBER_CODE } from '../../../apis/APIConfig';

const MyCalendar = () => {


    const [selectItem, setSelectItem] = useState([]);
    const [data, setData] = useState({});
    
    const calendarList = useSelector(state => state.calendarReducer[GET_CALENDAR_LIST]);
    const calendarReducer = useSelector(state => state.calendarReducer);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getCalendarListAPI());
        setSelectItem([]);
        setData({});
    },[
        calendarReducer[POST_CALENDAR_REGIT],
        calendarReducer[PATCH_CALENDAR_UPDATE], 
        calendarReducer[DELETE_CALENDAR],
    ])
    

    const checkSelectHandler = e => {
        if(selectItem.includes(e.target.id)){
            setSelectItem([...selectItem.filter(item => item !== e.target.id)])
        }else{
            setSelectItem([...selectItem, e.target.id]);
        }
    }

    const CalendarAddHandler = e =>{
        if(e.target !== undefined){
            setData({...data, [e.target.name]: e.target.value})
        }else{
            setData({...data, labelColor: e.toHexString()})
        }
    }

    const registCalendarHandler = () => {
        dispatch(postCalendarRegit({data: data}));
    }

    const radioOnChangeHandler = e => {
        dispatch(patchDefaultCalendarUpdate({data: {id:parseInt(e.target.id)}}))
    }

    const publicOnChangeHandler = e => {
        dispatch(patchCalendarUpdate({data: {id:parseInt(e.target.id), openStatus: e.target.value }}))
    }

    return (
        <>  
            <div className={styles.calendar}>
                <div>
                    <CalendarAdd
                        calendarAddData={data}
                        calendarAddHandler={CalendarAddHandler}
                        registCalendarHandler={registCalendarHandler}
                    />
                </div>
                <div>
                    <div className={styles.delete}>
                    </div>
                    {
                        calendarList?.data.filter(item => item.memberCode === parseInt(MEMBER_CODE)
                        ).sort((prev, next) => (
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