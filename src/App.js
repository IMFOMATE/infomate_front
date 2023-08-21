import './components/common/nav.css';
// import './components/common/main.css';
import './components/common/default.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./layouts/Layout";
import Board from "./pages/board/Board";
import BoardMain from "./pages/board/BoardMain";
import CalendarManegeLayout from "./layouts/CalendarManageLayout";
import MyCalendar from './pages/calendar/management/MyCalendar';
import FavoriteCalendarLayout from "./layouts/FavoriteCalendarLayout";
import FavoriteCalendarFollowing from './pages/calendar/management/FavoriteCalendarFollowing'
import FavoriteCalendarFollower from "./pages/calendar/management/FavoriteCalendarFollower";

import ScheduleDetailCreate from "./pages/calendar/ScheduleDetailCreate";
import ReminderList from './components/calendar/dashboard/ReminderList';
import Calendar from './pages/calendar/Calendar';


function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route path="/board" element={<BoardMain/>}></Route>
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

              </Route>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
