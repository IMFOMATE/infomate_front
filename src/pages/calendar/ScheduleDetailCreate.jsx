import styles from './scheduleDetailCreate.module.css'
import InputEle from '../../components/common/input/Input'
import ButtonInline from '../../components/common/button/ButtonInline';
import { AttendUser, AddUser } from '../../components/calendar/AttendUser';
import CheckBox from '../../components/common/input/CheckBox';
import TextareaEl from '../../components/common/input/Textarea';
import SelectEle from '../../components/common/select/SelectEle';
import DaumPostcode from 'react-daum-postcode';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ScheduleProvider } from '../../layouts/CalendarLayout';
import { useDispatch, useSelector } from 'react-redux';
import { postScheduleRegist, getScheduleDetail, patchScheduleUpdate, deleteSchedule } from '../../apis/ScheduleAPICalls';
import antdStyels from './antd.module.css';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/ko_KR';
import { DatePicker, message } from 'antd';
import { GET_CALENDAR_LIST } from '../../modules/CalendarMoudule';
import { GET_SCHEDULE_DETAIL } from '../../modules/ScheduleMoudule';
import { LoadingSpiner } from '../../components/common/other/LoadingSpiner';

dayjs.extend(utc);

export const AttendUserContext = createContext([{}]);

const ScheduleDetilaCreate = () => {
    
    const { RangePicker } = DatePicker;
    const {schedule, setSchedule} = useContext(ScheduleProvider);
    const [attendUsers, setAttendUsers ] = useState([])    
    const [postToggle, setPostToggle] = useState(false);
    const [search] = useSearchParams();
    const modalRef = useRef(); // 다음 우편번호 검색 
    const addressRef = useRef(); // 주소 input

    const getCalednarReducer = useSelector(state => state.calendarReducer[GET_CALENDAR_LIST]);
    const data = useSelector(state => state.scheduleReducer[GET_SCHEDULE_DETAIL]);
    const member = useSelector(state => state.memberReducer);
    
    const scheduleId = search.get('scheduleId');
    const isRead = search.get('isread');
    const newSchedule = search.get('new');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        // if(!schedule && newSchedule === 'true') {
        //     setSchedule({data:{participantList:[]}})
        // }

        if(!isDataLoad()) {
            if(!getCalednarReducer) return;
            if(!schedule) return;
            return setSchedule({
                ...data,
                data: {...schedule.data, 
                        refCalendar: getCalednarReducer.data
                        .filter(item => 
                            item.defaultCalendar 
                            && item.memberCode === member.data.memberCode 
                            && item.departmentCode === null)[0].id,
                        participantList: []
                    }
            })    
        }
        
        if(data) return;
        dispatch(getScheduleDetail({scheduleId:scheduleId}));
        if(schedule?.data) return;

    },[
        isRead,
        search,
        dispatch,
        data,
        getCalednarReducer,
        schedule?.data?.allDay
    ])

    const isDataLoad = () => {
        return scheduleId !== null 
        && scheduleId !== undefined 
        && scheduleId !== ''
    }

    if(!getCalednarReducer) return <LoadingSpiner />

    if(!schedule?.data && isDataLoad()){           
        if(!data) return <LoadingSpiner />;
        setSchedule(data);
        return <LoadingSpiner />; 
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
        if(!newSchedule === 'true')
            navigate(`?scheduleId=${scheduleId}&isread=${false}`);
        setSchedule({...schedule, data: {...schedule.data, address: e.address}})
        addressRef.current.focus();
    }

    const isReadConfirm = () => {
        if(newSchedule === 'true') return;
        if(isDataLoad() && isRead === 'true') {
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
            if(eleName === 'allDay'){
                setSchedule({
                    ...schedule, 
                    data:{...schedule.data, 
                        [eleName]: e.target.checked,
                        endDate: schedule.data.startDate,
                    }
                });
            }
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
        console.log(e);
        // 일정 초기화
        if(e === null || e === undefined){
            return setSchedule({
                ...schedule, 
                data:{...schedule.data,  
                    startDate: dayjs().format('YYYY-MM-DDTHH:mm:ss'), 
                    endDate: dayjs().format('YYYY-MM-DDTHH:mm:ss')
                }
            });
        }

        if(schedule?.data.allDay){
            setSchedule({
                ...schedule, 
                data:{...schedule.data, 
                    startDate: dayjs(e).format('YYYY-MM-DDTHH:mm:ss'),
                    endDate: dayjs(e).format('YYYY-MM-DDTHH:mm:ss'),
                }
            });
        }else{
            setSchedule({
                ...schedule, 
                data:{...schedule?.data,  
                    startDate: dayjs(e[0]).format('YYYY-MM-DDTHH:mm:ss'), 
                    endDate: dayjs(e[1]).format('YYYY-MM-DDTHH:mm:ss')
                }
            });
        }
    }

    const registScheduleHandler = () => {
        
        if(isRead === 'true') {
            return navigate(`?scheduleId=${scheduleId}&isread=${false}`)
        }   
        if(schedule.data.title === undefined || schedule.data.title === null || schedule.data.title === '')
            return message.error('제목 또는 날짜를 입력하세요')

        
        if(isDataLoad()){       
            dispatch(patchScheduleUpdate({data: schedule.data,}));
        }else{
            dispatch(postScheduleRegist({data: schedule.data}));
        }

        navigate('../');
    }
    
    const registCancle = () => {
        navigate('../');
    }

    const deleteScheduleHandler = () => {
        dispatch(deleteSchedule({scheduleId: data.data.id}))
        navigate('../')
    }

    return (
        <>
        {
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
                            value={isRead === 'true' ? data.data.title : schedule?.data?.title}
                            onChange={scheduleChangeHanlder}
                        />
                        <div className={styles.optionItem}>
                            <div style={{marginRight: 10, verticalAlign:'middle'}}>
                            </div>
                            <div>
                                <CheckBox 
                                    name="important"
                                    isChangeColor={true}
                                    checked={isRead === 'true' ? data.data.important : schedule?.data?.important}
                                    onChange={scheduleChangeHanlder}
                                />
                                <label className={styles.chkLabel}>중요</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>   
                        <div className={[styles.subItem, styles.subCol3].join(' ')}>
                            <div className={styles.date}>
                                {
                                    (isRead === 'true' ? data.data.allDay : schedule?.data?.allDay) ? 
                                    <DatePicker 
                                        className={antdStyels['ant-picker-focused']}
                                        name='RangeDate'
                                        locale={locale}
                                        format={'YYYY-MM-DD'}
                                        size='middle'
                                        style={{width:'100%', borderRadius:5 }}
                                        showTime={{ format: 'HH:mm' }}
                                        value={isRead === 'true' ? 
                                            dayjs(data.data.startDate) : dayjs(schedule?.data?.startDate)
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
                                            [dayjs(schedule?.data?.startDate), dayjs(schedule?.data?.endDate)]
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
                                        checked={isRead === 'true' ? data.data.allDay : schedule?.data?.allDay}
                                        onChange={scheduleChangeHanlder} 
                                    />
                                    <label className={styles.chkLabel}>종일</label>
                                </div>
                                {/* <div>
                                    <CheckBox 
                                        name="repeat" 
                                        isChangeColor={true} 
                                        checked={isRead === 'true' ? data.data.repeat : schedule?.data?.repeat}
                                        onChange={scheduleChangeHanlder} 
                                    />
                                    <label className={styles.chkLabel}>반복</label>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className={styles.container}>
                    {/* <label>전사일정</label>
                    <div className={styles.extendEle}>
                        <CheckBox 
                            name="corpSchdl" 
                            isChangeColor={true} 
                            checked={isRead === 'true' ? data.data.corpSchdl : schedule?.data?.corpSchdl}
                            onChange={scheduleChangeHanlder} 
                        />
                    </div> */}
                    <label>캘린더</label>
                    <div className={styles.extendEle}>
                        <SelectEle 
                            name='refCalendar' 
                            options={getCalednarReducer.data.filter(item => (
                                item.departmentCode !== 1 && 
                                (item.memberCode === member.data.memberCode || item.departmentCode === member.data.deptCode )
                            )).sort((prev, next) => prev.indexNo - next.indexNo
                            ).map(item => ({
                                value: item.id, 
                                text: item.defaultCalendar? `${item.name} (기본)` : item.name, 
                                color: item.labelColor
                                })
                            )}
                            value={isRead === 'true' ? data.data.refCalendar : schedule?.data?.refCalendar}
                            onChange={scheduleChangeHanlder}
                            onClick={isReadConfirm}
                            style={{padding: 0}}
                        />
                    </div>
                    <label>참석자</label>
                    <div style={{margin:'10px 0 10px 0'}}>
                        <AttendUserContext.Provider value={{attendUsers, setAttendUsers}} >
                            {
                                isRead === 'true'
                                ? data?.data?.participantList?.map((item,index) => (
                                    <AttendUser
                                        key={index}
                                        id={item?.member?.memberCode} 
                                        value={item?.member?.memberName}
                                    />
                                ))
                                : schedule?.data?.participantList?.map((item, index)=>(
                                    <AttendUser
                                        key={index} 
                                        id={item.member.memberCode} 
                                        value={item.member.memberName}
                                        
                                    />
                                ))
                            }
                            <AddUser onClick={isReadConfirm} />
                        </AttendUserContext.Provider>
                    </div>
                    
                    <label>장소</label>
                    <div className={styles.containerCol}>
                        <InputEle 
                            ref={addressRef} 
                            name='address' 
                            type="text" 
                            value={isRead === 'true' ? data.data.address : schedule?.data?.address}
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
                        />
                    </div>
                </div>
                <div className={styles.footer}>
                    <div>
                        {
                            
                            (isDataLoad() && !data?.expendsProps.compare)
                            || 
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
                            value={isDataLoad() && data?.data?.calendar?.memberCode !== member.data.memberCode? '뒤로가기' : '취소' } 
                            onClick={registCancle} 
                            style={{width:80, height: 40}}
                        />
                    </div>
                    {   

                        (isDataLoad() && data.expendsProps.compare)

                        && 
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
            
            }
        </>
    )
}


export default ScheduleDetilaCreate;
