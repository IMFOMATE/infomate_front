import CheckBox from '../../common/input/CheckBox';
import CalendarManagefavoriteModifyMenu from './CalendarManagefavoriteModifyMenu';
import styles from './calendarMagnageFavoriteFollowerHeader.module.css'

const CalendarMagnageFavoriteFollowerHeader = ({chk, setChk}) => {
    const className  = [styles.fowHdGrid, styles.fowHdHeader].join(' ');

    return(
        <>
            <div>
                <CalendarManagefavoriteModifyMenu />
            </div>
            <div className={className}>
                <div>
                    <div>
                        <CheckBox 
                            isChangeColor={true} 
                            checked={chk}  
                            onChange={setChk} 
                        />
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

