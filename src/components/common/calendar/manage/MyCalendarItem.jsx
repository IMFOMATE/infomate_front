import CheckBox from '../../input/CheckBox';
import ColorInput from '../../input/InputColor';
import RadioInput from '../../input/RadioInput';
import SelectEle from '../../select/SelectEle'
import './myCalendarItem.css'

const MyCalendarItem = (props) => {
    return (
        <div class="c-mycalendar-list-item">
            <div style={{textAlign: 'center'}}>
                <CheckBox isChangeColor={true} value={props.checkValue}style={{height:25, width:25, position:'relative', top:'3px'}}/>
            </div>
            <div>
                <div className='c-mycalendar-list-item-font'>
                    <label style={{marginRight:10}}>{props.text}</label>
                    <ColorInput value={props.colorValue} style={{height:30, width:30, position:'relative', top:'2px'}}/>
                </div>
            </div>
            <div>
               <RadioInput name={props.name} checked={props.defaultValue} />
            </div>
            <div style={{textAlign: 'center'}}>
                <SelectEle class="c-mycalendar-list-item-select" data={[
                    {id:1, value:'open', text:'공개'},
                    {id:2, value:'private', text:'비공개'},
                    ]} style={{height:35, padding: 0}}/>
            </div>
        </div>        
    )
}


export default MyCalendarItem;