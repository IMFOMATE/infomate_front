import { createRef, useContext, useEffect, useRef, useState } from "react";
import './calendar.css'
import styles from './Calendar.module.css';
import FullCalendar from "@fullcalendar/react";
import koLocale from '@fullcalendar/core/locales/ko';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import listPlugin from '@fullcalendar/list';
import { CalendarFilterContext } from "../../context/CalendarContext";
import { ScheduleModalProvider, ScheduleProvider } from "../../layouts/CalendarLayout";
import { useDispatch, useSelector } from "react-redux";
import { getCalendarFindAllAPI } from '../../apis/CalendarAPICalls';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ko';
import { useNavigate } from "react-router-dom";
import { MenuContext } from "../../context/MenuContext";
import { patchScheduleUpdate } from "../../apis/ScheduleAPICalls";
import { FadeLoader } from "react-spinners";
import { GET_CALENDAR_FINDALL } from "../../modules/CalendarMoudule";
import StylesLoading from './loadingStyle.module.css';
import { SummaryCreateModal, SummaryViewModal } from "./ScheduleSummaryModal";
import { ViewWeek } from "@mui/icons-material";

dayjs.extend(utc)

const Calendar = () =>{

    const containerRef = createRef();

    const [mode, setMode] = useState('create');
    const [offset, setOffset] = useState({x:0, y:0, yName:'top', xName:'left'})
    const [innerSize, setInnerSize] = useState();
    const [viewModal, setViewModal] = useState(false);
    const [viewModalData, setViewModalData] = useState({});

    const {isModal, setIsModal} = useContext(ScheduleModalProvider);
    const {filter, setFilter} = useContext(CalendarFilterContext);
    const {isMobile, setIsMobile} = useContext(ScheduleProvider);
    const {schedule, setSchedule} = useContext(ScheduleProvider);
    const {menuState, toggleMenu} = useContext(MenuContext);
    const navigate = useNavigate();

    const data = useSelector(state => state.calendarReducer[GET_CALENDAR_FINDALL]);
    const scheduleReducer = useSelector(state => state.scheduleReducer);

    const dispatch = useDispatch();

    const modalRef = useRef(null);

    const changeIsMobile = () =>{
        (innerSize <= 480)? setIsMobile(true) : setIsMobile(false);
    }

    const sizeObserver = new ResizeObserver((entires)=>{
        const { width } = entires[0].contentRect;
        setInnerSize(width);
        changeIsMobile();
    }) 
    

    useEffect(()=>{
        setSchedule({});
        changeIsMobile();

        sizeObserver.observe(containerRef.current);

        dispatch(getCalendarFindAllAPI())

        return () => {
            sizeObserver.disconnect();
        }
    },[scheduleReducer])

    const calenderClickHandler = data => {
        
        setSchedule({
            ...schedule, 
            data : {...schedule.data,
                startDate: dayjs(data.startStr).format('YYYY-MM-DDTHH:mm'),
                endDate: data.view.type === 'dayGridMonth'? dayjs(data.endStr).subtract(1,'d').format('YYYY-MM-DDTHH:mm') : dayjs(data.endStr).format('YYYY-MM-DDTHH:mm'),
            }
        })
        isMobile? navigate('./regist') : setIsModal(true);
        
        ChangeModalOffset(data.jsEvent || data, {x: 275, y: 180})
    };

    const hoverEventHandler = (data, param) => {
        if(param === viewModal) return;
        
        if(param) {
            ChangeModalOffset(data.jsEvent, {x: 200, y: 100})
            setViewModalData(data)
        }else{
            setViewModalData({})
        }
        setViewModal(param);
            
    }
    
    const ChangeModalOffset = (offset, plusOffset) =>{
        setOffset({...offset, 
            y: (offset.y + plusOffset.y + 330 >= window.innerHeight ? 0 : offset.y + plusOffset.y),
            yName: (offset.y + plusOffset.y + 330 >= window.innerHeight ? 'bottom' : 'top'),
            x: (offset.x + plusOffset.x + 330 >= window.innerWidth ? 0 : offset.x + plusOffset.x),
            xName: (offset.x + plusOffset.x + 330 >= window.innerWidth ? 'right' : 'left')
           })
    }
    
    const modalOutClickHandler = e => {
        if(modalRef.current === e.target){
            setIsModal(false);
            setViewModal(false)
            setMode('create');
        }   
    }

    const changeViewModalHandler = () =>{
        setViewModal(!viewModal);
    }

    const eventClickHandler = e => {  
        menuState && toggleMenu();
        ChangeModalOffset(e.jsEvent, {x:270 , y: 180});
        navigate(`./regist?scheduleId=${e.event.extendedProps.id}&isread=true`);
    }

    const eventDrop = (e) =>{
        const data = {
            id: e.event.extendedProps.id,
            startDate: dayjs(e.event.startStr).format('YYYY-MM-DDTHH:mm:ss'),
            endDate: dayjs(e.event.endStr === ''? e.event.startStr : e.event.endStr)
                        .format('YYYY-MM-DDTHH:mm:ss')
        }
        dispatch(patchScheduleUpdate({data}));
    }

    const event = (data) =>{
        console.log(data);
        const event = [];
            data.filter(item => !filter.includes(item.id))
            .forEach(item1 => {
                item1 && item1.scheduleList && item1.scheduleList.forEach(item => 
                        event.push({title: item.title, start:dayjs(item.startDate).format('YYYY-MM-DDTHH:mm:ss'),
                                    end:dayjs(item.endDate).format('YYYY-MM-DDTHH:mm:ss'), allDay: item.allDay,
                                    color: item1.labelColor, textColor: 'black',
                                    extendedProps: {id:item.id, address: item.address,
                                                    corpSchdl: item.corpSchdl, calendarName: item1.name}
                                    })
                )
            })
        console.log(event);
        return event;
    }
    

    return (
        <>  
            <div className={styles.container} ref={containerRef}>
                {
                    !data?.data?.length > 0 ? 
                    
                    <div className={StylesLoading.loading}><FadeLoader color="#9F8AFB" /></div>
                    
                    :<FullCalendar
                        ref={modalRef}
                        locale={koLocale}
                        timeZone={'utc'}
                        stickyHeaderDates={true}
                        lazyFetching={true}
                        handleWindowResize={true}
                        windowResizeDelay={0}
                        navLinks={true}
                        dragScroll={true}
                        droppable={true}
                        editable={true}
                        selectable={true}
                        dayMaxEvents={true}
                        expandRows={true}
                        plugins={[ multiMonthPlugin, dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin ]}
                        initialView={'dayGridMonth'}
                        windowResize={e => {
                            if(window.innerWidth <= 480){
                                setIsMobile(true);
                            }else{
                                setIsMobile(false);
                            }                    
                        }}
                                
                        headerToolbar={{
                            left: !isMobile && 'dayGridMonth,timeGridWeek,timeGridDay,list',
                            center: 'title',
                            right: 'prev,next'
                        }}
                
                        footerToolbar={{
                            left: 'today',
                            center: isMobile && 'scheduleRegist',
                            right: isMobile?'dayGridMonth,timeGridWeek,timeGridDay,list' :  'scheduleRegist'
                        }}
                        
                        stickyFooterScrollbar={true}
                        
                        aspectRatio={isMobile ? 0.7 : 1.2}

                        customButtons={{
                            scheduleRegist: {
                                text: '등록',
                                click: (e)=>{
                                    calenderClickHandler(e);
                                }   
                            }
                        }}
                        
                        events={event(data.data)}
                        select={calenderClickHandler}
                        eventClick={eventClickHandler}
                        eventDrop={eventDrop}
                        eventMouseEnter={(e)=> hoverEventHandler(e, true)}
                        eventMouseLeave={(e)=> hoverEventHandler(e, false)}
                    />
                    
                }
                {
                    isModal && 
                    <div ref={modalRef} className={styles.modalBg} onClick={modalOutClickHandler}>
                        <div className={styles.modal} style={{[offset.yName]: offset.y , [offset.xName]: offset.x}}>
                            <SummaryCreateModal modal={isModal} setIsModal={setIsModal} mode={mode} setMode={setMode} />
                        </div>
                    </div>
                }
                {
                    viewModal && !isModal &&
                    // <div ref={modalRef} className={styles.modalBg} onClick={modalOutClickHandler}>
                        <div className={styles.modal} style={{[offset.yName]: offset.y , [offset.xName]: offset.x}}>
                            <SummaryViewModal modal={viewModal} setIsModal={changeViewModalHandler} data={viewModalData}/>
                        </div>
                    // </div>
                }
            </div>
        </>
    )
}

export default Calendar;