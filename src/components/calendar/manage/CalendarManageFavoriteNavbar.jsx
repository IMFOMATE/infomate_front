import { NavLink, useLocation } from 'react-router-dom';
import styles from './calendarManageFavoriteNavbar.module.css';


const CalendarManageFavoriteNavbar = () => {
    
    const {pathname} = useLocation();

    const selctSubMenu = pathname.split('/')[pathname.split('/').length - 1];

    return (
         <div className={styles.submenu}>
            <div>
                <div className={selctSubMenu === 'following' && styles.select}> 
                    <NavLink 
                        to='./following' 
                        style={{color:'gray'}}
                    >
                        내가 관심 등록한 캘린더
                    </NavLink>
                </div>
            </div>
            <div>
                <div className={selctSubMenu === 'follower' && styles.select}>
                    <NavLink 
                        to='./follower'
                        style={{color:'gray'}}
                    >
                        내 캘린더 등록한 사람들
                    </NavLink>
                </div>
            </div>

            <div>
                <div className={selctSubMenu === 'public' && styles.select}>
                    <NavLink 
                        to='./public'  
                        style={{color:'gray'}}
                    >
                        공개된 캘린더 목록
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default CalendarManageFavoriteNavbar;