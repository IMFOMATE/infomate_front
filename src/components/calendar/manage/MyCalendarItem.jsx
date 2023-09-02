import RadioInput from '../../common/input/RadioInput';
import SelectEle from '../../common/select/SelectEle';
import styles from './myCalendarItem.module.css';
import InputEle from '../../common/input/Input';
import icon from '../../common/meterialIcon.module.css'
import { useState } from 'react';
import { ColorPicker } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteCalendar, patchCalendarUpdate, patchChangeCalendarIndexNo } from '../../../apis/CalendarAPICalls';
import MeterialIcon from '../../common/meterialIcon.module.css'


const MyCalendarItem = ({id, memberCode, name,
                        min, max,
                         defaultCalendar, defaultColorValue,
                         openStatus, radioOnChange,
                         selectValue, selectOnChange}) => {

    const [ textModify, setTextModify ] = useState(false);
    const [ textValue, setTextValue ] = useState(name);
    const [ data, setData ] = useState({id: id});
    const dispatch = useDispatch();    

    const changeNameHandler = (e) => {
        setData({...data, name:e.target.value})
    }

    const changeColorHandler = e => {
        // setData({...data, labelColor:e.toHexString()})
        dispatch(patchCalendarUpdate({data:{...data, labelColor:e.toHexString()}}));
    }
    const updateHanlder = () =>{
        if(textModify) {
            dispatch(patchCalendarUpdate({data}));
        }
        setTextModify(!textModify);
    }

    const deleteHandler = e => {
        dispatch(deleteCalendar({data: [parseInt(e.target.id)]}));
    }

    const changeIndexNo = (direction) =>{
        dispatch(patchChangeCalendarIndexNo({data: {id:id,direction:direction}}));
        
    }

    
    return (
    <>
        <div className={styles.item}>
            <div className={styles.seqBtn}>
                {
                    min ||
                    <button onClick={()=>changeIndexNo('prev')}><span className={MeterialIcon.meterialIcon}>arrow_drop_up</span></button>
                }
                {
                    min || max ? '' : <div className={styles.separator}></div>
                }
                {
                    max ||
                    <button onClick={()=>changeIndexNo('next')}><span className={MeterialIcon.meterialIcon}>arrow_drop_down</span></button>
                }
            </div>
            <div style={{textAlign: 'center'} }>
                <ColorPicker
                        value={data?.labelColor || defaultColorValue}
                        onChangeComplete={changeColorHandler}
                />
            </div>
            <div>
                <div className={styles.itemFont}>
                    <InputEle
                        name='name'
                        
                        value={ data?.name !== undefined? data?.name : defaultCalendar ? `${textValue} (기본)`: textValue}
                        onChange={changeNameHandler}
                        style={{display:'inline-block', marginRight:10, minWidth:100}}
                        disabled={!textModify}
                    />

                    <button
                        className={icon.meterialIcon}
                        style={{color:'var(--color-middle)', display:'inline'}}
                        onClick={updateHanlder}
                    > {textModify? 'save': 'edit'}
                    </button>    

                    
                    <button
                        id={id}
                        className={icon.meterialIcon}
                        style={{color:'var(--color-middle)', display:'inline'}}
                        onClick={deleteHandler}
                    > delete
                    </button>
                </div>
                    
            </div>
            <div>
               <RadioInput 
                    id={id}
                    name={memberCode}
                    defaultChecked={defaultCalendar}
                    cheked={defaultCalendar}
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
        </>  
    )
}


export default MyCalendarItem;