import styles from './scheduleDetailCreate.module.css'
import InputEle from '../../components/common/input/Input'
import ButtonInline from '../../components/common/button/ButtonInline';
import ButtonOutline from '../../components/common/button/ButtonOutline';
import AttendUser from '../../components/calendar/AttendUser';
import CheckBox from '../../components/common/input/CheckBox';
import TextareaEl from '../../components/common/input/Textarea';
import SelectEle from '../../components/common/select/SelectEle';
import DaumPostcode from 'react-daum-postcode';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ScheduleModalProvider, ScheduleProvider } from '../../layouts/CalendarLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getCalendarListAPI } from '../../apis/CalendarAPICalls';
import { postScheduleRegist, getScheduleDetail } from '../../apis/ScheduleAPICalls';
import antdStyels from './antd.module.css';
import { MenuContext } from '../../context/MenuContext';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/ko_KR';
import { DatePicker } from 'antd';
import { FadeLoader } from 'react-spinners';
import StylesLoading from './loadingStyle.module.css';
import { GET_CALENDAR_LIST } from '../../modules/CalendarMoudule';



const { RangePicker } = DatePicker;
const ScheduleDetilaCreate = () => {

    const {schedule, setSchedule} = useContext(ScheduleProvider);
    const {isMobile, setIsMobile} = useContext(ScheduleProvider);
    const {isModal, setIsModal} = useContext(ScheduleModalProvider);
    const {menuState, toggleMenu} = useContext(MenuContext);
    
    const [postToggle, setPostToggle] = useState(false);
    const [search] = useSearchParams();
    const modalRef = useRef(); // 다음 우편번호 검색 
    const addressRef = useRef(); // 주소 input

    const calendar = useSelector(state => state.calendarReducer[GET_CALENDAR_LIST]);
    const data = useSelector(state => state.scheduleReducer);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const memberCode = 2; // 삭제 예정

    const scheduleId = search.get('scheduleId');


    useEffect(()=>{
        calendar && calendar.data && setSchedule({
            ...schedule, data:{
                ...schedule.data, 
                refCalendar: calendar.data.filter(item=> item.indexNo === 1)
                                .map(item=>item.id)[0],
                memberCode: memberCode,
            }
        })
    },[])

    const isEleDisabled = () => {
        return scheduleId !== null && scheduleId !== undefined && scheduleId !== ''
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
            setSchedule({...schedule, data:{...schedule.data, [eleName]: e.target.checked}})        
        }else if(eleName === 'participantList'){
            setSchedule({...schedule, data:{...schedule.data,  [eleName]: [...schedule.participantList,  e.target.value]}})
        }else if(eleName === 'calendar') {
            setSchedule({...schedule, data:{...schedule.data,  [eleName]: parseInt(e.target.value)}})
        }else{
            setSchedule({...schedule, data:{...schedule.data,  [eleName]: e.target.value}})
        }
    }

    const registScheduleHandler = () => {
        dispatch(postScheduleRegist({data:schedule}));
    }

    const removeParticipant = e => {
        setSchedule({...schedule, participantList:
            schedule.participantList.filter(item =>
                parseInt(item.memberCode) !== parseInt(e.target.id))
        });
    }
    
    const registCancle = () => {
        isMobile || menuState || toggleMenu();
        setIsModal(false);
        setSchedule({});
        navigate('../');
    }

    return (
        <>
        {
            schedule && schedule.data ?
        
            <div className={styles.mainContainer}>
                <div className={styles.title}>
                    <h3>일정 등록</h3>
                </div>
                <div>
                    <div className={[styles.subItem, styles.subCol2].join(' ')}>
                        <InputEle
                            name='title'
                            type="text"
                            placeholder='제목을 입력하세요'
                            value={schedule.data?.title}
                            onChange={scheduleChangeHanlder}
                            // disabled={isEleDisabled()}
                        />
                        <div className={styles.optionItem}>
                            <div style={{marginRight: 10, verticalAlign:'middle'}}>
                                {/* 사용여부 재 결정
                                 <CheckBox id="private" name={schedule.} isChangeColor={true}/>
                                <label className={styles.chkLabel} for="private">비공개</label> 
                                */}
                            </div>
                            <div>
                                <CheckBox 
                                    name="important"
                                    isChangeColor={true}
                                    checked={schedule.data.important}
                                    onChange={scheduleChangeHanlder}
                                    // disabled={isEleDisabled()}
                                />
                                <label className={styles.chkLabel}>중요</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                        </div>
                            
                        <div className={[styles.subItem, styles.subCol3].join(' ')}>
                            <div className={styles.date}>
                                <RangePicker className={[antdStyels['ant-picker-focused'],antdStyels['ant-picker-active-bar']].join(' ')}
                                    name='RangeDate'
                                    locale={locale}
                                    format={'YYYY-MM-DD HH:mm'}
                                    size='middle'
                                    style={{width:'100%', borderRadius:5 }}
                                    showTime={{ format: 'HH:mm' }}
                                    value={[dayjs(schedule.data.startDate), dayjs(schedule.data.endDate)]}
                                    // onCalendarChange={changeData}
                                />
                            </div>
                            <div className={styles.subCol2}>
                                <div style={{marginRight: 10}}>
                                    <CheckBox
                                        name='allDay'
                                        isChangeColor={true}
                                        checked={schedule?.allDay && schedule.allDay}
                                        onChange={scheduleChangeHanlder} 
                                        // disabled={isEleDisabled()}
                                    />
                                    <label className={styles.chkLabel}>종일</label>
                                </div>
                                <div>
                                    <CheckBox 
                                        name="repeat" 
                                        isChangeColor={true} 
                                        checked={schedule.data.repeat}
                                        onChange={scheduleChangeHanlder} 
                                        // disabled={isEleDisabled()}
                                    />
                                    <label className={styles.chkLabel}>반복</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className={styles.container}>
                    <label>전사일정</label>
                    <div className={styles.extendEle}>
                        <CheckBox 
                            name="corpSchdl" 
                            isChangeColor={true} 
                            checked={schedule.data.corpSchdl}
                            onChange={scheduleChangeHanlder} 
                            // disabled={isEleDisabled()}
                        />
                    </div>
                    <label>캘린더</label>
                    <div className={styles.extendEle}>
                        <SelectEle 
                            name='refCalendar' 
                            options={
                                calendar.data.filter(item => (
                                                                item.departmentCode !== 0 && item.memberCode === 2 //수정 예정
                                                            )).map(item => (
                                                                {value:item.id, text:item.name})
                                                            )} 
                            value={schedule.data.refCalendar}
                            onChange={scheduleChangeHanlder} 
                            // disabled={isEleDisabled()}
                            style={{padding: 0}}
                        />
                    </div>
                    <label>참석자</label>
                    <div style={{margin:'10px 0 10px 0'}}>
                        {
                            schedule?.participantList?.map && schedule?.participantList?.map((item, index)=>(
                                <AttendUser
                                    key={index} 
                                    id={item.memberCode} 
                                    value={item.memberName}
                                    onClick={removeParticipant} 
                                    // disabled={isEleDisabled()}
                                />
                            ))
                        }
                        
                        <ButtonOutline value='+' onClick={()=>{}} style={{borderRadius:'50px'}}/>
                    </div>
                    
                    <label>장소</label>
                    <div className={styles.containerCol}>
                        <InputEle 
                            ref={addressRef} 
                            name='address' 
                            type="text" 
                            value={schedule.data.address}
                            onChange={scheduleChangeHanlder} 
                            // disabled={isEleDisabled()}
                        />
                        
                        <ButtonInline 
                            value={'주소검색'} 
                            onClick={()=>setPostToggle(true)} 
                            style={{height:30, width:80, display:'inline'}} 
                        />
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
                        <TextareaEl 
                            rows="15" 
                            maxLength={2000} 
                            style={{width:'95%'}} 
                            name='content' 
                            value={schedule.data.content}
                            onChange={scheduleChangeHanlder} 
                            // disabled={isEleDisabled()}
                        />
                    </div>
                </div>
                <div className={styles.footer}>
                    <div>
                        <ButtonInline 
                            value={isEleDisabled() ? '수정': '등록'}
                            onClick={registScheduleHandler} 
                            style={{width:80, height: 40}}/>
                    </div>
                    <div>
                        
                        <ButtonInline isCancel={true} value='취소' onClick={registCancle} style={{width:80, height: 40}}/>
                        
                    </div>
                </div>
            </div>
            : <div className={StylesLoading.loading}><FadeLoader color="#9F8AFB" /></div>
            
            }
        </>
    )
}


export default ScheduleDetilaCreate;
