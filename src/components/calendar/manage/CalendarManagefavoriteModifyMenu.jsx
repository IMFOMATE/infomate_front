import { useLocation } from 'react-router-dom';
import styles from './calendarManagefavoriteModifyMenu.module.css';
import icon from '../../common/meterialIcon.module.css'
import { useContext } from 'react';
import { ManageChkList } from '../../../layouts/FavoriteCalendarLayout';

const CalendarManagefavoriteModifyMenu = () => {

    const {pathname} = useLocation();

    const selctSubMenu = pathname.split('/')[pathname.split('/').length-1];

    const {chk, setChk} = useContext(ManageChkList);

    const approvalRequest = () => {
        // api 호출
    }
    const rejectRequest = () => {
        // api 호출
    }
    return (
        <div className={styles.container}>

            {selctSubMenu === 'following'? 
            <button onClick={approvalRequest}>
                <span className={icon.meterialIcon}>edit</span>
                수락
            </button>
            : ''
            }
            <button onClick={rejectRequest}>
                <span className={icon.meterialIcon}>delete</span>
                삭제{selctSubMenu === 'following' ? '(거절)' :''}
            </button>
        </div>
        
    );
}


export default CalendarManagefavoriteModifyMenu;