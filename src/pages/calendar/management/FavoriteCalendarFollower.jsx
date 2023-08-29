import { useContext, useEffect, useState } from 'react';
import CalendarMagnageFavoriteItem from '../../../components/calendar/manage/CalendarMagnageFavoriteItem';
import { ManageChkList } from '../../../layouts/FavoriteCalendarLayout';
import { useSearchParams } from 'react-router-dom';
import CalendarMagnageFavoriteFollowerHeader from '../../../components/calendar/manage/CalendarMagnageFavoriteFollowerHeader';
import { useDispatch, useSelector } from 'react-redux';
import { FadeLoader } from 'react-spinners';
import StylesLoading from '../loadingStyle.module.css';
import {  DELETE_FAV_CALENDAR, GET_FAV_CALENDAR_FOLLOWER, PATCH_FAV_CALENDAR_STATE_UPDATE } from '../../../modules/FavCalendarMoudule';
import { getFavCalendarFollwerAPI } from '../../../apis/FavCalendarAPICalls';

const FavoriteCalendarFollower = () => {
    const [search] = useSearchParams();
    
    const [ selectAll, setSelectAll ] = useState(false);
    const {chk, setChk} = useContext(ManageChkList);
    search.get('page')

    
    const calendarFollowerList = useSelector(state => state.favCalendarReducer[GET_FAV_CALENDAR_FOLLOWER]);
    const favCalendarReducer = useSelector(state => state.favCalendarReducer);
    const dispatch = useDispatch();

    useEffect(()=>{
        setChk({...chk, selectList:[]})
        dispatch(getFavCalendarFollwerAPI());
        return () => {
            setChk({})
        }
    },[favCalendarReducer[PATCH_FAV_CALENDAR_STATE_UPDATE], favCalendarReducer[DELETE_FAV_CALENDAR]])


    const selectItemChange = (e)=> {
        if(e.target.checked){
            setChk({...chk, selectList: [...chk.selectList, ...calendarFollowerList.data.map(item=>item.id)]})
        }else{
            setChk({...chk, selectList: []})
        }
        
        setSelectAll(e.target.checked)
    }
    
    return (
        <>
            
            <CalendarMagnageFavoriteFollowerHeader chk={selectAll} setchk={selectItemChange} />
            <br />
            {
                !calendarFollowerList ? 
                <div className={StylesLoading.loading}><FadeLoader color="#9F8AFB" /></div>
                : calendarFollowerList.data.map((item, index)=> <CalendarMagnageFavoriteItem
                                            key={index}
                                            id={item.id}
                                            memberName={item.member.memberName}
                                            // rank={item?.refMember?.refRank?.name} // 직위 수정 예정
                                            calendarName={item?.calendar.name}
                                            requestDate={item?.requestDate}
                                            state={item?.approvalStatus}
                                    />)
                
            }
        </>
    );
}

export default FavoriteCalendarFollower;