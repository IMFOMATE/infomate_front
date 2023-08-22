import styles from './reminderSchedule.module.css'


const RemiderSchedule = ({toDay, title, endTime}) => {
    const week = ['일','월','화','수','목','금','토'];
    const dayOfWeek = week[toDay.getDay()];
    const className = [
        styles.container,
        toDay.toLocaleDateString() === new Date().toLocaleDateString() && styles.today
    ].join(' ');
    
    return (
        <div className={className}>
            <div className={styles.list}> 
                <div>
                    <div className={styles.day}>
                        <div style={{fontSize:'1rem'}}>{toDay.getDate()}</div>
                        <div>{dayOfWeek+'요일'}</div>
                    </div>
                    <div className={styles.content}>
                        <div style={{fontWeight:700}}>{title}</div>
                        <div style={{color:'gray'}}>
                             <span>{endTime || '등록된 일정이 없습니다.'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemiderSchedule;