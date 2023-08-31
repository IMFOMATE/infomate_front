import styles from './calendarNavItem.module.css'
import CheckBox from '../../common/input/CheckBox';


const CalendarNavItem = ({id, color, calendarName, isCheck, onChange}) => {

   return (
        <div className={styles.item}>
            <div>
                <CheckBox 
                    id={id} 
                    style={{marginRight:10}} 
                    checked={isCheck} 
                    onChange={onChange} 
                    isChangeColor={true} 
                /> 
                <label htmlFor={id}>{calendarName}</label>
            </div>
            <div className={styles.color}>
                <div 
                    className={styles.labelColor}
                    style={{backgroundColor:color}} 
                />
            </div>
        </div>
   ) 
}

export default CalendarNavItem;

