import styles from './CalendarNav.module.css';
import CalendarNavItem from '../../components/calendar/nav/CalendarNavItem';
import NavStyle from '../../components/common/Nav.module.css';
import { NavLink } from 'react-router-dom';
import ButtonSimple from '../../components/common/button/ButtonSimple';
import { useContext, useEffect, useState } from 'react';
import { SideSubLabel } from '../../components/common/label/CusLabel';
import { CalendarProvider } from '../../context/CalendarContext';
import { MenuContext } from '../../context/MenuContext';


const CalendarNav = () => {

    const {toggleMenu} = useContext(MenuContext);

    const [moreToggle, setMoreToggle] = useState({
        my:false,
        corp:false,
        fav:false,
    });

    const {calendarList, setCalendarList} = useContext(CalendarProvider);

    useEffect(()=>{
        //캘린더 리스트 api 호출
        setCalendarList([1,2,3,4,5, 11, 12, 13])
    },[])

    const calendatListChangehandler = e => {
        console.log(e.target.cheked);
        if(e.target.checked){
            setCalendarList([...calendarList, parseInt(e.target.id)]);
        }else{
            setCalendarList([...calendarList].filter(item => item !== parseInt(e.target.id)));
        }   
    }

    const moreClickHandler = (e) => {
        setMoreToggle({[e.target.name]:!moreToggle[e.target.name]});
    }

    const sampleData = [
        {id:1, name: '캘린더이름1', labelColor:'#FF00FF', memberCode: 2, departmentCode: null, indexNo: 1 },
        {id:2, name: '캘린더이름1', labelColor:'#FF0012', memberCode: 3, departmentCode: null, indexNo: 1 },
        {id:3, name: '캘린더이름1', labelColor:'#FF12FF', memberCode: 4, departmentCode: null, indexNo: 1 },
        {id:4, name: '캘린더이름1', labelColor:'#FF80FF', memberCode: 5, departmentCode: null, indexNo: 1 },
        {id:5, name: '캘린더이름1', labelColor:'#FF0011', memberCode: 6, departmentCode: null, indexNo: 1 },
        {id:6, name: '캘린더이름1', labelColor:'#1100FF', memberCode: 7, departmentCode: null, indexNo: 1 },
        {id:7, name: '캘린더이름1', labelColor:'#0f0fFF', memberCode: 0, departmentCode: 0, indexNo: 1 },
        {id:8, name: '캘린더이름1', labelColor:'#FF00FF', memberCode: 0, departmentCode: 1, indexNo: 3 },
        {id:9, name: '캘린더이름1', labelColor:'#FF00FF', memberCode: 0, departmentCode: 1, indexNo: 2 },
        {id:10, name: '캘린더이름10', labelColor:'#FF00FF', memberCode: 1, departmentCode: null, indexNo: 5 },
        {id:11, name: '캘린더이름11', labelColor:'#FF00FF', memberCode: 1, departmentCode: null, indexNo: 4 },
        {id:12, name: '캘린더이름12', labelColor:'#FF00FF', memberCode: 1, departmentCode: null, indexNo: 10 },
        {id:13, name: '캘린더이름13', labelColor:'#FF00FF', memberCode: 1, departmentCode: null, indexNo: 2 },
        {id:14, name: '캘린더이름14', labelColor:'#FF00FF', memberCode: 1, departmentCode: null, indexNo: 1 },
        
    ]
    
 
    return (
        <div className={styles.container}>
            <div className={NavStyle.sideTop}>
                <h1 className={NavStyle.title}>일정</h1>
                <NavLink to='/calendar/regist' className={NavStyle.new} onClick={toggleMenu}>
                    일정등록
                </NavLink>
            </div>

            <SideSubLabel text={'내 일정'} />
            
            <div className={[NavStyle.sideList, styles.listContainer, moreToggle?.my && styles.listContainerActive].join(' ')}>
                {
                    sampleData.filter(item => (
                        item.departmentCode === null && item.memberCode === 1
                    )).filter((item, index)=> (
                        moreToggle.my ? item : index < 3 
                    )).sort((prev , next) =>
                        prev.indexNo - next.indexNo
                    ).map(item => (
                         <CalendarNavItem calendarName={item.name} color={item.labelColor} id={item.id} isCheck={[...calendarList].includes(parseInt(item.id))} onChange={calendatListChangehandler} />
                    ))
                }
            </div>
            
            <ButtonSimple name='my' text={'더보기'} onClick={moreClickHandler} />
            
            <br/>
            <br/>

            <SideSubLabel text={'회사 일정'} />
            <div className={[NavStyle.sideList, styles.listContainer, moreToggle?.corp && styles.listContainerActive].join(' ')}>
                {
                    sampleData.filter(item => (
                        item.departmentCode === 1 || item.departmentCode  === 0 // 조건 수정 예정
                    )).filter((item, index) => (
                        moreToggle.corp ? item : index < 3 
                    )).sort((prev , next) =>
                        prev.indexNo - next.indexNo
                    ).map(item => (
                        <CalendarNavItem calendarName={item.name} color={item.labelColor} id={item.id} isCheck={[...calendarList].includes(parseInt(item.id))} onChange={calendatListChangehandler}/>
                    ))
                }
            </div>
            {/* <ButtonSimple name='corp' text={'더보기'} onClick={moreClickHandler} /> */}
            
            <br />
            <br />

            <SideSubLabel text={'관심 일정'} />
            <div className={[NavStyle.sideList, styles.listContainer, moreToggle?.fav && styles.listContainerActive].join(' ')}>
                {
                    sampleData.filter(item => (
                        item.memberCode !== 1 // 조건 수정 예정
                    )).filter((item, index)=> (
                        moreToggle.fav ? item : index < 3 
                    )).sort((prev , next) =>
                        prev.indexNo - next.indexNo
                    ).map(item =>(
                        <CalendarNavItem calendarName={item.name} color={item.labelColor} id={item.id} isCheck={[...calendarList].includes(parseInt(item.id))} onChange={calendatListChangehandler} />
                    ))
                }
            </div>
            <ButtonSimple name='fav' text={'더보기'} onClick={moreClickHandler} />
            
            <br/>
            <br/>
            <div style={{margin: '20px 0'}}>
                <ButtonSimple name='fav' text={'캘린더 설정'} onClick={()=> document.location.href='/calendar/management/mypage'} />
            </div>
        </div>
    )
}

export default CalendarNav;