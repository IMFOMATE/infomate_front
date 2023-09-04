import styles from './reminderSchedule.module.css'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(utc);

const RemiderSchedule = ({toDay, title, date}) => {
    const week = ['일','월','화','수','목','금','토'];
    const dayOfWeek = toDay.format('dddd')
    const className = [
        styles.container,
        dayjs(dayjs().format('YYYY-MM-DD')).isSame(toDay.format('YYYY-MM-DD')) && styles.today
    ].join(' ');

    
    return (
        <div className={className}>
            <div className={styles.list}> 
                <div>
                    <div className={styles.day}>
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