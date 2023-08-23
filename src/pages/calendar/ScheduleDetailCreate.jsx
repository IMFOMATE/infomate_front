import styles from './scheduleDetailCreate.module.css'
import InputEle from '../../components/common/input/Input'
import ButtonInline from '../../components/common/button/ButtonInline';
import ButtonOutline from '../../components/common/button/ButtonOutline';
import AttendUser from '../../components/calendar/AttendUser';
import CheckBox from '../../components/common/input/CheckBox';
import TextareaEl from '../../components/common/input/Textarea';
import SelectEle from '../../components/common/select/SelectEle';
import DaumPostcode from 'react-daum-postcode';
import {useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { ScheduleProvider } from '../../layouts/CalendarLayout';


const ScheduleDetilaCreate = () => {

    const [postToggle, setPostToggle] = useState(false);
    const [mode, setMode] = useState('create')

    const {schedule, setSchedule} = useContext(ScheduleProvider);

    const [search] = useSearchParams();

    const scheduleId = search.get('scheduleId');

    const modalRef = useRef(); // 다음 우편번호 검색 
    const addressRef = useRef(); // 주소 input

    useEffect(()=>{
        if(scheduleId === null) return;
        // api 호출 성공시 setMode('read')
    },[])

    const isEleDisabled = () => {
        return mode === 'read'? true : false; 
    }

    const postOutArea = e =>{
        if(modalRef.current === e.target)
            setPostToggle(false)
    }

    const daumPostHandler = (e) => {
        setPostToggle(false);
        setSchedule({...schedule, address: e.address})
        addressRef.current.focus();
    }

    const scheduleChangeHanlder = e => {
        const eleName = e.target.name;

        if(e.target.type === 'checkbox'){
                setSchedule({...schedule, [eleName]: e.target.checked})        
        }else if(eleName === 'participantList'){
            setSchedule({...schedule, [eleName]: [...schedule.participantList,  e.target.value]})
        }else if(eleName === 'calendar') {
            setSchedule({...schedule, [eleName]: parseInt(e.target.value)})
        }else{
            setSchedule({...schedule, [eleName]: e.target.value})
        }
    }

    const removeParticipant = e => {
        setSchedule({...schedule, participantList:  
            schedule.participantList.filter(item => 
                parseInt(item.memberCode) !== parseInt(e.target.id))
        })
        
    }
    
    const calendarList = [
        {id: 1, value:1, text: '1'},
        {id: 2, value:2, text: '2'},
        {id: 3, value:3, text: '3'},
        {id: 4, value:4, text: '4'},
    ]
    

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.title}>
                    <h3>일정 등록</h3>
                </div>
                <div>
                    <div className={[styles.subItem, styles.subCol2].join(' ')}>
                        <InputEle name='title' type="text" placeholder='제목을 입력하세요' value={schedule.title} onChange={scheduleChangeHanlder} disabled={isEleDisabled()}/>
                        <div className={styles.optionItem}>
                            <div style={{'margin-right': 10, verticalAlign:'middle'}}>
                                {/* 사용여부 재 결정
                                 <CheckBox id="private" name={schedule.} isChangeColor={true}/>
                                <label className={styles.chkLabel} for="private">비공개</label> 
                                */}
                            </div>
                            <div>
                                <CheckBox name="important" isChangeColor={true} checked={schedule.important} onChange={scheduleChangeHanlder} disabled={isEleDisabled()}/>
                                <label className={styles.chkLabel} for="importent">중요</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                        </div>
                        <div className={[styles.subItem, styles.subCol3].join(' ')}>
                            {!schedule.allDay && <InputEle type="datetime-local" name='startDate' value={schedule.startDate} onChange={scheduleChangeHanlder} disabled={isEleDisabled()}/>}
                            <InputEle type="datetime-local" name='endDate' value={schedule.endDate} onChange={scheduleChangeHanlder} disabled={isEleDisabled()}/>
                            <div className={styles.subCol2}>
                                <div style={{'margin-right': 10}}>
                                    <CheckBox name='allDay' isChangeColor={true} checked={schedule.allDay} onChange={scheduleChangeHanlder} disabled={isEleDisabled()} />
                                    <label className={styles.chkLabel} for="all-day">종일</label>
                                </div>
                                <div>
                                    <CheckBox name="repeat" isChangeColor={true} checked={schedule.repeat} onChange={scheduleChangeHanlder} disabled={isEleDisabled()} />
                                    <label className={styles.chkLabel} for="circle">반복</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className={styles.container}>
                    <label for="corp-schedule">전사일정</label>
                    <div className={styles.extendEle}>
                        <CheckBox name="corpSchdl" isChangeColor={true} checked={schedule.corpSchdl} onChange={scheduleChangeHanlder} disabled={isEleDisabled()}/>
                    </div>
                    <label for="corp-schedule">캘린더</label>
                    <div className={styles.extendEle}>
                        <SelectEle name='calendar' options={calendarList} value={schedule.calendar}  onChange={scheduleChangeHanlder} disabled={isEleDisabled()}/>
                    </div>
                    <label>참석자</label>
                    <div style={{margin:'10px 0 10px 0'}}>
                        {
                            schedule.participantList?.map((item, index)=>(
                                <AttendUser key={index} id={item.memberCode} value={item.memberName} onClick={removeParticipant} disabled={isEleDisabled()}/>))
                        }
                        
                        <ButtonOutline value='+' onClick={()=>{}} style={{borderRadius:'50px'}}/>
                    </div>
                    
                    <label for="address">장소</label>
                    <div className={styles.containerCol}>
                        <InputEle ref={addressRef} name='address' type="text" value={schedule.address} onChange={scheduleChangeHanlder} disabled={isEleDisabled()}/>
                        
                        {
                            mode === 'read' ||
                            <ButtonInline value={'주소검색'} onClick={()=>setPostToggle(true)} style={{height:30, width:80, display:'inline'}} />
                        }
                        {
                            postToggle && 
                            <div ref={modalRef} className={styles.modalPost} onClick={postOutArea}>
                                <div className={styles.post}>
                                    <DaumPostcode onComplete={daumPostHandler} />
                                </div>
                            </div>
                        }
                    </div>

                    <label>내용</label>
                    <div>
                        <TextareaEl rows="15" maxLength={2000} style={{width:'95%'}} name='content' value={schedule.content} onChange={scheduleChangeHanlder} disabled={isEleDisabled()}/>
                    </div>
                </div>
                <div className={styles.footer}>
                    <div>
                        <ButtonInline value={isEleDisabled()? '수정': '등록'} onclick={()=>{}} style={{width:80, height: 40}}/>
                    </div>
                    <div>
                        <NavLink to='../'>
                            <ButtonInline isCancel={true} value='취소' onClick={()=>{}} style={{width:80, height: 40}}/>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ScheduleDetilaCreate;
