import { useContext, useEffect } from 'react';
import CheckBox from '../../common/input/CheckBox';
import styles from './calendarMagnageFavoriteFollowerHeader.module.css'
import { ManageChkList } from '../../../layouts/FavoriteCalendarLayout';

const CalendarMagnageFavoriteFollowerHeader = ({id, memberName, calendarName, approve, rank, state}) => {
    const className  = [styles.fowHdGrid].join(' ');

    const {chk, setChk} = useContext(ManageChkList)

    useEffect(()=>{
        
    },[chk])

    const itemAllCheckHandler = (e) => {
        setChk({...chk, selectList: [...chk.selectList, e.target.id]})
        // console.log(chk); 추가 안됨 수정예정
    }

    

    return(
        <div className={className} style={{borderBottom:0, padding:'5px 0 5px 0'}} >
            <div>
                <div>
                    <CheckBox id={id} isChangeColor={true} onChlick={itemAllCheckHandler} />
                </div>
                <div>{`${memberName}(${rank})`}</div>
                <div>{calendarName}</div>
                <div>{approve}</div>
            </div>
            <div>
                <div>{state}</div>
            </div>
        </div>

    )
}

export default CalendarMagnageFavoriteFollowerHeader;

