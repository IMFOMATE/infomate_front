// import './components/common/nav.css';
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
import ScheduleSummaryCreate from './pages/calendar/ScheduleSummaryCreate';
import ScheduleDetailCreate from "./pages/calendar/ScheduleDetailCreate";

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route path="/board" element={<BoardMain/>}></Route>

                  <Route path="calendar">
                    <Route path="test1" element={<ScheduleSummaryCreate/>} />  {/* 제작 테스트 */}
                    <Route path="test2" element={<ScheduleDetailCreate/>} />  {/* 제작 테스트 */}
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
