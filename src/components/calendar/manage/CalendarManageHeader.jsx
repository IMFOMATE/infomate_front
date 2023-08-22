import styles from './CalendarManageHeader.module.css';

const CalendarManageHeader = (props) => {
    
    return (
        <h1 className={styles.header}
            style={props.style}
            value={props.value}>
            {props?.value ? props.value : '테스트'}
        </h1>
    )
}

export default CalendarManageHeader;