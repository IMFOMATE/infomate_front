import CalendarMagnageFavoriteItem from '../../../components/calendar/manage/CalendarMagnageFavoriteItem';
import styles from './favoriteCalendar.module.css';


const FavoriteCalendarFollowing = () => {

    const data = [
        {calendarName:'df'},
        {},
        {},
        {},
    ];

    return (
        <>
            {data.map((item)=> <CalendarMagnageFavoriteItem key={item?.id} memberName={item?.memberName} calendarName={item?.calendarName} approve={item?.approve} rank={item?.rank} state={item?.id}  />)}         
        </>
    );
}

export default FavoriteCalendarFollowing;