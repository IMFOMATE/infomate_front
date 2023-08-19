import styles from  './CalendarManageNavbar.module.css';

const CalendarManageNavbar = () => {

    const select = 'favoritecal' // useParam()

    // const selectMenu = 'c-calendar-manager-main-select'
    
    return (
        <div className={styles.container}>
            <div>
                <span className={select === 'mycal'? styles.select : ''}>내 캘린더</span>
            </div>
            <div>
                <span className={select === 'favoritecal'? styles.select : ''}> 관심 캘린더 </span>
            </div>
        </div>
    )
}

export default CalendarManageNavbar;