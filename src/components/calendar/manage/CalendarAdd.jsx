import { useEffect, useState } from "react";
import ButtonInline from "../../common/button/ButtonInline";
import InputEle from "../../common/input/Input";
import styles from './CalendarAdd.module.css'
import { useDispatch } from "react-redux";
import { getCalendarListAPI, postCalendarRegit } from "../../../apis/CalendarAPICalls";
import { ColorPicker } from "antd";


const CalendarAdd = () => {

    const [data, setData] = useState({});
    const dispatch = useDispatch();
    

    useEffect(()=>{
    },[])

    const changeDataHandler = (e) =>{
        if(e.target !== undefined){
            setData({...data, [e.target.name]: e.target.value})
        }else{
            setData({...data, labelColor: e.toHexString()})
        }
    }

    const registCalendar = () => {
        dispatch(postCalendarRegit({data: data}));
        document.location.reload();
    }

    return (
        <>
            <div className={styles.add}>
                <label style={{fontSize: '1rem', fontWeight: 500}}>캘린더 명</label>
                
                <InputEle 
                    name='name'
                    type="text"
                    value={data.name}
                    onChange={changeDataHandler}
                    style={{height:16}}
                />
                
                <div style={{alignSelf: 'center'}}>
                    <ColorPicker 
                        defaultValue={'#000000'}
                        value={data.labelColor}
                        onChangeComplete={changeDataHandler}
                        
                    />
                </div>
                
                <ButtonInline
                    value={'추가'} 
                    onClick={registCalendar}
                    style={{height: 30, width:60}} />
            </div>
        </>
    )
}

export default CalendarAdd;