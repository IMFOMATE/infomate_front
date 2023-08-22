import styles from './scheduleDetailCreate.module.css'
import InputEle from '../../components/common/input/Input'
import ButtonInline from '../../components/common/button/ButtonInline';
import ButtonOutline from '../../components/common/button/ButtonOutline';
import AttendUser from '../../components/calendar/AttendUser';
import CheckBox from '../../components/common/input/CheckBox';
import TextareaEl from '../../components/common/input/Textarea';
import SelectEle from '../../components/common/select/SelectEle';
import DaumPostcode from 'react-daum-postcode';
import {useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';


const ScheduleDetilaCreate = (props) => {

    const [postToggle, setPostToggle] = useState(false);
    const [schedule, setSchedule] = useState({
        address: ''
    });

    const modalRef = useRef();
    const addressRef = useRef();

    const postOutArea = e =>{
        if(modalRef.current === e.target){
            setPostToggle(false)
        }
    }


    const daumPostHandler = (e) => {
        setPostToggle(false);
        setSchedule({...schedule, address: e.address+' '})
        addressRef.current.focus();
    }

    const [attendUsers,setAttendUsers] = useState([
        {name: '홍길동', id:1},
        {name: '홍길동', id:1},
        {name: '홍길동', id:1},
    ]);

    const calendarList = [
        {id: 1, value:'1', text: '1'},
        {id: 2, value:'2', text: '2'},
        {id: 3, value:'3', text: '3'},
        {id: 4, value:'4', text: '4'},
    ]
    

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.title}>
                    <h3>일정 등록</h3>
                </div>
                <div>
                    <div className={[styles.subItem, styles.subCol2].join(' ')}>
                        <InputEle type="text" placeholder='제목을 입력하세요'/>
                        <div className={styles.optionItem}>
                            <div style={{'margin-right': 10, verticalAlign:'middle'}}>
                                <CheckBox id="private" isChangeColor={true}/>
                                <label className={styles.chkLabel} for="private">비공개</label>
                            </div>
                            <div>
                                <CheckBox id="importent" isChangeColor={true}/>
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
                            <InputEle type="datetime-local" />
                            <InputEle type="datetime-local" />
                            <div className={styles.subCol2}>
                                <div style={{'margin-right': 10}}>
                                    <CheckBox id="all-day" isChangeColor={true}/>
                                    <label className={styles.chkLabel} for="all-day">종일</label>
                                </div>
                                <div>
                                    <CheckBox id="circle" isChangeColor={true}/>
                                    <label className={styles.chkLabel} for="circle">반복</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className={styles.container}>
                    <label for="corp-schedule">전사일정</label>
                    <div className={styles.extendEle}>
                        <CheckBox id="corp-schedule" isChangeColor={true}/> {/* 가운데 안감*/}
                    </div>
                    <label for="corp-schedule">캘린더</label>
                    <div className={styles.extendEle}>
                        <SelectEle options={calendarList} />
                    </div>
                    <label>참석자</label>
                    <div style={{margin:'10px 0 10px 0'}}>
                        {
                            attendUsers.map(item=>(<AttendUser value={item.name}/>))
                        }
                        
                        <ButtonOutline value='+' onClick={()=>{}} style={{borderRadius:'50px'}}/>
                    </div>
                    
                    <label for="address">장소</label>
                    <div className={styles.containerCol}>
                        <InputEle ref={addressRef} name='address' type="text" value={schedule.address} onChange={(e)=>setSchedule({...schedule,[e.target.name]: e.target.value })}/>
                        <ButtonInline value={'주소검색'} onClick={()=>setPostToggle(true)} style={{height:30, width:80, display:'inline'}} />
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
                        <TextareaEl rows="15" style={{width:'95%'}}/>
                    </div>
                </div>
                <div className={styles.footer}>
                    <div>
                        <ButtonInline value="등록" onclick="" style={{width:80, height: 40}}/>
                    </div>
                    <div>
                        <NavLink to='../'>
                            <ButtonInline isCancel={true} value="닫기" onclick="" style={{width:80, height: 40}}/>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ScheduleDetilaCreate;
