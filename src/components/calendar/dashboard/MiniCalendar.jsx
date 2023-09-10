import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ko';
import { Day } from './simpleCalendar';
import { useEffect, useState } from "react";
import styles from './miniCalendar.module.css';
import { useDispatch, useSelector } from "react-redux";
import { DELETE_SCHEDULE, GET_SCHEDULE_COUNT, PATCH_SCHEDULE, POST_SCHEDULE_REGIT } from "../../../modules/ScheduleMoudule";
import { getScheduleDayPerCount } from "../../../apis/ScheduleAPICalls";
import { LoadingSpiner } from "../../common/other/LoadingSpiner";
import { type } from "@testing-library/user-event/dist/type";
import { useNavigate } from "react-router-dom";

dayjs.locale('ko');
dayjs.extend(utc);

const MiniCalendar = () => {

    const [ calendar, setCalendar] = useState([]);
    const [ curMonth, setMonth ] = useState(dayjs());
    const data = useSelector(state => state.scheduleReducer[GET_SCHEDULE_COUNT]);
    const scheduleReducer = useSelector(state => state.scheduleReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const startDate = curMonth.startOf("month").startOf('week');
    const endDate = dayjs().clone().endOf("month").endOf('week');
    let day = startDate.clone().subtract(1, "day");
    const dateLabel = ['일','월','화','수','목','금','토'];

    useEffect(()=>{
        setCalendar(...[createCalendar(day)]);
        
        // if(data) return;        
        dispatch(getScheduleDayPerCount({startDay: startDate, endDay: endDate}));
        
        return ()=>{
            setCalendar([]);
        }
    },[
        scheduleReducer[POST_SCHEDULE_REGIT],
        scheduleReducer[PATCH_SCHEDULE],
        scheduleReducer[DELETE_SCHEDULE],
    ]
    )
    
    const createCalendar = (day) => {
        let tempList = [];
        while (day.isBefore(endDate, 'day')) {
            tempList.push(
                Array(7)
                    .fill(0)
                    .map(() => {
                        day = day.add(1, 'day');
                        return day;
                    })
            )
        }
        return tempList;
    }

    if(!data) return <LoadingSpiner />

    

    return (
        <>
        <div className={styles.container}> 
            <div className={styles.header}>
                <div>
                    { curMonth.format('YYYY. MM') }
                </div>
            </div>

            <table className={styles.table}>
                <thead>
                    {
                        dateLabel.map((item, index) => 
                        <Day 
                            key={index}
                            value={item}
                            isHeader={true}
                            isSun={index === 0}
                            isSur={index === 6}
                        />)
                    }
                </thead>
                <tbody>
                    {
                        calendar.map((item1, index) => 
                            <tr key={index}>{item1.map((item2,index) => 
                                <Day
                                    key={index}
                                    value={item2} 
                                    data={data.data.filter(item => item.date === item2.format('YYYY-MM-DD')).map(item=> item)}
                                    today={item2.format('D') === dayjs().format('D')} 
                                    isCurMonth={item2.format('MM') === curMonth.format('MM')}
                                    isSun={index === 0}
                                    isSur={index === 6}
                                    onClick={(e)=>
                                        navigate(`/calendar?date=${e.target.id}`)
                                    }
                                />
                            )}</tr>
                        )
                    }
                </tbody>
            </table>
        </div>
        </>
    )
}

export default MiniCalendar;