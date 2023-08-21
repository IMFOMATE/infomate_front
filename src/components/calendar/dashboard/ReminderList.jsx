import styles from './reminderList.module.css';
import ReminderSchedule from './ReminderSchedule';

const ReminderList = ({data}) => {
    data = [
        {toDay:new Date()},
        {toDay:new Date(new Date().setDate(new Date().getDate()+1))},
        {toDay:new Date(new Date().setDate(new Date().getDate()+2))}
    ]
    
    return (
        <div style={{margin:100}}>
        <div className={styles.container}>
            {data.map(item => (
                    <ReminderSchedule 
                        toDay={item.toDay}
                        title={item.title}
                    endTime={item.endTime}
                    />
            ))}
        </div>
        </div>
    )
}

export default ReminderList;