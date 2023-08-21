import styles from './scheduleDetailCreate.module.css'
import InputEle from '../../components/common/input/Input'
import ButtonInline from '../../components/common/button/ButtonInline';
import AttendUser from '../../components/calendar/AttendUser';
import CheckBox from '../../components/common/input/CheckBox';
import TextareaEl from '../../components/common/input/Textarea';
import SelectEle from '../../components/common/select/SelectEle';
import DaumPostcode from 'react-daum-postcode';
import { useRef, useState } from 'react';


const ScheduleDetilaCreate = (props) => {

    const [postToggle, setPostToggle] = useState(false);
    const [schedule, setSchedule] = useState({
        address: ''
    });

    const modalRef = useRef(null);
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

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.title}>
                    <h3>일정 등록</h3>
                </div>
                <div>
                    {/* <div>
                        <labe className={styles.subject}>일정 제목</labe>
                    </div> */}
                    <div className={[styles.subItem, styles.subCol2].join(' ')}>
                        <InputEle type="text" />
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
                            {/* <label className={styles.subject}>일정</label> */}
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
                        <SelectEle data={[]} />
                    </div>
                    <label>참석자</label>
                    <div style={{margin:'10px 0 10px 0'}}>
                        <AttendUser value={'홍길동'}/>  
                        <AttendUser value={'홍길동'}/>  
                        <AttendUser value={'홍길동'}/>  
                        <AttendUser value={'홍길동'}/>  
                        <AttendUser value={'홍길동'}/>  
                        <AttendUser value={'홍길동'}/>  
                        <AttendUser value={'홍길동'}/>                          
                    </div>
                    
                    <label for="address">장소</label>
                    <div className={styles.containerCol}>
                        <InputEle ref={addressRef} id="address" name='address' type="text" value={schedule.address} onChange={(e)=>setSchedule({...schedule,[e.target.name]: e.target.value })}/>
                        <ButtonInline value={'주소검색'} onClick={()=>setPostToggle(true)} style={{height:30, width:80, display:'inline'}} />
                        {postToggle && 
                        <div ref={modalRef} className={styles.modalPost} onClick={postOutArea}>
                            <div className={styles.post}>
                                <DaumPostcode onComplete={daumPostHandler} />
                            </div>
                        </div>}
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
                        <ButtonInline isCancel={true} value="닫기" onclick="" style={{width:80, height: 40}}/>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ScheduleDetilaCreate;
