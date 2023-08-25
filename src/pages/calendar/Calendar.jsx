import { createRef, useContext, useEffect, useRef, useState } from "react";
import './calendar.css'
import styles from './Calendar.module.css';
import FullCalendar from "@fullcalendar/react";
import koLocale from '@fullcalendar/core/locales/ko';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import SecheduleSummaryCreate from "./ScheduleSummaryCreate";
import { CalendarProvider } from "../../context/CalendarContext";
import { ScheduleProvider } from "../../layouts/CalendarLayout";
import { useDispatch, useSelector } from "react-redux";
import { getCalendarFindAllAPI } from '../../apis/CalendarAPICalls';




const Calendar = () =>{

    // [예정] read mode 경우 데이터 없는 라벨은 미표시
    const containerRef = createRef();

    const [modal, setModal] = useState({
        isModal : false
    });

    const [mode, setMode] = useState('create');

    const [isMobile, setIsMobile] = useState(false);
    const [innerSize, setInnerSize] = useState();


    const {events, setEvents} = useContext(CalendarProvider);
    
    const {schedule, setSchedule} = useContext(ScheduleProvider);
    const data = useSelector(state => state.calendarReducer);
    const dispatch = useDispatch();

    const memberCode = 2; // 삭제 예정

    const modalRef = useRef(null);

    const className = [styles.modal, styles.modalActive].join(' ')

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
        
        setSchedule({})
        if(innerSize <= 480){
            setIsMobile(true);
        }else{
            setIsMobile(false);
        }
        
        sizeObserver.observe(containerRef.current);

        dispatch(getCalendarFindAllAPI({memberCode:memberCode}))

        return () => {
            sizeObserver.disconnect();
        }
    },[modal])

    const calenderClickHandler = data => {
        if(isMobile) {
            document.location.href='./calendar/regist';
        }else{
            setModal({isModal: true});
        }

        setSchedule({
            ...schedule, 
            startDate: data?.start?.toISOString().slice(0,19),
            endDate: data?.end?.toISOString().slice(0,19)
        })
        
        // api post 처리 성공시 events 데이터에 삽입
        // post 성공 후 schedule 값 events로 입력

    };

    const modalOutClickHandler = e => {
        if(modalRef.current === e.target){
            setModal({isModal:false});
            setMode('create')
        }
        
    }
    const eventClickHandler = e => {
        setModal({isModal:true})
        setMode('read')
    }

    const event = () =>{
        const event = [];
        data && data.data && data.data
            .filter(item => events && events.filter && !events?.filter.includes(item.id))
            .forEach(item1 => {
                item1 && item1.scheduleList && item1.scheduleList.forEach(item => 
                        event.push({title: item.title, start:item.startDate, end:item.endDate, allDay: item.allDay, color: item1.labelColor, textColor: 'black'})
                )
            })
        return event;
    }

    return (
        <div className={styles.container} ref={containerRef}>

            <FullCalendar
                locale={koLocale}
                timeZone={'Asia/Seoul'}
                stickyHeaderDates={true}
                lazyFetching={true}
                handleWindowResize={true}
                windowResizeDelay={0}
                navLinks={true}
                dragScroll={true}
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
                        click: ()=>{
                            calenderClickHandler();
                        }   
                    }
                }}
                events={event()}
                select={calenderClickHandler} // dateClick과 중복 클럭 이벤트 발생
                eventClick={eventClickHandler}
            />
        
            {
                modal.isModal && 
                <div ref={modalRef} className={styles.modalBg} onClick={modalOutClickHandler}>
                    <div className={className}>
                        <SecheduleSummaryCreate modal={modal} setModal={setModal} mode={mode} setMode={setMode} />
                    </div>
                </div>
            }
            {
                
                
            }
            
        </div>
    )
}

export default Calendar;