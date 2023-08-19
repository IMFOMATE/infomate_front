import CheckBox from '../../common/input/CheckBox';
import ColorInput from '../../common/input/InputColor';
import RadioInput from '../../common/input/RadioInput';
import SelectEle from '../../common/select/SelectEle'
import styles from './myCalendarItem.module.css'

const MyCalendarItem = (props) => {
    return (
        <div className={styles.item}>
            <div style={{textAlign: 'center'}}>
                <CheckBox isChangeColor={true} value={props.checkValue}style={{height:20, width:20, position:'relative', top:'3px'}}/>
            </div>
            <div>
                <div className={styles.itemFont}>
                    <label style={{marginRight:10, fontSize:'1rem'}}>{props.text}</label>
                    <ColorInput value={props.colorValue} style={{height:30, width:30, position:'relative', top:'2px'}}/>
                </div>
            </div>
            <div>
               <RadioInput name={props.name} checked={props.defaultValue} style={{verticalAlign: 'middle', alignSelf: 'center', display: 'block'}} />
            </div>
            <div style={{textAlign: 'center'}}>
                <SelectEle className={styles.itemSelect} data={[
                    {id:1, value:'open', text:'공개'},
                    {id:2, value:'private', text:'비공개'},
                    ]} style={{height:35, padding: 0}}/>
            </div>
        </div>        
    )
}


export default MyCalendarItem;