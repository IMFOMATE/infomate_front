import ButtonOutline from '../../components/common/button/ButtonOutline';
import ButtonInline from '../../components/common/button/ButtonInline';
import CheckBox from '../../components/common/input/CheckBox';
import InputEle from '../../components/common/input/Input';
import SelectEle from '../../components/common/select/SelectEle';
import styles from './scheduleSummary.module.css';
import { NavLink } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ScheduleProvider } from '../../layouts/CalendarLayout';
import { CalendarProvider } from '../../context/CalendarContext';
import { MenuContext } from '../../context/MenuContext';
import { useDispatch, useSelector } from 'react-redux';
import { getCalendarListAPI } from '../../apis/CalendarAPICalls';
import { postScheduleRegist } from '../../apis/ScheduleAPICalls';

const SecheduleSummaryCreate = ({modal, setModal, mode, setMode}) => {

    const {schedule, setSchedule} = useContext(ScheduleProvider);
    // const {events, setEvents} = useContext(CalendarProvider);
    const {toggleMenu} = useContext(MenuContext);
    const dispatch = useDispatch();
    const data = useSelector(state => state.calendarReducer);
    // const scheduleReducer = useSelector(state => state.scheduleReducer)
    const memberCode = 2; // 수정예정

    useEffect(()=>{
        dispatch(getCalendarListAPI({memberCode: memberCode}))
        setSchedule({
            ...schedule,
            refCalendar: data && data.data && data.data
                            .filter(item=> item.indexNo === 1)
                            .map(item=>item.id)[0]})
    },[])

    const scheduleChangeHanlder = e => {
        const eleName = e.target.name;

        // 수정 예정
        if(e.target.type === 'checkbox'){
            setSchedule({...schedule, [eleName]: e.target.checked})         
        }else if(eleName === 'calendar') {
            setSchedule({...schedule, [eleName]: parseInt(e.target.value)})
        }else{
            setSchedule({...schedule, [eleName]: e.target.value})
        }
    }


    const scheduleResitClickHandler = (e) => {
        
        // api 호출
        dispatch(postScheduleRegist({data: schedule}))
        
    }

    
    const isEleDisabled = () => {
        return mode === 'read'? true : false; 
    }
    
    const closeHanlder = e => {
        setModal(false);
        setMode('create')
    }

    return (
        <>
            <div className={[styles.container, modal && styles.active].join(' ')}>
                <div className={styles.title}>
                    <span style={{fontSize: '1.3rem'}}>
                     일정 등록
                    </span>
                    <span className={styles.close}>
                        <ButtonInline
                            value={'X'}
                            onClick={closeHanlder}
                        />    
                    </span>
               </div>
                <div className={styles.content}>
                    <div className={styles.col2}>
                        
                        <label>일정명</label>
                        <InputEle 
                            type={'text'}
                            name='title'
                            value={schedule?.title} 
                            onChange={scheduleChangeHanlder}
                            disabled={isEleDisabled()}
                        />
                    
                        <label>일시</label>    
                        <div>
                                <InputEle
                                    type={'datetime-local'} 
                                    style={{margin:'0 0 1vh 0'}}
                                    name='startDate'
                                    value={schedule?.startDate}
                                    onChange={scheduleChangeHanlder}
                                    disabled={isEleDisabled()}
                                />
                            {
                                schedule?.allDay || <InputEle 
                                    type={'datetime-local'}
                                    name='endDate'
                                    value={schedule?.endDate}
                                    onChange={scheduleChangeHanlder}
                                    disabled={isEleDisabled()}
                                />    
                            }
                            
                            <div style={{height:30, alignSelf: 'center'}}>
                                <CheckBox 
                                    type="checkbox"
                                    name="allDay"
                                    isChangeColor={true}
                                    style={{display:'inline',position: 'relative', top:'10px'}}
                                    checked={schedule?.allDay}
                                    onChange={scheduleChangeHanlder}
                                    disabled={isEleDisabled()}
                                />
                                <label style={{display:'inline',position: 'relative', top: '11px',margin: '5px'}}>종일</label>
                            </div>
                        </div>

                        <label>캘린더</label>
                        <div>
                            <SelectEle 
                                name='refCalendar'
                                value={schedule?.calendar}
                                options={data && data.data && data?.data?.filter(item => (
                                                            item.departmentCode !== 0 && item.memberCode === 2 //'로그인계정MemberCode'
                                                        )).map(item => (
                                                            {value:item.id, text:item.name})
                                                        )}
                                onChange={scheduleChangeHanlder}
                                disabled={isEleDisabled()}
                                style={{width:'100%',padding: 0, color:'gray'}}
                            />
                        </div>

                        <label>장소</label>
                        <InputEle 
                            name='address'
                            type={'text'}
                            value={schedule?.address}
                            onChange={scheduleChangeHanlder}
                            disabled={isEleDisabled()}
                        />
                        
                        <label>전사일정</label>
                        <div style={{textAlign: 'left'}}>
                            <CheckBox
                                name='corpSchdl'
                                type="checkbox"
                                isChangeColor={true}
                                style={{position: 'relative', top:'2px'}}
                                onChange={scheduleChangeHanlder}
                                disabled={isEleDisabled()}
                            />
                        </div>
                    </div>
                    <div className={styles.footer}>
                        {
                            mode === 'read' ||
                            <NavLink to='./regist'>
                                <ButtonOutline value={'상세일정등록'} onClick={toggleMenu} style={{margin:'5px'}} />
                            </NavLink>    
                        }
                        {
                            mode === 'read' ?
                            <NavLink to={`./regist?scheduleId=${schedule?.id}`}>
                                <ButtonOutline value={'자세히보기'} style={{margin:'5px'}} onClick={schedule?.id}  />
                            </NavLink> :
                            <ButtonOutline value={'등록'} style={{margin:'5px'}} onClick={scheduleResitClickHandler}  />

                        }
                        <ButtonOutline 
                            value={'닫기'}
                            isCancel={true}
                            style={{margin:'5px'}}
                            onClick={closeHanlder}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
    

export default SecheduleSummaryCreate;