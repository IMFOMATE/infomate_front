import styles from './CalendarNav.module.css';
import CalendarNavItem from '../../components/calendar/nav/CalendarNavItem';
import NavStyle from '../../components/common/Nav.module.css';
import { NavLink } from 'react-router-dom';
import ButtonSimple from '../../components/common/button/ButtonSimple';
import { useState } from 'react';
import { SideSubLabel } from '../../components/common/label/CusLabel';


const CalendarNav = () => {

    const [moreToggle, setMoreToggle] = useState({
        my:false,
        corp:false,
        fav:false,
    });
    

    const sampleData = [
        {className: '캘린더이름1', color: '#FF00FF', id:1},
        {className: '캘린더이름2', color: '#FF0000', id:2},
        {className: '캘린더이름3', color: '#FFFF00', id:3},
        {className: '캘린더이름4', color: '#0000FF', id:4},
        {className: '캘린더이름5', color: '#00FFFF', id:5},
        {className: '캘린더이름5', color: '#00FFFF', id:6},
        {className: '캘린더이름5', color: '#00FFFF', id:7},
        {className: '캘린더이름5', color: '#00FFFF', id:8},
        {className: '캘린더이름5', color: '#00FFFF', id:9},
        {className: '캘린더이름5', color: '#00FFFF', id:10},
        {className: '캘린더이름5', color: '#00FFFF', id:11},
        {className: '캘린더이름5', color: '#00FFFF', id:12},
        {className: '캘린더이름5', color: '#00FFFF', id:13},
        {className: '캘린더이름5', color: '#00FFFF', id:14},
    ]

    const moreClickHandler = (e) => {
        setMoreToggle({[e.target.name]:!moreToggle[e.target.name]});
    
    }
 
    return (
        <div className={styles.container}>
            <div className={NavStyle.sideTop}>
                <h1>일정</h1>
                <NavLink to='/calendar/regist'>
                    일정등록
                </NavLink>
            </div>

            <SideSubLabel text={'내 일정'} />
            
            <div className={[NavStyle.sideList, styles.listContainer, moreToggle?.my && styles.listContainerActive].join(' ')}>
                {
                    sampleData.filter((item, index)=> (
                        moreToggle.my ? item : index < 3 
                    )).map(item => (
                         <CalendarNavItem calendarName={item.className} color={item.color} id={`my${item.id}`} />
                    ))
                }
            </div>
            <ButtonSimple name='my' text={'더보기'} onClick={moreClickHandler} />
            
            <br/>
            <br/>

            <SideSubLabel text={'회사 일정'} />
            <div className={[NavStyle.sideList, styles.listContainer, moreToggle?.corp && styles.listContainerActive].join(' ')}>
                {
                    sampleData.filter((item, index)=> (
                        moreToggle.corp ? item : index < 3 
                    )).map(item =>(
                        <CalendarNavItem calendarName={item.className} color={item.color} id={`corp${item.id}`} />
                    ))
                }
            </div>
            <ButtonSimple name='corp' text={'더보기'} onClick={moreClickHandler} />
            
            <br />
            <br />

            <SideSubLabel text={'관심 일정'} />
            <div className={[NavStyle.sideList, styles.listContainer, moreToggle?.fav && styles.listContainerActive].join(' ')}>
                {
                    sampleData.filter((item, index)=> (
                        moreToggle.fav ? item : index < 3 
                    )).map(item =>(
                        <CalendarNavItem calendarName={item.className} color={item.color} id={`fav${item.id}`} />
                    ))
                }
            </div>
            <ButtonSimple name='fav' text={'더보기'} onClick={moreClickHandler} />
            
            <br/>
            <br/>
            <div style={{margin: '20px 0'}}>
                <ButtonSimple name='fav' text={'캘린더 설정'} onClick={()=> document.location.href='./calendar/management'} />
            </div>
        </div>
    )
}

export default CalendarNav;