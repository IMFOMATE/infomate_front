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
import { patchScheduleUpdate } from "../../apis/ScheduleAPICalls";
import { FadeLoader } from "react-spinners";
import { GET_CALENDAR_FINDALL } from "../../modules/CalendarMoudule";
import StylesLoading from './loadingStyle.module.css';
import { SummaryCreateModal, SummaryViewModal } from "./ScheduleSummaryModal";

const Calendar = () =>{

    const containerRef = createRef();

    const [mode, setMode] = useState('create');
    const [offset, setOffset] = useState({x:0, y:0, yName:'top', xName:'left'})
    const [innerSize, setInnerSize] = useState();
    const [viewModal, setViewModal] = useState(false);

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
                endDate: dayjs(data.endStr).subtract(1,'day').format('YYYY-MM-DDTHH:mm'),
            }
        })
        isMobile? navigate('./regist') : setIsModal(true);

        ChangeModalOffset(data.jsEvent)
    };

    const hoverEventHandler = data => {
        ChangeModalOffset(data.jsEvent)
    }
    
    const ChangeModalOffset = (offset) =>{
        setOffset({...offset, 
            y: (offset.y + 180 + 330 >= window.innerHeight ? 0 : offset.y + 180),
            yName: (offset.y + 180 + 330 >= window.innerHeight ? 'bottom' : 'top'),
            x: (offset.x + 275 + 330 >= window.innerWidth ? 0 : offset.x + 275),
            xName: (offset.x + 275 + 330 >= window.innerWidth ? 'right' : 'left')
           })
    }
    
    const modalOutClickHandler = e => {
        if(modalRef.current === e.target){
            setIsModal(false);
            setMode('create');
        }   
    }

    const eventClickHandler = e => {  
        menuState && toggleMenu();
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
                    data?.data?.length > 0 ? 

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
                        eventMouseEnter={hoverEventHandler}
                        eventMouseLeave={hoverEventHandler}
                    />
                    : <div className={StylesLoading.loading}><FadeLoader color="#9F8AFB" /></div>
                }
                {
                    isModal && !viewModal && 
                    <div ref={modalRef} className={styles.modalBg} onClick={modalOutClickHandler}>
                        <div className={styles.modal} style={{[offset.yName]: offset.y , [offset.xName]: offset.x}}>
                            <SummaryCreateModal modal={isModal} setIsModal={setIsModal} mode={mode} setMode={setMode} />
                        </div>
                    </div>
                }
                {
                    viewModal && !isModal &&
                    <div ref={modalRef} className={styles.modalBg} onClick={modalOutClickHandler}>
                        <div className={styles.modal} style={{[offset.yName]: offset.y , [offset.xName]: offset.x}}>
                            <SummaryViewModal modal={viewModal} setIsModal={setViewModal} data={data} />
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Calendar;