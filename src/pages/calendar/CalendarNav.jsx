import styles from './CalendarNav.module.css';
import CalendarNavItem from '../../components/calendar/nav/CalendarNavItem';
import NavStyle from '../../components/common/Nav.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import ButtonSimple from '../../components/common/button/ButtonSimple';
import { useContext, useEffect, useState } from 'react';
import { SideSubLabel } from '../../components/common/label/CusLabel';
import { CalendarFilterContext } from '../../context/CalendarContext';
import { MenuContext } from '../../context/MenuContext';
import { getCalendarListAPI } from '../../apis/CalendarAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CALENDAR_LIST } from '../../modules/CalendarMoudule';
import { LoadingSpiner } from '../../components/common/other/LoadingSpiner';

const CalendarNav = () => {

    const {menuState, toggleMenu} = useContext(MenuContext);
    const {filter, setFilter} = useContext(CalendarFilterContext);
    const member = useSelector(state => state.memberReducer);
    
    const dispatch = useDispatch();

    const data = useSelector(state => state.calendarReducer[GET_CALENDAR_LIST]);
    const favCalendarReducer = useSelector(state => state.favCalendarReducer);

    const [moreToggle, setMoreToggle] = useState({
        my:false,
        fav:false,
    });

    const navigate = useNavigate();

    const myClassName = [
                            NavStyle.sideList,
                            styles.listContainer, 
                            moreToggle?.my && styles.listContainerActive
                        ].join(' ');
    const corpClassName = [
                            NavStyle.sideList,
                            styles.listContaine
                        ].join(' ');
    const favClassName = [
                            NavStyle.sideList, 
                            styles.listContainer,
                            moreToggle?.fav && styles.listContainerActive
                        ].join(' ');

    useEffect(()=>{
        // if(data) return;
        dispatch(getCalendarListAPI());
    },[filter,favCalendarReducer])

    if(!data) return <LoadingSpiner />
    if(data && filter.includes(0)){ // 나은 방법 구상중 
        setFilter([
        ...data.data.filter(item => 
            item.memberCode !== member.data.memberCode && item.departmentCode === null
            ).map(item => parseInt(item.id))])
    }

    const calendarFilterChange = e => {
        if(e.target.checked){
            setFilter([...filter.filter(item => 
                item !== parseInt(e.target.id))
            ]);
        }else{
            setFilter([...filter, 
                parseInt(e.target.id)
            ]);
        }   
    }
console.log('calendarNav');
    const moreClickHandler = (e) => {
        setMoreToggle({[e.target.name]:!moreToggle[e.target.name]});
    }

    const CalednarConfigPage = () => {
        menuState && toggleMenu();
        navigate('/calendar/management/mypage');
    }
    
    return (
        <div className={styles.container}>
            <div className={NavStyle.sideTop}>
                <h1 className={NavStyle.title}>일정</h1>
                <NavLink 
                    to='/calendar/regist?new=true' 
                    className={NavStyle.new} 
                    onClick={toggleMenu}>
                    일정등록
                </NavLink>
            </div>

            <SideSubLabel text={'내 일정'} />
            
            <div className={myClassName}>
                {
                    data.data.filter(item => (
                        item.departmentCode === null && item.memberCode === member.data.memberCode // memberCode 수정
                    )).sort((prev , next) =>
                        prev.indexNo - next.indexNo
                    ).filter((item, index)=> (
                        moreToggle.my ? item : index < 3 
                    )).map(item => (
                         <CalendarNavItem 
                            key={item.id}
                            calendarName={item.defaultCalendar? `${item.name} (기본)`: item.name}
                            color={item.labelColor}
                            id={item.id}
                            isCheck={!filter?.includes(parseInt(item.id))}
                            onChange={calendarFilterChange}

                        />
                    ))
                }
            </div>
            {
                data.data.filter(item => (
                    item.departmentCode === null && item.memberCode === member.data.memberCode // memberCode 수정
                )).length > 3 &&
                <ButtonSimple
                    name='my'
                    text={'더보기'}
                    onClick={moreClickHandler}
                />
            }

            <br/>
            <br/>

            <SideSubLabel text={'회사 일정'} />
            <div className={corpClassName}>
                {
                    data.data.filter(item => (
                        item.departmentCode === member.data.deptCode || item.departmentCode  === 1 // 조건 수정 예정
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
                            isCheck={!filter?.includes(parseInt(item.id))}
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
                    data.data.filter(item => (
                        item.memberCode !== member.data.memberCode && item.departmentCode === null // membercode조건 수정 예정
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
                            isCheck={!filter?.includes(parseInt(item.id))}
                            onChange={calendarFilterChange}
                        />
                    ))
                }
            </div>
            {
                data.data.filter(item => (
                    item.memberCode !== member.data.memberCode && item.departmentCode === null // membercode조건 수정 예정
                )).length > 3 &&
                <ButtonSimple
                    name='fav'
                    text={'더보기'}
                    onClick={moreClickHandler}
                />

            }
            <br/>
            <br/>
            <div style={{margin: '20px 0'}}>
                <ButtonSimple
                    name='fav'
                    text={'캘린더 설정'}
                    onClick={CalednarConfigPage}
                />
            </div>
        </div>
    )
}

export default CalendarNav;