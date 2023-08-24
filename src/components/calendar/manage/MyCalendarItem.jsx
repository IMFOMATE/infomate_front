import CheckBox from '../../common/input/CheckBox';
import ColorInput from '../../common/input/InputColor';
import RadioInput from '../../common/input/RadioInput';
import SelectEle from '../../common/select/SelectEle';
import styles from './myCalendarItem.module.css';
import InputEle from '../../common/input/Input';
import icon from '../../common/meterialIcon.module.css'
import { useState } from 'react';


const MyCalendarItem = ({memberCode, isDefaultCheck, name,
                         defaultCalendar, defaultColorValue,
                         openStatus, chkOnChange, radioOnChange,
                         selectValue, selectOnChange, colorOnChange}) => {

    const [textModify, setTextModify] = useState(false);
    const [textValue, setTextValue] = useState(name);

    const textModifyHandler = () => {

        // 캘린더 이름 변경 api 호출

        setTextModify(!textModify);
    }

    const valuesChangeHandler = e => {
        setTextValue(e.target.value)
    }

    return (
        <div className={styles.item}>
            <div style={{textAlign: 'center'}}>
                <CheckBox
                    id={memberCode}
                    isChangeColor={true}
                    defaultChecked={isDefaultCheck}
                    onChange={chkOnChange}
                    style={{height:20, width:20}}
                />
            </div>
            <div>
                <div className={styles.itemFont}>

                    <InputEle
                        value={textValue}
                        onChange={valuesChangeHandler}
                        style={{display:'inline-block', marginRight:10, minWidth:100}}
                        disabled={!textModify}
                    />

                    <ColorInput 
                        defaultValue={defaultColorValue}
                        onChange={colorOnChange}
                        style={{height:27, width:27, position:'relative',
                                 top:'3px', display:'inline-block'}}
                    />

                    <button
                        className={icon.meterialIcon}
                        style={{color:'var(--color-middle)', display:'inline'}}
                        onClick={textModifyHandler}>
                        {textModify? 'save': 'edit'}
                    </button>
                </div>
            </div>
            <div>
               <RadioInput 
                    name={memberCode}
                    defaultChecked={defaultCalendar}
                    onChange={radioOnChange}
                    style={{verticalAlign: 'middle', alignSelf: 'center', display: 'block'}}
                />
            </div>
            <div style={{textAlign: 'center'}}>
                <SelectEle
                    className={styles.itemSelect}
                    defaultValue={openStatus}
                    value={selectValue}
                    onChange={selectOnChange}
                    options={[
                        {id:1, value:true, text:'공개'},
                        {id:2, value:false, text:'비공개'},
                    ]}
                    style={{height:'2rem', padding: 0}}
                />
            </div>
        </div>        
    )
}


export default MyCalendarItem;