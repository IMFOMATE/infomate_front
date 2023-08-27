import CheckBox from '../../common/input/CheckBox';
import RadioInput from '../../common/input/RadioInput';
import SelectEle from '../../common/select/SelectEle';
import styles from './myCalendarItem.module.css';
import InputEle from '../../common/input/Input';
import icon from '../../common/meterialIcon.module.css'
import { useState } from 'react';
import { ColorPicker } from 'antd';
import { useDispatch } from 'react-redux';
import { patchCalendarUpdate } from '../../../apis/CalendarAPICalls';


const MyCalendarItem = ({id, memberCode, isDefaultCheck, name,
                         defaultCalendar, defaultColorValue,
                         openStatus, chkOnChange, radioOnChange,
                         selectValue, selectOnChange, colorOnChange}) => {

    const [ textModify, setTextModify ] = useState(false);
    const [ textValue, setTextValue ] = useState(name);
    const [ data, setData ] = useState({id: id});
    const dispatch = useDispatch();    

    const changeNameHandler = (e) => {
        setData({...data, name:e.target.value})
    }

    const changeColorHandler = e => {
        setData({...data, labelColor:e.toHexString()})
    }
    const updateHanlder = () =>{
        if(textModify) {
            dispatch(patchCalendarUpdate({data}));
        }
        setTextModify(!textModify);
    }

    return (
        <div className={styles.item}>
            <div style={{textAlign: 'center'}}>
                <CheckBox
                    id={id}
                    isChangeColor={true}
                    defaultChecked={isDefaultCheck}
                    // value={}
                    onChange={chkOnChange}
                    style={{height:20, width:20}}
                />
            </div>
            <div>
                <div className={styles.itemFont}>

                    <InputEle
                        name='name'
                        value={ data?.name !== undefined? data?.name : textValue}
                        onChange={changeNameHandler}
                        style={{display:'inline-block', marginRight:10, minWidth:100}}
                        disabled={!textModify}
                    />

                    <ColorPicker
                        value={data?.labelColor || defaultColorValue}
                        onChangeComplete={changeColorHandler}
                    />

                    <button
                        className={icon.meterialIcon}
                        style={{color:'var(--color-middle)', display:'inline'}}
                        onClick={updateHanlder}>
                        {textModify? 'save': 'edit'}
                    </button>
                </div>
            </div>
            <div>
               <RadioInput 
                    id={id}
                    name={memberCode}
                    defaultChecked={defaultCalendar}
                    onChange={radioOnChange}
                    style={{verticalAlign: 'middle', alignSelf: 'center', display: 'block'}}
                />
            </div>
            <div style={{textAlign: 'center'}}>
                <SelectEle
                    id={id}
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