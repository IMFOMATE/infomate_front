import { useEffect, useState } from "react";
import ButtonInline from "../../common/button/ButtonInline";
import InputEle from "../../common/input/Input";
import ColorInput from '../../common/input/InputColor'
import calendarReducer from '../../../modules/CalendarMoudule';
import styles from './CalendarAdd.module.css'
import { useDispatch, useSelector } from "react-redux";
import { postCalendarRegit } from "../../../apis/CalendarAPICalls";
import { useNavigate } from "react-router-dom";

const CalendarAdd = () => {

    const [data, setData] = useState({});
    const calendarMypage = useSelector(state => state.calendarReducer);
    const dispatch = useDispatch();

    useEffect(()=>{
        setData({...data, memberCode: 2}) // 삭제 예정
    },[])
    const changeDataHandler = (e) =>{
        setData({...data, [e.target.name]: e.target.value})
    }

    const registCalendar = () => {
        dispatch(postCalendarRegit({data:data}));
        console.log(calendarMypage);
    }

    const className  = [styles.add].join(' ');

    return (
        <>
            <div className={className}>
                <label style={{fontSize: '1rem', fontWeight: 500}}>캘린더 명</label>
                
                <InputEle 
                    name='name'
                    type="text"
                    value={data.name}
                    onChange={changeDataHandler}
                    style={{height:16}}
                />
                
                <div style={{alignSelf: 'center'}}>
                    <ColorInput 
                        name='labelColor'
                        value={data.labelColor}
                        onChange={changeDataHandler}
                        style={{textAlign:'center', width:35, height:35}}
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