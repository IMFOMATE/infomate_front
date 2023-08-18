import './CalendarManageNavbar.css';

const CalendarManageNavbar = () => {

    const select = 'mycal' // useParam()

    const selectMenu = 'c-calendar-manager-main-select'
    
    return (
        <div className='c-calendar-manager-main-container'>
            <div>
                <span className={select === 'mycal'? selectMenu : ''}>내 캘린더</span>
            </div>
            <div>
                <span className={select === 'favoritecal'? selectMenu : ''}> 관심 캘린더 </span>
            </div>
        </div>
    )
}

export default CalendarManageNavbar;