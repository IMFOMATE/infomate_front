import styles from './favoriteCalendar.module.css'
import CalendarMagnageFavoriteItem from '../../../components/calendar/manage/CalendarMagnageFavoriteItem';

const FavoriteCalendarFollower = () => {
    const data = [
        {},
        {},
    ];
    return (
        <>
            {data.map((item)=> <CalendarMagnageFavoriteItem key={item?.id} memberName={item?.memberName} calendarName={item?.calendarName} approve={item?.approve} rank={item?.rank} state={item?.id}  />)}
        </>
    );
}

export default FavoriteCalendarFollower;