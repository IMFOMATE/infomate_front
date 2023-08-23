import styles from './favoriteCalendar.module.css'
import CalendarMagnageFavoriteItem from '../../../components/calendar/manage/CalendarMagnageFavoriteItem';
import { useContext, useEffect } from 'react';
import { ManageChkList } from '../../../layouts/FavoriteCalendarLayout';

const FavoriteCalendarFollower = () => {

    const {chk, setChk} = useContext(ManageChkList);

    useEffect(()=>{
        console.log(chk);
        setChk({itemAll:false})
    },[])
    
    const data = [
        {calendarName:'테스트'},
        {},
    ];
    return (
        <>
            {data.map((item)=> <CalendarMagnageFavoriteItem
                                        key={item?.id}
                                        memberName={item?.memberName}
                                        calendarName={item?.calendarName}
                                        approve={item?.approve}
                                        rank={item?.rank}
                                        state={item?.id}
                                />)}
        </>
    );
}

export default FavoriteCalendarFollower;