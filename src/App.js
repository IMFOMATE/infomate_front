import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./layouts/Layout";
import Mail from "./pages/mail/Mail";
import AddressBook from "./pages/addressBook/AddressBook";
import AddContact from "./pages/addressBook/AddContact";
import MailWrite from "./pages/mail/MailWrite";
import ApprovalMain from "./pages/approval/ApprovalMain";
import MyDocList from "./pages/approval/MyDocList";
import CalendarManegeLayout from "./layouts/CalendarManageLayout";
import MyCalendar from './pages/calendar/management/MyCalendar';
import FavoriteCalendarLayout from "./layouts/FavoriteCalendarLayout";
import ScheduleDetailCreate from "./pages/calendar/ScheduleDetailCreate";
import ReminderList from './components/calendar/dashboard/ReminderList';
import DocumentMain from "./pages/approval/DocumentMain";
import Group from './pages/manage/Group';
import SearchDept from './pages/manage/SearchDept';
import './layouts/Default.css';
import CalendarLayout from './layouts/CalendarLayout';
import Calendar from './pages/calendar/Calendar';
import FavoriteCalendarFollowing from './pages/calendar/management/FavoriteCalendarFollowing';
import FavoriteCalendarPublic from './pages/calendar/management/FavoriteCalendarPublic';
import FavoriteCalendarFollower from './pages/calendar/management/FavoriteCalendarFollower';
import MemberInfo from './pages/manage/MemberInfo';
import Work from "./pages/work/Work";
import WkAdmin from "./pages/work/WkAdmin";
import MyWork from "./pages/work/MyWork";
import MyDept from "./pages/work/MyDept";
import Dept from "./pages/work/Dept";
import Notice from "./pages/board/Notice";
import Menu from "./pages/board/Menu";
import Common from "./pages/board/Common";
import BrdDept from "./pages/board/BrdDept";
import BrdAdmin from "./pages/board/BrdAdmin";
import Anony from "./pages/board/Anony";
import NewPost from "./pages/board/NewPost";
import MailContactModal from './components/approval/ele-component/contact/MailContactModal';
import AddressBookLike from './pages/addressBook/AddressBookLike';
import ViewMail from './pages/mail/ViewMail';
import Posting from './pages/board/Posting';
import UpdateMember from './pages/manage/UpdateMember';
import DocumentDetail from "./components/approval/ele-component/document/detail/DocumentDetail";
import PostView from './pages/board/PostView';
import UpdateDept from './pages/manage/admin/UpdateDept';
import Department from './pages/manage/Department';
import UpdateList from './pages/manage/admin/UpdateList';
import DeptItems from './pages/manage/admin/DeptItems';
import PostUpdate from './pages/board/PostUpdate';
import LoginForm from "./pages/member/login/LoginForm";
import Main from './pages/home/Main';
import Register from './pages/member/login/Register';
import SearchList from './pages/manage/SearchList';
import MailTrash from './pages/mail/MailTrash';
import Items from './pages/manage/admin/Items';
import MyInfo from './pages/member/MyInfo';
import DeptTreeView from './pages/manage/DeptTreeView';
import SimpleInfo from './pages/manage/SimpleInfo';



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route index element={<LoginForm />} />

          <Route path="/" element={<Layout/>}>
  
          
            <Route path="main">
              <Route index element={<Main/>}/>
              <Route path="regist-member" element={<Register/>}/>
            </Route>
            <Route path="myInfo" element={<MyInfo/>}/>


            <Route path="/addressBook" element={<AddressBook />} />
            <Route path="/addContact" element={<AddContact />} />
            {/* <Route path="/mailWrite" element={<MailWrite />} /> */}
            <Route path="/mail" element={<Mail />} />
            {/* <Route path="/board" element={<BoardMain />}></Route> */}
            
            <Route path="approval">
              <Route index element={<ApprovalMain/>}/>
              <Route path="approval" element={<MyDocList />}/> {/*내 기안 리스트*/}
              <Route path="ref" element={<MyDocList />}/> {/*참조문서리스트*/}
              <Route path="temporary" element={<MyDocList />} /> {/*임시저장문서리스트*/}
              <Route path="credit" element={<MyDocList/>}/> {/*결재 대기문서리스트*/}
              <Route path="dept" element={<MyDocList/>}/>
              <Route path="document">
                <Route path="new" element={<DocumentMain/>}/>
                <Route path=":documentId" element={<DocumentDetail/>}/> {/* 문서 조회 */}
                <Route path=":documentId/reapply" element={<DocumentMain/>}/>
              </Route>
            </Route>


              <Route path='mail'>
                <Route path='' element={<Mail title={"전체메일함"} />}/>
                <Route path='allMail' element={<Mail title={"전체메일함"} />}/>
                <Route path='unreadMail' element={<Mail title={"안읽은 메일함"} />}/>
                <Route path='readMail' element={<Mail title={"읽은 메일함"} />}/>
                <Route path='reference' element={<Mail title={"참조 메일함"} />}/>
                <Route path='mailWrite' element={<MailWrite />}/>
                <Route path='mailTrash' element={<MailTrash title={"휴지통"} />}/>
                <Route path='viewMail' element={<ViewMail />} />
              </Route>


              <Route path="addressBook">

                    {/* <Route index element={<AddressBook title={"전체연락처"}/>}/> */}
                    <Route path="" element={<AddressBook title={"전체연락처"}/>}/>
                    <Route path="allAddressBook" element={<AddressBook title={"전체연락처"}/>}/>
                    <Route path="like" element={<AddressBookLike title={"즐겨찾기"}/>}/>
                    <Route path="client" element={<AddressBook title={"거래처 연락처"}/>}/>
                    <Route path="addContact" element={<AddContact title={"연락처 추가"} />}/>
                
              </Route>




            <Route path="calendar" element={<CalendarLayout />}>
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
                  <Route path="public" element={<FavoriteCalendarPublic />} />
                </Route>
              </Route>          
            </Route>


            <Route path='group'>
              <Route index element={<Group/>}/>
              <Route path='searchDept'>
                <Route index element={<SearchDept/>}/>
                <Route path='memberInfo/:memberCode' element={<MemberInfo />}/>
              </Route>
              <Route path='updateDept' element={<UpdateDept/>}/>
              <Route path='simpleInfo/:memberCode'element={<SimpleInfo/>}/>
            </Route>
            <Route path='treeDept' element={<DeptTreeView/>}/>
            <Route path='searchDept' element={<SearchDept/>}/>
            <Route path='updateDept' element={<UpdateDept/>}/>
            <Route path='department' element={<Department/>}/>
            <Route path='deptItems' element={<DeptItems/>}/>
            <Route path='search' element={<SearchList/>}/>
            <Route path='items' element={<Items/>}/>




            
            <Route path="/work" element={ <Work />}/>
            <Route path="/work/admin" element={ <WkAdmin /> }/>
            <Route path="/work/mywork" element={ <MyWork /> }/>
            <Route path="/work/mydept" element={ <MyDept />}/>
            <Route path="/work/dept" element={ <Dept />}/>

            

            
            <Route path="/board/newpost" element={<NewPost/>}/>
            <Route path="/board/notice" element={ <Notice />}/>
            <Route path="/board/menu" element={ <Menu />}/>
            <Route path="/board/common" element={ <Common />}/>
            <Route path="/board/brddept" element={ <BrdDept />}/>
            <Route path="/board/brdadmin" element={ <BrdAdmin />}/>
            <Route path="/board/anony" element={ <Anony />}/>
            <Route path="/board/posting" element={ <Posting />}/>
            <Route path="/board/post/:postCode" element={ <PostView />}/>

            {/* <Route path="/board" element={<BoardMain/>}></Route> */}
          
          </Route>  
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;