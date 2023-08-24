import { useContext, useEffect } from 'react';
import CheckBox from '../../common/input/CheckBox';
import CalendarManagefavoriteModifyMenu from './CalendarManagefavoriteModifyMenu';
import styles from './calendarMagnageFavoriteFollowerHeader.module.css'

const CalendarMagnageFavoriteFollowerHeader = ({chk, setchk}) => {
    const className  = [styles.fowHdGrid].join(' ');

    return(
        <>
            <div>
                <CalendarManagefavoriteModifyMenu />
            </div>
            <div className={className}>
                <div>
                    <div>
                        <CheckBox isChangeColor={true} checked={chk}  onChange={setchk} />
                    </div>
                    <div>직원 이름(직함)</div>
                    <div>캘린더 이름</div>
                    <div>날짜</div>
                </div>
                <div>
                    <div>승인</div>
                </div>
            </div>
        
        </>
    )
}

export default CalendarMagnageFavoriteFollowerHeader;

