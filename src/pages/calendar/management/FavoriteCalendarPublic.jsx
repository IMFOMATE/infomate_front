import { useContext, useEffect, useState } from 'react';
import CalendarMagnageFavoriteItem from '../../../components/calendar/manage/CalendarMagnageFavoriteItem';
import { ManageChkList } from '../../../layouts/FavoriteCalendarLayout';
import { useSearchParams } from 'react-router-dom';
import CalendarMagnageFavoriteFollowerHeader from '../../../components/calendar/manage/CalendarMagnageFavoriteFollowerHeader';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CALENDAR_FIND_ALL_PUBLIC } from '../../../modules/CalendarMoudule';
import { getCalendarPublicListAPI } from '../../../apis/CalendarAPICalls';
import { POST_FAV_CALENDAR_REGIT } from '../../../modules/FavCalendarMoudule';
import { NotResultData } from '../../common/Error';
import { Pagenation } from '../../../components/common/other/Pagenation';
import { LoadingSpiner } from '../../../components/common/other/LoadingSpiner'
import { MEMBER_CODE } from '../../../apis/APIConfig';

const FavoriteCalendarPublic = () => {
    const [search] = useSearchParams();
    
    const [ selectAll, setSelectAll ] = useState(false);
    const {chk, setChk} = useContext(ManageChkList);
    
    
    const publicCalendarList = useSelector(state => state.calendarReducer[GET_CALENDAR_FIND_ALL_PUBLIC]);
    const favCalendarReducer = useSelector(state => state.favCalendarReducer);
    const dispatch = useDispatch();

    useEffect(()=>{
        setChk({...chk, selectList:[]})

        dispatch(getCalendarPublicListAPI({page: {
            number:search.get('page'),
            size:search.get('size'), 
            sortId:search.get('sort'), 
            sortDirection:search.get('direction')}
        }));

        return () => {
            setChk({})
        }
    },[search, favCalendarReducer[POST_FAV_CALENDAR_REGIT]])


    if(!publicCalendarList) return <LoadingSpiner />
    if(publicCalendarList.data.length === 0 || publicCalendarList === null) return <NotResultData />

    const selectItemChange = (e)=> {
        if(e.target.checked){
            setChk({...chk, selectList: [...chk.selectList, ...publicCalendarList.data.map(item=>item.id)]})
        }else{
            setChk({...chk, selectList: []})
        }
        setSelectAll(e.target.checked)
    }

    console.log(publicCalendarList);
    return (
        <>
            
            <CalendarMagnageFavoriteFollowerHeader chk={selectAll} setChk={selectItemChange} />
            <br />
            {
                publicCalendarList.data.map((item)=> <CalendarMagnageFavoriteItem
                                            key={item.id}
                                            id={item.id}
                                            memberName={item.member.memberName}
                                            rank={item?.member.rank.rankName} // 직위 수정 예정
                                            calendarName={item?.name}
                                            requestDate={item?.requestDate}
                                            createDate={item?.createDate}
                                            favState={item?.favoriteCalendar.filter(member => 
                                                member.member.memberCode === MEMBER_CODE
                                            )[0]?.approvalStatus}
                                    />)  
            }
            {
                publicCalendarList.pageInfo &&
                <Pagenation 
                    prev={publicCalendarList.pageInfo.prev}
                    next={publicCalendarList.pageInfo.next}
                    total={publicCalendarList.pageInfo.total} 
                    pageNum={publicCalendarList.pageInfo.cri.pageNum}
                />
            }
        </>
    );
}

export default FavoriteCalendarPublic;
            
            
            