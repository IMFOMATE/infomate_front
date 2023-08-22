import CheckBox from '../../common/input/CheckBox';
import styles from './calendarMagnageFavoriteFollowerHeader.module.css'

const CalendarMagnageFavoriteFollowerHeader = ({id, memberName, calendarName, approve, rank, state}) => {
    const className  = [styles.fowHdGrid].join(' ');

    return(
        <div className={className} style={{borderBottom:0, padding:'5px 0 5px 0'}} >
            <div>
                <div>
                    <CheckBox id={id} isChangeColor={true} />
                </div>
                <div>{`${memberName}(${rank})`}</div>
                <div>{calendarName}</div>
                <div>{approve}</div>
            </div>
            <div>
                <div>{state}</div>
            </div>
        </div>

    )
}

export default CalendarMagnageFavoriteFollowerHeader;

