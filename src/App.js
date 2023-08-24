
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./layouts/Layout";
import BoardMain from "./pages/board/BoardMain";
import Mail from "./pages/mail/Mail";
import AddressBook from "./pages/addressBook/AddressBook";
import AddContact from "./pages/addressBook/AddContact";
import MailWrite from "./pages/mail/MailWrite";
import ApprovalMain from "./pages/approval/ApprovalMain";
import MyDocList from "./pages/approval/MyDocList";
import CalendarManegeLayout from "./layouts/CalendarManageLayout";
import MyCalendar from './pages/calendar/management/MyCalendar';
import FavoriteCalendarLayout from "./layouts/FavoriteCalendarLayout";
import FavoriteCalendarFollowing from './pages/calendar/management/FavoriteCalendarFollowing'
import FavoriteCalendarFollower from "./pages/calendar/management/FavoriteCalendarFollower";
import ScheduleDetailCreate from "./pages/calendar/ScheduleDetailCreate";
import ReminderList from './components/calendar/dashboard/ReminderList';
import Calendar from './pages/calendar/Calendar';
import DocumentMain from "./pages/approval/DocumentMain";
import Group from './pages/manage/Group';
import SearchDept from './pages/manage/SearchDept';
import './layouts/Default.css';
import MemberInfo from './pages/manage/MemberInfo';
import ChartModal from './pages/manage/ChartModal';
import UpdateMember from './pages/manage/UpdateMember';


function App() {
  return (


    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>

                <Route path="/board" element={<BoardMain/>}></Route>
                <Route path="approval"/>
            {/* 루트 요청 시 Main으로 이동하도록 설정 */}
            {/* <Route path="/" element={ <Main />}/> */}

            <Route path="/addressBook" element={<AddressBook />} />
            <Route path="/addContact" element={<AddContact />} />
            <Route path="/mailWrite" element={<MailWrite />} />
            <Route path="/mail" element={<Mail />} />

            {/* 인덱스로 설정해두면 위의 설정(루트 요청)과 동일하다. */}
            {/* <Route index element={<Main />} /> */}
          </Route>

          <Route path="/" element={<Layout/>}>
            {/* <Route path="/board" element={<BoardMain />}></Route> */}
            <Route path="approval">
              <Route index element={<ApprovalMain/>}/>
              <Route path="mylist" element={<MyDocList title='기안문서'/>}/> {/*내 기안 리스트*/}
              <Route path="reflist" element={<MyDocList title='참조문서'/>}/> {/*참조문서리스트*/}
              <Route path="temp" element={<MyDocList title='임시저장문서'/>} /> {/*임시저장문서리스트*/}
              <Route path="approving" element={<MyDocList title='결재대기문서'/>}/> {/*결재 대기문서리스트*/}
              <Route path="approved" element={<MyDocList title='결재완료문서'/>}/> {/*결재 완료 리스트*/}
              <Route path="document" element={<DocumentMain/>}/>
            </Route>
            <Route path="calendar">
              <Route index element={<Calendar/>}/>  
              <Route path="reminder" element={<ReminderList />} />  
              <Route path="regist" element={<ScheduleDetailCreate/>} />
                <Route path="management" element={<CalendarManegeLayout/>}>
                <Route index element={<MyCalendar />}/>
                <Route path="myPage" element={<MyCalendar />}/> 
                <Route path="favorite" element={<FavoriteCalendarLayout />}>
                  <Route index element={<FavoriteCalendarFollowing />} />
                  <Route path="following" element={<FavoriteCalendarFollowing />} />
                  <Route path="follower" element={<FavoriteCalendarFollower />} />
                </Route>
              </Route>          
            </Route>
            <Route path='/manage'>
              <Route index element={<Group/>}/>
            </Route>
            <Route path='/searchDept' element={<SearchDept/>}/>
            <Route path='memberInfo' element={<MemberInfo/>}/>
            <Route path='memberupdate' element={<UpdateMember/>}/>

            <Route path='test' element={<ChartModal/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
