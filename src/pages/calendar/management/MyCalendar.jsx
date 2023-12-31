import { useEffect, useState } from 'react';
import CalendarAdd from '../../../components/calendar/manage/CalendarAdd';
import MyCalendarItem from '../../../components/calendar/manage/MyCalendarItem'

import styles from './myCalendar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_CALENDAR, GET_CALENDAR_LIST, PATCH_CALENDAR_UPDATE, POST_CALENDAR_REGIT } from '../../../modules/CalendarMoudule';
import { getCalendarListAPI, patchCalendarUpdate, patchDefaultCalendarUpdate, postCalendarRegit } from '../../../apis/CalendarAPICalls';
import { NotResultData } from '../../common/Error';
import { LoadingSpiner } from '../../../components/common/other/LoadingSpiner';
import { message } from 'antd';

const MyCalendar = () => {

    const [data, setData] = useState({});
    
    const calendarList = useSelector(state => state.calendarReducer[GET_CALENDAR_LIST]);
    const calendarReducer = useSelector(state => state.calendarReducer);
    const member = JSON.parse(window.localStorage.getItem('authToken'));
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getCalendarListAPI());
        setData({labelColor:'#000000'});
    },[
        calendarReducer[POST_CALENDAR_REGIT],
        calendarReducer[PATCH_CALENDAR_UPDATE], 
        calendarReducer[DELETE_CALENDAR],
    ])

    if(!calendarList) return <LoadingSpiner />
    if(calendarList === null) return <NotResultData />

    const CalendarAddHandler = e =>{
        if(e.target !== undefined){
            setData({...data, [e.target.name]: e.target.value})
        }else{
            setData({...data, labelColor: e.toHexString()})
        }
    }

    const registCalendarHandler = () => {
        if(!data?.name) return message.error('누락된 필드가 존재 합니다');
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
                        calendarList?.data.filter(item => item.memberCode === parseInt(member.memberCode)
                        ).sort((prev, next) => (
                            prev.indexNo - next.indexNo
                        )).map((item,index) => <MyCalendarItem 
                                                    key={item.id}
                                                    id={item.id}
                                                    min={index === 0}
                                                    max={index === (calendarList.data.filter(item => item.memberCode === parseInt(member.memberCode)).length - 1)}
                                                    memberCode={item.memberCode}
                                                    defaultCalendar={item.defaultCalendar}
                                                    name={item.name}
                                                    defaultColorValue={item.labelColor}
                                                    openStatus={item.openStatus}
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