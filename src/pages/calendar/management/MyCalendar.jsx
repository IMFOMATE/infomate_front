import { useState } from 'react';
import CalendarAdd from '../../../components/calendar/manage/CalendarAdd';
import MyCalendarItem from '../../../components/calendar/manage/MyCalendarItem'

import styles from './myCalendar.module.css';

const MyCalendar = (props) => {


    const [selectItem, setSelectItem] = useState([]);


    const data =[
        {id:1,text:'캘린더',color: '#FF0000',isDefaultRadio:true, memberCode: 1},        
        {id:2,text:'캘린더',color: '#FF0000',isDefaultRadio:false, memberCode: 1},        
        {id:3,text:'캘린더',color: '#FF0000',isDefaultRadio:false, memberCode: 1},        
        {id:4,text:'캘린더',color: '#FF0000',isDefaultRadio:false, memberCode: 1},        
        {id:5,text:'캘린더',color: '#FF0000',isDefaultRadio:false, memberCode: 1},        
        {id:6,text:'캘린더',color: '#FF0000',isDefaultRadio:false, memberCode: 1},        
    ] // 테스트

    const checkSelectHandler = e => {
        if(selectItem.includes(e.target.id)){
            setSelectItem([...selectItem.filter(item=>item !== e.target.id)])
        }else{
            setSelectItem([...selectItem, e.target.id]);
        }
    }

    const radioOnChangeHandler = e => {
        
        console.log(e.target.id);
    }



    return (
        <>  
            <div className={styles.calendar}>
                <div>
                    <CalendarAdd />
                </div>
                <div>
                    {
                        data?.map((item,index) => <MyCalendarItem 
                                                key={index}
                                                id={item?.id}
                                                radioName={item?.memberCode}
                                                isDefualtRadio={item.isDefaultRadio}
                                                text={item.text}
                                                defaultColorValue={item?.colorValue}
                                                isDefaultCheck={item?.isDefaultCheck}
                                                isPubilc={false}
                                                onChange={checkSelectHandler}
                                                radioOnChange={radioOnChangeHandler}
                                                selectOnChange={()=>{}}
                                                colorOnChang={()=>{}}
                                                />
                        )
                    }
                    
                    <MyCalendarItem id={1} memberCode='1' isDafualtRadio={true} text='회사 캘린더' colorValue={'#FF0000'} isCheck={true}/> {/* 예제 */}
                </div>
            </div>
        </>
    )
}

export default MyCalendar;