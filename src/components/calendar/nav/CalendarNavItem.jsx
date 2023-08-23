import styles from './calendarNavItem.module.css'
import CheckBox from '../../common/input/CheckBox';
import InputColor from '../../common/input/InputColor';


const CalendarNavItem = ({id, color, calendarName, isCheck, onChange}) => {

   return (
        <div className={styles.item}>
            <div>
                <CheckBox id={id} style={{marginRight:10}} checked={isCheck} onChange={onChange}/> 
                <label for={id}>{calendarName}</label>
            </div>
            <div className={styles.color}>
                <InputColor value={color} style={{height:30, width:30}} isDisabled={true}/>
            </div>
        </div>
   ) 
}

export default CalendarNavItem;

