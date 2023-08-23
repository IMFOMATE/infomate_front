import ButtonOutline from '../../components/common/button/ButtonOutline';
import ButtonInline from '../../components/common/button/ButtonInline';
import CheckBox from '../../components/common/input/CheckBox';
import InputEle from '../../components/common/input/Input';
import SelectEle from '../../components/common/select/SelectEle';
import styles from './scheduleSummary.module.css';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ScheduleProvider } from '../../layouts/CalendarLayout';

const SecheduleSummaryCreate = ({setModal}) => {

    const {schedule, setSchedule} = useContext(ScheduleProvider);

    console.log(schedule);
    const scheduleChangeHanlder = e => {
        const eleName = e.target.name;

        if(e.target.type === 'checkbox'){
                setSchedule({...schedule, [eleName]: e.target.checked})         
        }else if(eleName === 'calendar') {
            setSchedule({...schedule, [eleName]: parseInt(e.target.value)})
        }else{
            setSchedule({...schedule, [eleName]: e.target.value})
        }
    }


    const scheduleResitClickHandler = (e) => {
        setModal(false)
        // api 호출
        setSchedule({})
    }

    const calendarList = [
        {id: 1, value:1, text: '1'},
        {id: 2, value:2, text: '2'},
        {id: 3, value:3, text: '3'},
        {id: 4, value:4, text: '4'},
    ]
    
    const closeHanlder = e => {
        setModal(false);
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.title}>
                    <span style={{fontSize: 25}}>
                     일정 등록
                    </span>
                    <span className={styles.close}>
                        <ButtonInline value={'X'} onClick={()=>setModal({isModal:false})} />    
                    </span>
               </div>
                <div className={styles.content}>
                    <div className={styles.col2}>
                        
                        <label>일정명</label>
                        <InputEle type={'text'} name='title' value={schedule.title} onChange={scheduleChangeHanlder} />
                    
                        <label>일시</label>    
                        <div>
                            {
                                schedule.allDay || <InputEle
                                    type={'datetime-local'} 
                                    style={{margin:'0 0 1vh 0'}}
                                    name='startDate'
                                    value={schedule.startDate}
                                    onChange={scheduleChangeHanlder}
                                />
                            }
                            <InputEle 
                                type={'datetime-local'}
                                name='endDate'
                                value={schedule.endDate}
                                onChange={scheduleChangeHanlder}
                            />
                            <div style={{height:30, alignSelf: 'center'}}>
                                <CheckBox 
                                    type="checkbox"
                                    name="allDay"
                                    isChangeColor={true}
                                    style={{display:'inline',position: 'relative', top:'7px'}}
                                    checked={schedule.allDay}
                                    onChange={scheduleChangeHanlder}
                                />
                                <label for="all-day" style={{display:'inline',position: 'relative', top: '3px',margin: '5px'}}>종일</label>
                            </div>
                        </div>

                        <label>캘린더</label>
                        <div>
                            <SelectEle name='calendar' value={schedule.calendar} options={calendarList} onChange={scheduleChangeHanlder} style={{width:'100%'}} />
                        </div>

                        <label for="address">장소</label>
                        <InputEle name='address' type={'text'} value={schedule.address} onChange={scheduleChangeHanlder}/>
                        
                        <label for="corp-schedule">전사일정</label>
                        <div style={{textAlign: 'left'}}>
                            <CheckBox
                                name='corpSchdl'
                                type="checkbox"
                                isChangeColor={true}
                                style={{position: 'relative', top:'2px'}}
                            />
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <NavLink to='./regist'>
                            <ButtonOutline value={'상세일정등록'} style={{margin:'5px'}} />
                        </NavLink>
                        <ButtonOutline value={'등록'} style={{margin:'5px'}} onClick={scheduleResitClickHandler}  />
                        <ButtonOutline value={'닫기'} isCancel={true} style={{margin:'5px'}} onClick={closeHanlder} />
                    </div>
                </div>
            </div>
        </>
    )
}
    

export default SecheduleSummaryCreate;