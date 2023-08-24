import FullCalendar from "@fullcalendar/react";
import koLocale from '@fullcalendar/core/locales/ko';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import styles from './Calendar.module.css';
import { createRef, useContext, useEffect, useRef, useState } from "react";
import SecheduleSummaryCreate from "./ScheduleSummaryCreate";
import './calendar.css'
import { ScheduleProvider } from "../../layouts/CalendarLayout";


const Calendar = () =>{

    // [예정] read mode 경우 데이터 없는 라벨은 미표시
    const containerRef = createRef();

    const [modal, setModal] = useState({
        isModal : false
    });

    const [mode, setMode] = useState('create');

    const [isMobile, setIsMobile] = useState(false);
    const [innerSize, setInnerSize] = useState(window.innerWidth);
    
    const {schedule, setSchedule} = useContext(ScheduleProvider);
    
    const modalRef = useRef(null);

    const className = [styles.modal, styles.modalActive].join(' ')

    useEffect(()=>{
        setSchedule({})
        if(innerSize <= 480){
            setIsMobile(true);
        }else{
            setIsMobile(false);
        }

        const sizeObserver = new ResizeObserver((entires)=>{
        
            const { width } = entires[0].contentRect;
            setInnerSize(width)
            if(width <= 480){
                setIsMobile(true);
            }else{
                setIsMobile(false);
            }
            
        }) 
        sizeObserver.observe(containerRef.current);

    },[])

    const calenderClickHandler = data => {
        setSchedule({}) // 커스텀 등록에서 데이터 삭제 안됨

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

        setSchedule({...schedule, 
            // id: e.event._ef  id 값 추가
            title: e.event._def?.title,
            startDate: e.event._instance.range.start?.toISOString().slice(0,19),
            endDate: e.event._instance.range.end?.toISOString().slice(0,19),
            allDay: e.event._def?.allDay})
    }

    const eventList = [
        {title: 'test1', date: '2023-08-21', color:'red', id:1212, extendedProps:{}},
        {title: 'test121', start: '2023-08-21T12:00', end:'2023-08-22T23:00', color:'blue'},
        {title: 'test121', start: '2023-08-21T00:00', end:'2023-08-21T24:00', color:'red'},
    ]

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
                events={eventList}
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
        </div>
    )
}

export default Calendar;