import styles from './calendarMagnageFavoriteFollowerHeader.module.css'

const CalendarMagnageFavoriteFollowerHeader = () => {
    const className  = [styles.fowHdGrid].join(' ');

    return(
        <div className={className}>
            <div>
                <div>직원 이름(직함)</div>
                <div>캘린더 이름</div>
                <div>날짜</div>
            </div>
            <div>
                <div>승인</div>
            </div>
        </div>

    )
}

export default CalendarMagnageFavoriteFollowerHeader;

