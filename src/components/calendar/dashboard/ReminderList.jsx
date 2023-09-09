import { useDispatch, useSelector } from 'react-redux';
import styles from './reminderList.module.css';
import ReminderSchedule from './ReminderSchedule';
import { DELETE_SCHEDULE, GET_SCHEDULE_DETAIL, GET_SCHEDULE_REMINDER, PATCH_SCHEDULE, POST_SCHEDULE_REGIT } from '../../../modules/ScheduleMoudule';
import { useEffect } from 'react';
import { getScheduleReminder } from '../../../apis/ScheduleAPICalls';
import { LoadingSpiner } from '../../common/other/LoadingSpiner';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ko';

// dayjs.locale('ko');
dayjs.extend(utc);

const  ReminderList = () => {

    const data = useSelector(state => state.scheduleReducer[GET_SCHEDULE_REMINDER]);
    const scheduleReducer = useSelector(state => state.scheduleReducer);
    const dispatch = useDispatch();

    useEffect(()=>{
        // if(data) return;
        dispatch(getScheduleReminder());
        dispatch(dispatch => dispatch({type: GET_SCHEDULE_DETAIL, payload: '' }))

    },[
        scheduleReducer[POST_SCHEDULE_REGIT],
        scheduleReducer[PATCH_SCHEDULE],
        scheduleReducer[DELETE_SCHEDULE],
    ])
    console.log(data);
    if(!data) return <LoadingSpiner />

    return (
        <div className={styles.container}>
            <div>
                {
                    Array(4).fill(0).map((item, index) => {
                    const day = dayjs().add(index,'day')     
                    const isSameItem = data.data
                            .filter(item => 
                                dayjs(dayjs(item.startDate).format('YYYY-MM-DD')).isSame(dayjs(day).format('YYYY-MM-DD')))
                            .map(item => item)[0];
                    return <ReminderSchedule
                                key={index}
                                id={isSameItem?.id}
                                toDay={day} 
                                title={isSameItem?.title} 
                                date={ (isSameItem?.startDate || isSameItem?.endDate) 
                                    && `${dayjs(isSameItem?.startDate).format('MM-DD HH:mm')} 
                                    ~ ${dayjs(isSameItem?.endDate).format('MM-DD HH:mm')}`}
                            />
                })
                }
            </div>
        </div>
    )
}

export default ReminderList;