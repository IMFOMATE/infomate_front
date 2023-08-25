import styles from './CalendarNav.module.css';
import CalendarNavItem from '../../components/calendar/nav/CalendarNavItem';
import NavStyle from '../../components/common/Nav.module.css';
import { NavLink } from 'react-router-dom';
import ButtonSimple from '../../components/common/button/ButtonSimple';
import { useContext, useEffect, useState } from 'react';
import { SideSubLabel } from '../../components/common/label/CusLabel';
import { CalendarProvider } from '../../context/CalendarContext';
import { MenuContext } from '../../context/MenuContext';
import { getCalendarListAPI } from '../../apis/CalendarAPICalls';
import { useDispatch, useSelector } from 'react-redux';

const CalendarNav = () => {

    const {toggleMenu} = useContext(MenuContext);
    const {events, setEvents} = useContext(CalendarProvider);
    

    const dispatch = useDispatch();

    const data = useSelector(state => state.calendarReducer);

    const [moreToggle, setMoreToggle] = useState({
        my:false,
        fav:false,
    });

    const myClassName = [NavStyle.sideList, styles.listContainer, moreToggle?.my && styles.listContainerActive].join(' ');
    const corpClassName = [NavStyle.sideList, styles.listContaine].join(' ');
    const favClassName = [NavStyle.sideList, styles.listContainer, moreToggle?.fav && styles.listContainerActive].join(' ');


    useEffect(()=>{
        //캘린더 리스트 api 호출
        dispatch(getCalendarListAPI({memberCode:2}))
        // console.log(calendar?.data);
    },[])


    const calendarFilterChange = e => {
        if(e.target.checked){
            setEvents({...events, filter : [...events.filter].filter(item => item !== parseInt(e.target.id))});
        }else{
            setEvents({...events, filter : [...events.filter, parseInt(e.target.id)]});
        }   
    }

    const moreClickHandler = (e) => {
        setMoreToggle({[e.target.name]:!moreToggle[e.target.name]});
    }

 
    return (
        <div className={styles.container}>
            <div className={NavStyle.sideTop}>
                <h1 className={NavStyle.title}>일정</h1>
                <NavLink to='/calendar/regist' className={NavStyle.new} onClick={toggleMenu}>
                    일정등록
                </NavLink>
            </div>

            <SideSubLabel text={'내 일정'} />
            
            <div className={myClassName}>
                {
                    data && data.data && data.data.filter(item => (
                        item.departmentCode === null && item.memberCode === 2 // memberCode 수정
                    )).sort((prev , next) =>
                        prev.indexNo - next.indexNo
                    ).filter((item, index)=> (
                        moreToggle.my ? item : index < 3 
                    )).map(item => (
                         <CalendarNavItem 
                            key={item.id}
                            calendarName={item.name}
                            color={item.labelColor}
                            id={item.id}
                            isCheck={!events.filter.includes(parseInt(item.id))}
                        onChange={calendarFilterChange} />
                    ))
                }
            </div>
            
            <ButtonSimple name='my' text={'더보기'} onClick={moreClickHandler} />
            
            <br/>
            <br/>

            <SideSubLabel text={'회사 일정'} />
            <div className={corpClassName}>
                {
                    data && data.data && data?.data?.filter(item => (
                        item.departmentCode === 1 || item.departmentCode  === 0 // 조건 수정 예정
                    )).sort((prev , next) =>
                        prev.indexNo - next.indexNo
                    ).filter((item, index) => (
                        moreToggle.corp ? item : index < 3 
                    )).map(item => (
                        <CalendarNavItem
                            key={item.id}
                            calendarName={item.name}
                            color={item.labelColor}
                            id={item.id}
                            isCheck={!events.filter.includes(parseInt(item.id))}
                            onChange={calendarFilterChange}
                        />
                    ))
                }
            </div>
            {/* <ButtonSimple name='corp' text={'더보기'} onClick={moreClickHandler} /> */}
            
            <br />
            <br />

            <SideSubLabel text={'관심 일정'} />
            <div className={favClassName}>
                {
                    data && data.data && data.data.filter(item => (
                        item.memberCode !== 2 && item.departmentCode === null // membercode조건 수정 예정
                    )).sort((prev , next) =>
                        prev.indexNo - next.indexNo
                    ).filter((item, index)=> (
                        moreToggle.fav ? item : index < 3 
                    )).map(item =>(
                        <CalendarNavItem
                            key={item.id}
                            calendarName={item.name}
                            color={item.labelColor}
                            id={item.id}
                            isCheck={!events.filter.includes(parseInt(item.id))}
                            onChange={calendarFilterChange}
                        />
                    ))
                }
            </div>
            <ButtonSimple 
                name='fav'
                text={'더보기'}
                onClick={moreClickHandler} />
            
            <br/>
            <br/>
            <div style={{margin: '20px 0'}}>
                <ButtonSimple
                    name='fav'
                    text={'캘린더 설정'}
                    onClick={()=> document.location.href='/calendar/management/mypage'}
                />
            </div>
        </div>
    )
}

export default CalendarNav;