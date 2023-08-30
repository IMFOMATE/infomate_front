import { useContext } from 'react';
import CheckBox from '../../common/input/CheckBox';
import styles from './calendarMagnageFavoriteFollowerHeader.module.css'
import { ManageChkList } from '../../../layouts/FavoriteCalendarLayout';
import dayjs from 'dayjs';

export const FAV_CALENDAR_APPROVAL_STATUS = { 
    REJECT: '거절',
    CANCEL: '취소',
    WAIT: '승인대기',
    APPROVAL:  '승인',
}

const CalendarMagnageFavoriteItem = (
    {id, memberName, calendarName, requestDate, createDate, rank, state, favState}
    ) => {
    
    const className  = [styles.fowHdGrid].join(' ');

    const {chk, setChk} = useContext(ManageChkList);

    const checkHandler = (e) => {
        if(isCheckItem(e.target?.id)){
            setChk({
                ...chk, 
                selectList: chk?.selectList.filter(item => 
                    item !== parseInt(e.target.id))
                })
        }else{
            setChk({...chk, selectList: [...chk.selectList, parseInt(e.target.id)]})
        }
    }

    const isCheckItem = (id) => {
        return chk.selectList.includes(parseInt(id))
    }

    return(
        <div className={className} style={{borderBottom:0, padding:'5px 0 5px 0'}} >
            <div>
                <div>
                    <CheckBox 
                        id={id} 
                        isChangeColor={true} 
                        checked={isCheckItem(id)} 
                        onChange={checkHandler} 
                    />
                </div>
                <div>{`${memberName}(${rank})`}</div>
                <div>{calendarName}</div>
                <div>{dayjs(requestDate || createDate).format('YYYY-MM-DD')}</div>
            </div>
            <div>
                <div>{FAV_CALENDAR_APPROVAL_STATUS[state || favState]}</div>
            </div>
        </div>
    )
}

export default CalendarMagnageFavoriteItem;

