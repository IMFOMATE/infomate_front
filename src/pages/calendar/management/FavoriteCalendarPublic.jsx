import { useContext, useEffect, useState } from 'react';
import CalendarMagnageFavoriteItem from '../../../components/calendar/manage/CalendarMagnageFavoriteItem';
import { ManageChkList } from '../../../layouts/FavoriteCalendarLayout';
import { useSearchParams } from 'react-router-dom';
import CalendarMagnageFavoriteFollowerHeader from '../../../components/calendar/manage/CalendarMagnageFavoriteFollowerHeader';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CALENDAR_FIND_ALL_PUBLIC } from '../../../modules/CalendarMoudule';
import { getCalendarPublicListAPI } from '../../../apis/CalendarAPICalls';
import { FadeLoader } from 'react-spinners';
import StylesLoading from '../loadingStyle.module.css';
import { POST_FAV_CALENDAR_REGIT } from '../../../modules/FavCalendarMoudule';
import { NotResultData } from '../../common/Error';


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
            sortId:search.get('sortname'), 
            sortDirection:search.get('direction')}
        }));
        
        return () => {
            setChk({})
        }
    },[favCalendarReducer[POST_FAV_CALENDAR_REGIT]])


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
            
            <CalendarMagnageFavoriteFollowerHeader chk={selectAll} setchk={selectItemChange} />
            <br />

            {
                publicCalendarList ? publicCalendarList.data === null ? 
                <NotResultData /> :
                publicCalendarList.data.map((item)=> <CalendarMagnageFavoriteItem
                                            key={item.id}
                                            id={item.id}
                                            memberName={item.member.memberName}
                                            // rank={item?.refMember?.refRank?.name} // 직위 수정 예정
                                            calendarName={item?.name}
                                            requestDate={item?.requestDate}
                                            createDate={item?.createDate}
                                            favState={item?.favoriteCalendar[0]?.approvalStatus}
                                    />)
                : <div className={StylesLoading.loading}> <FadeLoader color="#9F8AFB" /></div>
            }
        </>
    );
}

export default FavoriteCalendarPublic;