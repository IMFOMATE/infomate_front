import { createRef, useContext, useEffect, useRef, useState } from "react";
import './calendar.css'
import styles from './Calendar.module.css';
import FullCalendar from "@fullcalendar/react";
import koLocale from '@fullcalendar/core/locales/ko';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

import { CalendarFilterContext } from "../../context/CalendarContext";
import { ScheduleModalProvider, ScheduleProvider } from "../../layouts/CalendarLayout";
import { useDispatch, useSelector } from "react-redux";
import { getCalendarFindAllAPI } from '../../apis/CalendarAPICalls';
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import { useNavigate } from "react-router-dom";
import { MenuContext } from "../../context/MenuContext";
import { getScheduleDetail, patchScheduleUpdate } from "../../apis/ScheduleAPICalls";
import { FadeLoader } from "react-spinners";
import { GET_CALENDAR_FINDALL } from "../../modules/CalendarMoudule";
import StylesLoading from './loadingStyle.module.css';
import SecheduleSummaryCreate from "./ScheduleSummaryCreate";

const Calendar = () =>{

    const containerRef = createRef();

    const [mode, setMode] = useState('create');

    
    const [innerSize, setInnerSize] = useState();

    const {isModal, setIsModal} = useContext(ScheduleModalProvider);
    const {filter, setFilter} = useContext(CalendarFilterContext);
    const {isMobile, setIsMobile} = useContext(ScheduleProvider);
    const {schedule, setSchedule} = useContext(ScheduleProvider);
    const {menuState, toggleMenu} = useContext(MenuContext);
    const navigate = useNavigate();

    const data = useSelector(state => state.calendarReducer[GET_CALENDAR_FINDALL]);
    const sc = useSelector(state => state.scheduleReducer);
    const dispatch = useDispatch();

    const modalRef = useRef(null);

    const sizeObserver = new ResizeObserver((entires)=>{
        const { width } = entires[0].contentRect;
        setInnerSize(width)
        if(width <= 480){
            setIsMobile(true);
        }else{
            setIsMobile(false);
        }
    }) 
    

    useEffect(()=>{
        
        setSchedule({});

        if(innerSize <= 480){
            setIsMobile(true);
        }else{
            setIsMobile(false);
        }

        sizeObserver.observe(containerRef.current);

        dispatch(getCalendarFindAllAPI())
        return () => {
            sizeObserver.disconnect();
        }
    },[sc])

    const calenderClickHandler = data => {

        setSchedule({
            ...schedule, 
            data : {...schedule.data,
                startDate: dayjs(data.startStr).format('YYYY-MM-DDTHH:mm'),
                endDate: dayjs(data.endStr).subtract(1,'day').format('YYYY-MM-DDTHH:mm'),
            }
        })

        if(isMobile) {
            navigate('./regist')
        }else{
            setIsModal(true);
        }


    };

    const modalOutClickHandler = e => {
        if(modalRef.current === e.target){
            setIsModal(false);
            setMode('create');
        }
        
    }
    const eventClickHandler = e => {
        // setSchedule({id:e.event.extendedProps.id, startDate: e.event.startStr, endDate: e.event.endStr, allDay: e.event.allDay, title:e.event.title})
        // setIsModal(true)
        // setMode('read')
        menuState && toggleMenu();
        console.log(e);
        dispatch(getScheduleDetail({scheduleId: e.event.extendedProps.id}))
        // document.location.href = './calendar/regist'
        console.log(sc);
        sc && sc.data && setSchedule({data: sc.data});
        sc && sc.data && navigate(`./regist`);
    }

    const eventDrop = (e) =>{
        const data = {
            id: e.event.extendedProps.id,
            startDate: dayjs(e.event.startStr).format('YYYY-MM-DDTHH:mm:ss'),
            endDate:dayjs(e.event.endStr).format('YYYY-MM-DDTHH:mm:ss')
        }

        dispatch(patchScheduleUpdate({data}));
    }

    const event = (data) =>{
        const event = [];
            data.filter(item => !filter.includes(item.id))
            .forEach(item1 => {
                item1 && item1.scheduleList && item1.scheduleList.forEach(item => 
                        event.push({title: item.title, start:item.startDate,
                                    end:item.endDate, allDay: item.allDay,
                                    color: item1.labelColor, textColor: 'black',
                                    extendedProps: {id:item.id, address: item.address,
                                                    corpSchdl: item.corpSchdl}
                                    })
                )
            })

        return event;
    }

    

    return (
        <>  
            <div className={styles.container} ref={containerRef}>
                {
                    filter && data && data.data && data.data.length > 0 ? 

                    <FullCalendar
                        locale={koLocale}
                        timeZone={'Asia/Seoul'}
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
                        plugins={[ multiMonthPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                        initialView={'dayGridMonth'}
                                
                        headerToolbar={{
                            left: !isMobile && 'dayGridMonth,timeGridWeek,timeGridDay',
                            center: 'title',
                            right: 'prev,next'
                        }}
                
                        footerToolbar={{
                            left: 'today',
                            center: isMobile && 'scheduleRegist',
                            right: isMobile?'dayGridMonth,timeGridWeek,timeGridDay' :  'scheduleRegist'
                        }}
                        
                        stickyFooterScrollbar={true}
                        
                        aspectRatio={isMobile ? 0.7 : 1.2}

                        customButtons={{
                            scheduleRegist: {
                                text: '등록',
                                click: (e)=>{
                                    console.log(e)
                                    calenderClickHandler(e);
                                }   
                            }
                        }}
                        events={event(data.data)}
                        select={calenderClickHandler}
                        eventClick={eventClickHandler}
                        eventDrop={eventDrop}
                    />
                    : <div className={StylesLoading.loading}><FadeLoader color="#9F8AFB" /></div>
                }
                {
                    isModal && 
                    <div ref={modalRef} className={styles.modalBg} onClick={modalOutClickHandler}>
                        <div className={styles.modal}>
                            <SecheduleSummaryCreate modal={isModal} setIsModal={setIsModal} mode={mode} setMode={setMode} />
                        </div>
                    </div>
                }
                
            </div>
        </>
    )
}

export default Calendar;