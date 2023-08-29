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
import { postScheduleRegist, getScheduleDetail, patchScheduleUpdate, deleteSchedule } from '../../apis/ScheduleAPICalls';
import antdStyels from './antd.module.css';
import { MenuContext } from '../../context/MenuContext';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/ko_KR';
import { DatePicker } from 'antd';
import { FadeLoader } from 'react-spinners';
import StylesLoading from './loadingStyle.module.css';
import { GET_CALENDAR_LIST } from '../../modules/CalendarMoudule';
import { MEMBER_CODE } from '../../apis/APIConfig';
import { DELETE_SCHEDULE, GET_SCHEDULE_DETAIL, POST_SCHEDULE_REGIT } from '../../modules/ScheduleMoudule';


const ScheduleDetilaCreate = () => {
    
    const { RangePicker } = DatePicker;
    const {schedule, setSchedule} = useContext(ScheduleProvider);
    const {isMobile, setIsMobile} = useContext(ScheduleProvider);
    const {isModal, setIsModal} = useContext(ScheduleModalProvider);
    const {menuState, toggleMenu} = useContext(MenuContext);
    
    const [postToggle, setPostToggle] = useState(false);
    const [search] = useSearchParams();
    const modalRef = useRef(); // 다음 우편번호 검색 
    const addressRef = useRef(); // 주소 input

    const getCalednarReducer = useSelector(state => state.calendarReducer[GET_CALENDAR_LIST]);
    const data = useSelector(state => state.scheduleReducer[GET_SCHEDULE_DETAIL]);
    const deleteState = useSelector(state => state.scheduleReducer[DELETE_SCHEDULE])
    const scheduleRegist = useSelector(state => state.scheduleReducer[POST_SCHEDULE_REGIT])
    
    const scheduleId = search.get('scheduleId');
    const isRead = search.get('isread');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isDataLoad()){
            if(isRead === null || !data?.data)
                navigate(`?scheduleId=${scheduleId}&isread=true`);
            
            if(isRead === 'true'){
                dispatch(getScheduleDetail({scheduleId:scheduleId}));
            }else{
                setSchedule({...data, data : {...data.data, refCalendar: data.data.calendar.id}})
            }
        }else{
            setSchedule({
                ...data,
                data: {...schedule?.data, 
                    refCalendar: getCalednarReducer?.data?.filter(item => item.indexNo === 1)[0].id}
            })
        }
        return () => {
            // isMobile || menuState || toggleMenu();
            setIsModal(false);
            setSchedule({});
        }
    },[isRead])

    
    const isDataLoad = () => {
        return scheduleId !== null && scheduleId !== undefined && scheduleId !== ''
    }

    const postOutArea = e =>{
        if(modalRef.current === e.target)
            setPostToggle(false)
    }
    
    const addressSearchHandler = () => {
        setPostToggle(true)
        isReadConfirm();
    }

    const daumPostHandler = (e) => {
        setPostToggle(false);
        setSchedule({...schedule, data: {...schedule.data, address: e.address}})
        addressRef.current.focus();
    }

    const isReadConfirm = () => {
        if(isDataLoad() && isRead) {
            navigate(`?scheduleId=${scheduleId}&isread=${false}`)
        };
    }

    const scheduleChangeHanlder = e => {
        isReadConfirm();

        const eleName = e.target.name;

        if(e.target.type === 'checkbox'){
            setSchedule({
                ...schedule, 
                data:{...schedule.data,
                     [eleName]: e.target.checked
                    }
                })
        }else if(eleName === 'participantList'){
            setSchedule({
                ...schedule, 
                data:{...schedule.data,
                    [eleName]: [...schedule.participantList,  e.target.value]
                }
            })
        }else if(eleName === 'refCalendar') {
            setSchedule({
                ...schedule, 
                data:{...schedule.data,
                    [eleName]: parseInt(e.target.value)
                }
            })
        }else{
            setSchedule({...schedule, 
                data:{...schedule.data, 
                    [eleName]: e.target.value
                }
            })
        }
    }

    const changeDateHandler = (e) => {
        if(schedule.data.allDay){
            setSchedule({
                ...schedule, 
                data:{...schedule.data, 
                    startDate: dayjs(e).format('YYYY-MM-DDTHH:mm:ss')
                }
            });
        }else{
            setSchedule({
                ...schedule, 
                data:{...schedule.data,  
                    startDate: dayjs(e[0]).format('YYYY-MM-DDTHH:mm:ss'), 
                    endDate: dayjs(e[1]).format('YYYY-MM-DDTHH:mm:ss')
                }
            });
        }
    }

    const registScheduleHandler = () => {   
        if(isDataLoad()){
            dispatch(patchScheduleUpdate({data: schedule.data}));
        }else{
            dispatch(postScheduleRegist({data: schedule.data}));
        }
        if(scheduleRegist.status === 200){
            navigate('../');
        }

    }

    const removeParticipant = e => {
        setSchedule({...schedule, participantList:
            schedule.participantList.filter(item =>
                parseInt(item.memberCode) !== parseInt(e.target.id))
        });
    }
    
    const registCancle = () => {
        navigate('../');
    }

    const deleteScheduleHandler = () => {
        dispatch(deleteSchedule({data: [parseInt(data.data.id)]}))
        navigate('../')
    }

    return (
        <>
        {
            getCalednarReducer && getCalednarReducer.data && 
            (isRead === 'true' ? (data && data.data) : (schedule && schedule.data) ) ?
        
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
                            value={isRead === 'true' ? data.data.title : schedule.data.title}
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
                                    checked={isRead === 'true' ? data.data.important : schedule.data.important}
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
                                {
                                    (isRead === 'true' ? data.data.allDay : schedule.data.allDay) ? 
                                    <DatePicker 
                                        className={antdStyels['ant-picker-focused']}
                                        name='RangeDate'
                                        locale={locale}
                                        format={'YYYY-MM-DD'}
                                        size='middle'
                                        style={{width:'100%', borderRadius:5 }}
                                        showTime={{ format: 'HH:mm' }}
                                        value={isRead === 'true' ? 
                                            dayjs(data.data.startDate) : dayjs(schedule.data.startDate)
                                        }
                                        onClick={isReadConfirm}
                                        onChange={changeDateHandler}

                                    /> :
                                    <RangePicker className={[antdStyels['ant-picker-focused'], 
                                                            antdStyels['ant-picker-active-bar']].join(' ')}
                                        name='RangeDate'
                                        locale={locale}
                                        format={'YYYY-MM-DD HH:mm'}
                                        size='middle'
                                        style={{width:'100%', borderRadius:5 }}
                                        showTime={{ format: 'HH:mm' }}
                                        value={isRead === 'true' ? 
                                            [dayjs(data.data.startDate), dayjs(data.data.endDate)] : 
                                            [dayjs(schedule.data.startDate), dayjs(schedule.data.endDate)]
                                        }
                                        onClick={isReadConfirm}
                                        onChange={changeDateHandler}
                                    />
                                }
                            </div>
                            <div className={styles.subCol2}>
                                <div style={{marginRight: 10}}>
                                    <CheckBox
                                        name='allDay'
                                        isChangeColor={true}
                                        checked={isRead === 'true' ? data.data.allDay : schedule.data.allDay}
                                        onChange={scheduleChangeHanlder} 
                                        // disabled={isEleDisabled()}
                                    />
                                    <label className={styles.chkLabel}>종일</label>
                                </div>
                                <div>
                                    <CheckBox 
                                        name="repeat" 
                                        isChangeColor={true} 
                                        checked={isRead === 'true' ? data.data.repeat : schedule.data.repeat}
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
                            checked={isRead === 'true' ? data.data.corpSchdl : schedule.data?.corpSchdl}
                            onChange={scheduleChangeHanlder} 
                            // disabled={isEleDisabled()}
                        />
                    </div>
                    <label>캘린더</label>
                    <div className={styles.extendEle}>
                        <SelectEle 
                            name='refCalendar' 
                            options={getCalednarReducer.data.filter(item => (
                                item.departmentCode !== 0 && item.memberCode === MEMBER_CODE
                            )).sort((prev, next) => prev.indexNo - next.indexNo
                            ).map(item => (
                                {value: item.id, text: item.name})
                            )}
                            value={isRead === 'true' ? data.data.refCalendar : schedule.data?.refCalendar}
                            onChange={scheduleChangeHanlder}
                            onClick={isReadConfirm}
                            // disabled={isEleDisabled()}
                            style={{padding: 0}}
                        />
                    </div>
                    <label>참석자</label>
                    <div style={{margin:'10px 0 10px 0'}}>
                        {
                            schedule.participantList?.map((item, index)=>(
                                <AttendUser
                                    key={index} 
                                    id={item.memberCode} 
                                    value={item.memberName}
                                    onClick={removeParticipant} 
                                    // disabled={isEleDisabled()}
                                />
                            ))
                        }
                        
                        <ButtonOutline 
                            value='+' 
                            onClick={()=>{}} 
                            style={{borderRadius:'50px'}}
                        />
                    </div>
                    
                    <label>장소</label>
                    <div className={styles.containerCol}>
                        <InputEle 
                            ref={addressRef} 
                            name='address' 
                            type="text" 
                            value={isRead === 'true' ? data.data.address : schedule.data?.address}
                            onChange={scheduleChangeHanlder} 
                            // disabled={isEleDisabled()}
                        />
                        
                        <ButtonInline 
                            value={'주소검색'} 
                            onClick={addressSearchHandler} 
                            style={{height:30, width:80, display:'inline'}} 
                        />
                        {
                            postToggle && 
                            <div ref={modalRef} className={styles.modalPost} onClick={postOutArea}>
                                <div className={[styles.post, postToggle && styles.modalActive].join(' ')}>
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
                            value={isRead === 'true' ? data.data.content : schedule?.data?.content}
                            onChange={scheduleChangeHanlder} 
                            // disabled={isEleDisabled()}
                        />
                    </div>
                </div>
                <div className={styles.footer}>
                    <div>
                        {
                            (data?.data?.calendar.memberCode !== parseInt(MEMBER_CODE) && isDataLoad()) || 
                            <ButtonInline 
                                value={isRead ? '수정': '등록'}
                                onClick={registScheduleHandler} 
                                style={{width:80, height: 40}}
                            />
                        }
                        
                    </div>
                    <div>
                        <ButtonInline 
                            isCancel={true} 
                            value={isDataLoad() && data?.data?.calendar.memberCode !== parseInt(MEMBER_CODE)? '뒤로가기' : '취소' } 
                            onClick={registCancle} 
                            style={{width:80, height: 40}}
                        />
                    </div>
                    {   
                        isDataLoad() && parseInt(data?.data?.calendar.memberCode) === parseInt(MEMBER_CODE) && 
                        <div>
                            <ButtonInline 
                                isCancel={true} 
                                value='삭제' 
                                onClick={deleteScheduleHandler} 
                                style={{backgroundColor:'red', width:80, height: 40}}
                            />
                        </div>    
                    }
                </div>
            </div>
            : <div className={StylesLoading.loading}><FadeLoader color="#9F8AFB" /></div>
            }
        </>
    )
}


export default ScheduleDetilaCreate;
