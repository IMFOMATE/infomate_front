import { NavLink, useHref, useLocation, useParams } from 'react-router-dom';
import styles from  './CalendarManageNavbar.module.css';

const CalendarManageNavbar = () => {

    const select = 'favoritecal' // useParam()

    const {pathname} = useLocation();
    const currentMenu = pathname.split('/')[pathname.split('/').length - 1];
    
    return (
        <div className={styles.container}>
            <div>
                <NavLink 
                    to='./mypage' 
                    style={{color:'gray'}}
                >
                    <span className={currentMenu === 'mypage' || currentMenu === 'management' ? styles.select : ''}>내 캘린더</span>
                </NavLink>
            </div>
            <div>
                <NavLink 
                    to="./favorite/following" 
                    style={{color:'gray'}}
                >
                    <span className={currentMenu === 'favorite' || currentMenu === 'following'  || currentMenu === 'follower' ? styles.select : ''}> 관심 캘린더 </span>
                </NavLink>
            </div>
        </div>
    )
}

export default CalendarManageNavbar;