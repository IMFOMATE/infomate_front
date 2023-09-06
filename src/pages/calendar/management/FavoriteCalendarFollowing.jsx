import { useContext, useEffect, useState } from 'react';
import CalendarMagnageFavoriteItem from '../../../components/calendar/manage/CalendarMagnageFavoriteItem';
import { ManageChkList } from '../../../layouts/FavoriteCalendarLayout';
import { useSearchParams } from 'react-router-dom';
import CalendarMagnageFavoriteFollowerHeader from '../../../components/calendar/manage/CalendarMagnageFavoriteFollowerHeader';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_FAV_CALENDAR, GET_FAV_CALENDAR_FINDALL } from '../../../modules/FavCalendarMoudule';
import { getFavCalendarfollowAllAPI } from '../../../apis/FavCalendarAPICalls';
import { Pagenation } from '../../../components/common/other/Pagenation';
import { LoadingSpiner } from '../../../components/common/other/LoadingSpiner';
import { NotResultData } from '../../common/Error';

const FavoriteCalendarFollowing = () => {
    const [search] = useSearchParams();

    const [ selectAll, setSelectAll ] = useState(false);
    const {chk, setChk} = useContext(ManageChkList);
    search.get('page')

    const favCalendarFollowList = useSelector(state => state.favCalendarReducer[GET_FAV_CALENDAR_FINDALL]);
    const favCalendarReducer = useSelector(state => state.favCalendarReducer);
    const dispatch = useDispatch();

    useEffect(()=>{
        setChk({...chk, selectList: []})
        
        dispatch(getFavCalendarfollowAllAPI({page: {
            number:search.get('page'),
            size:search.get('size'), 
            sortId:search.get('sort'), 
            sortDirection:search.get('direction')}
        }));

        return () => {
            setChk({});
        }   
    },[search, favCalendarReducer[DELETE_FAV_CALENDAR]])

    if(!favCalendarFollowList) return <LoadingSpiner />
    if(favCalendarFollowList.data.length === 0) <NotResultData />

    const selectItemChange = (e)=> {
        if(e.target.checked){
            setChk({...chk, selectList: [
                ...chk.selectList,
                ...favCalendarFollowList.data.map(item=>item.id)
            ]
        })
        }else{
            setChk({...chk, selectList: []})
        }
        
        setSelectAll(e.target.checked)
    }
    console.log(favCalendarFollowList);
    
    return (
        <>
            <CalendarMagnageFavoriteFollowerHeader
                chk={selectAll}
                setChk={selectItemChange}
            />
            <br />

            {
                favCalendarFollowList.data.map((item, index) => 
                                    <CalendarMagnageFavoriteItem
                                            key={item.id}
                                            id={item.id}
                                            memberName={item.calendar.member.memberName}
                                            rank={item.calendar.member.rank.rankName} // 직위 수정 예정
                                            calendarName={item.calendar.name}
                                            requestDate={item?.requestDate}
                                            state={item?.approvalStatus}
                                            isLabelColor={item?.labelColor}
                                    />)
                
            }
            {
                <Pagenation
                    prev={favCalendarFollowList.pageInfo.prev}
                    next={favCalendarFollowList.pageInfo.next}
                    total={favCalendarFollowList.pageInfo.total} 
                    pageNum={favCalendarFollowList.pageInfo.cri.pageNum}
                />
            }
        </>
    );
}

export default FavoriteCalendarFollowing;