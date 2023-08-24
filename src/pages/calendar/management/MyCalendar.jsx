import { useEffect, useState } from 'react';
import CalendarAdd from '../../../components/calendar/manage/CalendarAdd';
import MyCalendarItem from '../../../components/calendar/manage/MyCalendarItem'

import styles from './myCalendar.module.css';

const MyCalendar = () => {


    const [selectItem, setSelectItem] = useState([]);

    let data = [];

    useEffect(()=> {
        

    },[])
    

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

    data = [...data,
        {id:1,name:'캘린더1',labelColor: '#FF0000', defaultCalendar:true, memberCode: 1, openStatus: false, indexNo: 1},
        {id:2,name:'캘린더2',labelColor: '#FF0000', defaultCalendar:true, memberCode: 1, openStatus: false, indexNo: 2},
        {id:3,name:'캘린더3',labelColor: '#FF0000', defaultCalendar:true, memberCode: 1, openStatus: false, indexNo: 10},
        {id:4,name:'캘린더4',labelColor: '#FF0000', defaultCalendar:true, memberCode: 1, openStatus: false, indexNo: 11},
        {id:5,name:'캘린더5',labelColor: '#FF0000', defaultCalendar:true, memberCode: 1, openStatus: false, indexNo: 5},
        {id:6,name:'캘린더6',labelColor: '#FF0000', defaultCalendar:true, memberCode: 1, openStatus: false, indexNo: 6},
    ] // 테스트

    return (
        <>  
            <div className={styles.calendar}>
                <div>
                    <CalendarAdd />
                </div>
                <div>
                    {
                        data?.sort((prev, next) => (
                            prev.indexNo - next.indexNo
                        )).map((item,index) => <MyCalendarItem 
                                                key={index}
                                                id={item?.id}
                                                memberCode={item?.memberCode}
                                                defaultCalendar={item?.defaultCalendar}
                                                name={item.name}
                                                defaultColorValue={item?.labelColor}
                                                isDefaultCheck={item?.isDefaultCheck}
                                                openStatus={item?.openStatus}
                                                onChange={checkSelectHandler}
                                                radioOnChange={radioOnChangeHandler}
                                                selectOnChange={()=>{}}
                                                colorOnChang={()=>{}}
                                                />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default MyCalendar;