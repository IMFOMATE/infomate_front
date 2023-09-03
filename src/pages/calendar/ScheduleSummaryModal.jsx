import ButtonOutline from '../../components/common/button/ButtonOutline';
import CheckBox from '../../components/common/input/CheckBox';
import InputEle from '../../components/common/input/Input';
import SelectEle from '../../components/common/select/SelectEle';
import styles from './scheduleSummaryModal.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ScheduleModalProvider, ScheduleProvider } from '../../layouts/CalendarLayout';
import { MenuContext } from '../../context/MenuContext';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSchedule, postScheduleRegist } from '../../apis/ScheduleAPICalls';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/ko_KR';
import antdStyels from './antd.module.css';
import { DatePicker } from 'antd';
import { GET_CALENDAR_LIST } from '../../modules/CalendarMoudule';
import { DEPARTMENT_CODE, MEMBER_CODE } from '../../apis/APIConfig';
import meterialIcon from '../../components/common/meterialIcon.module.css'
dayjs.locale('ko')

export const SummaryCreateModal = ({modal, setModal, mode, setMode}) => {
    
    const { RangePicker } = DatePicker;
    const {schedule, setSchedule} = useContext(ScheduleProvider);
    const {isModal, setIsModal} = useContext(ScheduleModalProvider);
    const {menuState, toggleMenu} = useContext(MenuContext);
    
    const calendarList = useSelector(state => state.calendarReducer[GET_CALENDAR_LIST]);
    
    const sc = useSelector(state => state.scheduleReducer);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(()=>{
        setSchedule({
            ...schedule,
            data: {...schedule.data, 
                refCalendar: calendarList.data.filter(item => 
                    item.defaultCalendar && item.memberCode === MEMBER_CODE && item.departmentCode === null)[0].id
                }
        })
    },[])

    console.log(schedule);

    const scheduleChangeHanlder = e => {
        const eleName = e.target.name;

        // 수정 예정
        if(e.target.type === 'checkbox'){
            setSchedule({
                ...schedule, 
                data: {
                    ...schedule.data, 
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
        }else if(eleName === 'calendar') {
            setSchedule({
                ...schedule, 
                data: {
                    ...schedule.data, 
                    [eleName]: parseInt(e.target.value)
                }
            })
        }else{
            setSchedule({
                ...schedule, 
                data: {
                    ...schedule.data, 
                    [eleName]: e.target.value
                }
            })
        }
    }
    
    const scheduleResitClickHandler = (e) => {
        dispatch(postScheduleRegist({data: schedule.data}))
        sc.status === 200 && navigate('.')
        setIsModal(false);
    }
    
    const closeHanlder = e => {
        setSchedule({})
        setIsModal(false);
        setMode('create')
    }
    const sidebarToggle = () => {
        menuState && toggleMenu();
    }

    const changeDateHandler = (e) => {
        if(e === null){
            return setSchedule({
                ...schedule, 
                data:{...schedule.data,  
                    startDate: dayjs().format('YYYY-MM-DDTHH:mm:ss'), 
                    endDate: dayjs().format('YYYY-MM-DDTHH:mm:ss')
                }
            });
        }
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


    return (
        <>
            <div className={[styles.container, modal && styles.active].join(' ')}>
                <div className={styles.title}>
                    <span style={{fontSize: '1.3rem'}}>
                     일정 등록
                    </span>
                    <span className={styles.close}>
                        <button 
                            className={meterialIcon.meterialIcon} 
                            onClick={closeHanlder}
                            style={{color:'gray'}}
                        >close</button>
                    </span>
                </div>
                <div className={styles.content}>
                    <div className={styles.col2}>

                        <label>일정명</label>
                        <InputEle
                            type={'text'}
                            name='title'
                            value={schedule.data?.title}
                            onChange={scheduleChangeHanlder}
                        />

                        <label>일시</label>
                        <div>
                            {
                                schedule.data?.allDay ? 
                                <DatePicker 
                                    className={antdStyels['ant-picker-focused']}
                                    name='RangeDate'
                                    locale={locale}
                                    format={'YYYY-MM-DD'}
                                    size='middle'
                                    style={{width:'100%', borderRadius:5 }}
                                    showTime={{ format: 'HH:mm' }}
                                    value={dayjs(schedule.data.startDate)}
                                    onChange={changeDateHandler}
                                /> :
                                <RangePicker className={[antdStyels['ant-picker-focused'],antdStyels['ant-picker-active-bar']].join(' ')}
                                    name='RangeDate'
                                    locale={locale}
                                    format={'YYYY-MM-DD HH:mm'}
                                    size='middle'
                                    style={{width:'100%', borderRadius:5 }}
                                    showTime={{ format: 'HH:mm' }}
                                    value={[dayjs(schedule.data.startDate), dayjs(schedule.data.endDate)]}
                                    onChange={changeDateHandler}
                                />
                            }

                            <div style={{height: 30, alignSelf: 'center'}}>
                                <CheckBox
                                    type="checkbox"
                                    name="allDay"
                                    isChangeColor={true}
                                    style={{display: 'inline', position: 'relative', top: '10px'}}
                                    checked={schedule.data?.allDay}
                                    onChange={scheduleChangeHanlder}
                                />
                                <label style={{
                                    display: 'inline',
                                    position: 'relative',
                                    top: '11px',
                                    margin: '5px'
                                }}>종일</label>
                            </div>
                        </div>

                        <label>캘린더</label>
                        <div>
                            <SelectEle
                                name='refCalendar'
                                value={schedule.data.refCalendar}
                                options={calendarList.data.filter(item => (
                                    item.departmentCode !== 1 && 
                                    (item.memberCode === MEMBER_CODE || item.departmentCode === DEPARTMENT_CODE)
                                )).sort((prev, next) => prev.indexNo - next.indexNo
                                ).map(item => ({
                                    value: item.id,
                                    text: item.defaultCalendar? `${item.name} (기본)` : item.name,
                                    color: item.labelColor
                                    })
                                )}
                                onChange={scheduleChangeHanlder}
                                style={{width: '100%', padding: 0, color: 'gray'}}
                            />
                        </div>

                        <label>장소</label>
                        <InputEle
                            name='address'
                            type={'text'}
                            value={schedule.data?.address}
                            onChange={scheduleChangeHanlder}
                        />

                        {/* <label>전사일정</label>
                        <div style={{textAlign: 'left'}}>
                            <CheckBox
                                name='corpSchdl'
                                type="checkbox"
                                isChangeColor={true}
                                style={{position: 'relative', top: '2px'}}
                                onChange={scheduleChangeHanlder}
                            />
                        </div> */}
                    </div>
                    <div className={styles.footer}>
                        {
                            mode === 'read' ||
                            <NavLink to='./regist?new=true'>
                                <ButtonOutline value={'상세일정등록'} onClick={sidebarToggle} style={{margin: '5px'}}/>
                            </NavLink>
                        }
                        {
                            mode === 'read' ?
                                <NavLink to={`./regist?scheduleId=${schedule?.id}`}>
                                    <ButtonOutline value={'자세히보기'} style={{margin: '5px'}}/>
                                </NavLink> :
                                <ButtonOutline value={'등록'} style={{margin: '5px'}}
                                               onClick={scheduleResitClickHandler}/>

                        }
                        <ButtonOutline
                            value={'닫기'}
                            isCancel={true}
                            style={{margin: '5px'}}
                            onClick={closeHanlder}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}


export const SummaryViewModal = ({setIsModal, data}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const editClickHandler = () => {
        // navigate(`./regist?scheduleId=${data.event.extendedProps.id}&isread=true`);
        navigate(`./regist?scheduleId=${data.event.extendedProps.id}&isread=true`);
    }

    const deleteScheduleHandler = () => {
        dispatch(deleteSchedule({scheduleId: data.event.extendedProps.id}));
        setIsModal(false);
    }
    const addressLinkClickHandler = () => {
        window.open(`https://map.kakao.com/link/search/${data.event.extendedProps.address}`)
    }

    return (
        <>
            {/* <div className={[styles.container, modal && styles.active].join(' ')}> */}
            <div className={[styles.container,styles.active, styles.viewContainer].join(' ')}>
                <div className={styles.viewHeader}>
                <button className={meterialIcon.meterialIcon} onClick={deleteScheduleHandler}>delete</button>
                    <button className={meterialIcon.meterialIcon} onClick={editClickHandler}>edit</button>
                    <button className={meterialIcon.meterialIcon} onClick={setIsModal}>close</button>
                </div>
                <div className={styles.viewCol2}>
                    <label><div className={styles.labelColor} style={{backgroundColor:data.event.backgroundColor}}></div></label>
                    <div className={styles.viewSubject}>{data.event.title}</div>

                    <label></label>
                    <div className={styles.viewDate}>
                        {dayjs(data.event.startStr).format('M월 D일(dddd)')}
                        {data.event.endStr && ` ~ ${dayjs(data.event.endStr).format('M월 D일(dddd)')}`}
                    </div>
                    
                    
                    <label><span className={meterialIcon.meterialIcon}>home</span></label>
                    <div><button onClick={addressLinkClickHandler} style={{color:'blue'}}>{data.event.extendedProps.address}</button></div>

                    <label><span className={meterialIcon.meterialIcon}>calendar_month</span></label>
                    <div>{data.event.extendedProps.calendarName}</div>
                    <label></label>
                    <div className={styles.viewOption}>
                        {
                            data.event.extendedProps.important && <span>#중요&nbsp;</span>   
                        }

                        {
                            data.event.allDay && <span>#종일&nbsp;</span>   
                        }
                        
                        {
                            data.event.extendedProps.corpSchdl && <span>#전사일정&nbsp;</span>   
                        }

                        {
                            // data.event.allDay && <span>#종일&nbsp;</span>   
                        }
                    </div>
                </div>
            </div>
        </>
    )
}