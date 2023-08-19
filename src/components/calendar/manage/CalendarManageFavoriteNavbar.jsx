import styles from './calendarManageFavoriteNavbar.module.css'

const CalendarManageFavoriteNavbar = () => {
    
    // useParams()

    return (
         <div className={styles.submenu}>
            <div>
                <div className={styles.select}> 
                    내가 관심 등록한 캘린더
                </div>
            </div>
            <div>
                <div>
                    내 캘린더 등록한 사람들
                </div>
            </div>
        </div>
    );
}

export default CalendarManageFavoriteNavbar;