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
import { MenuContext } from '../../context/MenuContext';

const Calendar = () =>{


    const containerRef = createRef();

    const [modal, setModal] = useState({
        isModal : false
    });

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

        setSchedule({...schedule, startDate: data?.start.toISOString().slice(0,19), endDate: data?.end.toISOString().slice(0,19) })
    };

    const modalOutClickHandler = e => {
        if(modalRef.current === e.target){
            setModal({isModal:false})
        }
        
    }
    const eventClickHandler = e => {
        console.log(e.event._def);
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
                
                events={[
                    {title: 'test1', date: '2023-08-21', color:'red', id:1212, extendedProps:{}},
                    {title: 'test121', start: '2023-08-21T12:00', end:'2023-08-22T23:00', color:'blue'},
                    {title: 'test121', start: '2023-08-21T00:00', end:'2023-08-21T24:00', color:'red'},
                ]}
                
                
                select={calenderClickHandler} // dateClick과 중복 클럭 이벤트 발생
                eventClick={eventClickHandler}
            />
        
            {
                modal.isModal && 
                <div ref={modalRef} className={styles.modalBg} onClick={modalOutClickHandler}>
                    <div className={className}>
                        <SecheduleSummaryCreate modal={modal} setModal={setModal} />
                    </div>
                </div>
            }
        </div>
    )
}

export default Calendar;