import FullCalendar from "@fullcalendar/react";
import koLocale from '@fullcalendar/core/locales/ko';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import styles from './Calendar.module.css';
import { useRef, useState } from "react";
import SecheduleSummaryCreate from "./ScheduleSummaryCreate";
import './calendar.css'

const Calendar = () =>{

    const [modal, setModal] = useState({
        isModal : false,
        data: {}
    });

    const modalRef = useRef(null);

    const className = [styles.modal, styles.modalActive].join(' ')

    const calenderClickHandler = arg => {
        console.log(arg)
        setModal({isModal: true, data: arg });
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
        <div className={styles.container}>
            <FullCalendar
                locale={koLocale}
                timeZone={'Asia/Seoul'}
                stickyHeaderDates={true}
                lazyFetching={true}
                handleWindowResize={true}
                windowResizeDelay={0}
                navLinks={true}
                // dragScroll={true}
                editable={true}
                selectable={true}
                // selectMirror={true}
                dayMaxEvent={true}
                plugins={[ multiMonthPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right:'scheduleRegist multiMonthYear dayGridMonth timeGridWeek timeGridDay'
                }}
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
                // dateClick={calenderClickHandler}
                select={calenderClickHandler} // dateClick과 중복 클럭 이벤트 발생
                eventClick={eventClickHandler}
                navLinkDayClick={e=>console.log(e)}
            />
            {modal.isModal && 
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