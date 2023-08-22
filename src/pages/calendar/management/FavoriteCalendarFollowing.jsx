import { useContext, useEffect } from 'react';
import CalendarMagnageFavoriteItem from '../../../components/calendar/manage/CalendarMagnageFavoriteItem';
import styles from './favoriteCalendar.module.css';
import { ManageChkList } from '../../../layouts/FavoriteCalendarLayout';


const FavoriteCalendarFollowing = () => {

    // const {follwerAllChk}

    const {chk, setChk} = useContext(ManageChkList);

    useEffect(()=>{
        setChk({favoriteAllChk:false})
    },[])

    const data = [
        {id:1, calendarName:'df'},
        {},
        {},
        {},
    ];

    return (
        <>
            {data.map((item, index)=> <CalendarMagnageFavoriteItem
                                        key={index}
                                        id={item?.id}
                                        memberName={item?.memberName}
                                        calendarName={item?.calendarName}
                                        approve={item?.approve}
                                        rank={item?.rank}
                                        state={item?.id}  />)}         
        </>
    );
}

export default FavoriteCalendarFollowing;