import { useContext, useEffect, useState } from 'react';
import CalendarMagnageFavoriteItem from '../../../components/calendar/manage/CalendarMagnageFavoriteItem';
import { ManageChkList } from '../../../layouts/FavoriteCalendarLayout';
import { useLocation, useSearchParams } from 'react-router-dom';
import CalendarMagnageFavoriteFollowerHeader from '../../../components/calendar/manage/CalendarMagnageFavoriteFollowerHeader';


const FavoriteCalendarFollowing = () => {


    const [search] = useSearchParams();

    const location = useLocation();
    const pathnameList = location.pathname.split('/')
    const favorite = pathnameList[pathnameList.length - 1];
    const [ selectAll, setSelectAll ] = useState(false);
    const {chk, setChk} = useContext(ManageChkList);
    const [data, setData] = useState([{}]);
    search.get('page')
    
    useEffect(()=>{
        setChk({...chk, selectList:[]})
        setSelectAll(false)
        if (favorite === 'follwing') {
            
        }else if(favorite === 'follower'){

        }else{

        }
        setData([
            {id:1, calendar:{name:'캘린더1'},requestDate:'2023-01-01', approvalStatus:'WAIT', refMember:{memberName:'홍길동'}},
            {id:2, calendar:{name:'캘린더2'},requestDate:'2023-02-01', approvalStatus:'REJECT', refMember:{memberName:'심사임당'}},
            {id:3, calendar:{name:'캘린더3'},requestDate:'2023-03-01', approvalStatus:'APPROVAL', refMember:{memberName:'길순이'}},
            {id:4, calendar:{name:'캘린더4'},requestDate:'2023-04-01', approvalStatus:'CANCEL', refMember:{memberName:'연산군'}},
        ]) // 테스트
    
    },[favorite])


    const selectItemChange = (e)=> {
        if(e.target.checked){
            setChk({...chk, selectList: [...chk.selectList, ...data.map(item=>item.id)]})
        }else{
            setChk({...chk, selectList: []})
        }
        
        setSelectAll(e.target.checked)
    }
    
    return (
        <>
            <CalendarMagnageFavoriteFollowerHeader chk={selectAll} setchk={selectItemChange} />
            <br />
            {data.map((item, index)=> <CalendarMagnageFavoriteItem
                                            key={index}
                                            id={item?.id}
                                            memberName={item?.refMember?.memberName}
                                            rank={item?.refMember?.refRank?.name} // 직위 수정 예정
                                            calendarName={item?.calendar?.name}
                                            requestDate={item?.requestDate}
                                            state={item?.approvalStatus}
                                    />
            )}
        </>
    );
}

export default FavoriteCalendarFollowing;