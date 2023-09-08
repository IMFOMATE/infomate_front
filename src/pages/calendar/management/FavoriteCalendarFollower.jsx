import { useContext, useEffect, useState } from 'react';
import CalendarMagnageFavoriteItem from '../../../components/calendar/manage/CalendarMagnageFavoriteItem';
import { ManageChkList } from '../../../layouts/FavoriteCalendarLayout';
import { useSearchParams } from 'react-router-dom';
import CalendarMagnageFavoriteFollowerHeader from '../../../components/calendar/manage/CalendarMagnageFavoriteFollowerHeader';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_FAV_CALENDAR, GET_FAV_CALENDAR_FOLLOWER, PATCH_FAV_CALENDAR_STATE_UPDATE } from '../../../modules/FavCalendarMoudule';
import { getFavCalendarFollwerAPI } from '../../../apis/FavCalendarAPICalls';
import { Pagenation } from '../../../components/common/other/Pagenation';
import { LoadingSpiner } from '../../../components/common/other/LoadingSpiner';
import { NotResultData } from '../../common/Error';

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
        dispatch(getFavCalendarFollwerAPI({page: {
            number:search.get('page'),
            size:search.get('size'), 
            sortId:search.get('sort'), 
            sortDirection:search.get('direction')}
        }));
        return () => {
            setChk({})
        }
    },[favCalendarReducer[PATCH_FAV_CALENDAR_STATE_UPDATE], favCalendarReducer[DELETE_FAV_CALENDAR], search])

    if(!calendarFollowerList) return <LoadingSpiner />
    if(calendarFollowerList.data.length === 0 || calendarFollowerList === null) return <NotResultData />

    const selectItemChange = (e)=> {
        if(e.target.checked){
            setChk({...chk, selectList: [...chk.selectList, ...calendarFollowerList.data.map(item=>item.id)]})
        }else{
            setChk({...chk, selectList: []})
        }
        
        setSelectAll(e.target.checked)
    }
    
    console.log(calendarFollowerList);
    return (
        <>
            
            <CalendarMagnageFavoriteFollowerHeader chk={selectAll} setChk={selectItemChange} />
            <br />
            {
                calendarFollowerList.data.map((item)=> <CalendarMagnageFavoriteItem
                                            key={item.id}
                                            id={item.id}
                                            memberName={item.member.memberName}
                                            rank={item.calendar.member.rank.rankName}
                                            calendarName={item?.calendar.name}
                                            requestDate={item?.requestDate}
                                            state={item?.approvalStatus}
                                    />)
            }
            {
                <Pagenation
                    prev={calendarFollowerList.pageInfo.prev}
                    next={calendarFollowerList.pageInfo.next}
                    total={calendarFollowerList.pageInfo.total} 
                    pageNum={calendarFollowerList.pageInfo.cri.pageNum}
                />
            }
        </>
    );
}

export default FavoriteCalendarFollower;