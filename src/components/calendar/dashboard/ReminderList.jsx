import { useDispatch, useSelector } from 'react-redux';
import styles from './reminderList.module.css';
import ReminderSchedule from './ReminderSchedule';
import { GET_SCHEDULE_REMINDER } from '../../../modules/ScheduleMoudule';
import { useEffect } from 'react';
import { getScheduleReminder } from '../../../apis/ScheduleAPICalls';
import { LoadingSpiner } from '../../common/other/LoadingSpiner';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(utc);

const ReminderList = () => {

    const data = useSelector(state => state.scheduleReducer[GET_SCHEDULE_REMINDER]);
    const dispath = useDispatch();
    const today = dayjs();
    useEffect(()=>{
        if(data) return;
        dispath(getScheduleReminder());

    },[data])

    if(!data) return <LoadingSpiner />

    console.log(data.data.length);

    
    return (
        <div style={{margin:100}}>
        <div className={styles.container}>
            {
                data.data?.map((item, index) => 
                    <ReminderSchedule 
                        key={index} 
                        toDay={dayjs(item.startDate)} 
                        title={item.title} 
                        date={`${dayjs(item.startDate).format('MM-DD HH:mm')} ~ ${dayjs(item.endDate).format('MM-DD HH:mm')}`}
                    />
                )
            }
            {
                Array(3 - data.data.length).fill(0).map((item, index)=>
                    <ReminderSchedule key={index} toDay={dayjs().add(index+1,'day')} />
                )
            }
        </div>
        </div>
    )
}

export default ReminderList;