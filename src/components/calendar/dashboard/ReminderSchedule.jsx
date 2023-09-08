import styles from './reminderSchedule.module.css'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ko';
import { useNavigate } from 'react-router-dom';

dayjs.locale('ko');
dayjs.extend(utc);

const RemiderSchedule = ({toDay, title, date, id }) => {
    const navigate = useNavigate();
    const dayOfWeek = toDay.format('dddd')
    const className = [
        styles.container,
        dayjs(dayjs().format('YYYY-MM-DD')).isSame(toDay.format('YYYY-MM-DD')) && styles.today
    ].join(' ');

    
    const onClickHandler = () => {
        id && navigate(`/calendar/regist?scheduleId=${id}&isread=true`)
    }
    return (
        <div className={className} onClick={onClickHandler}>
            <div className={styles.list}> 
                <div>
                    <div className={[styles.day, dayOfWeek === '토요일' && styles.sur, dayOfWeek ==='일요일' && styles.sun ].join(' ')}>
                        <div style={{fontSize:'1rem'}}>{toDay.format('D')}</div>
                        <div>{dayOfWeek}</div>
                    </div>
                    <div className={styles.content}>
                        <div style={{fontWeight:700}}>{title}</div>
                        <div style={{color:'gray'}}>
                             <span>{date || '등록된 일정이 없습니다.'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemiderSchedule;