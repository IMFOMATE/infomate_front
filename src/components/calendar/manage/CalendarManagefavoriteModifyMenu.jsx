import { useLocation } from 'react-router-dom';
import styles from './calendarManagefavoriteModifyMenu.module.css';

const CalendarManagefavoriteModifyMenu = (props) => {

    const {pathname} = useLocation();

    const selctSubMenu = pathname.split('/')[pathname.split('/').length-1];

    return (
        <div className={styles.container}>

            {selctSubMenu === 'following'? 
            <button onClick={()=>{}}>
                <span className={styles.meterialIcon}>edit</span>
                수락
            </button>
            : ''
            }
            <button onClick={()=>{}}>
                <span className={styles.meterialIcon}>delete</span>
                삭제{selctSubMenu === 'following' ? '(거절)' :''}
            </button>
        </div>
        
    );
}


export default CalendarManagefavoriteModifyMenu;