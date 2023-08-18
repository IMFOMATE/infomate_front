import {BrowserRouter, Route, Routes} from "react-router-dom";
import ScheduleSummaryCreate from './pages/calendar/ScheduleSummaryCreate';
import ScheduleDetailCreate from "./pages/calendar/ScheduleDetailCreate";

import Layout from './layouts/Layout';
import './components/common/nav.css';
import './components/common/main.css';
import './components/common/default.css';
import './components/common/component.css';
import CalendarManegeLayout from "./layouts/CalendarManageLayout";
import MyCalendar from './pages/calendar/management/MyCalendar';
import FavoriteCalendarLayout from "./layouts/FavoriteCalendarLayout";
import FavoriteCalendarFollowing from './pages/calendar/management/FavoriteCalendarFollowing'
import FavoriteCalendarFollower from "./pages/calendar/management/FavoriteCalendarFollower";


function Main() {
    return null;
}

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              {/* 루트 요청 시 Main으로 이동하도록 설정 */}
              {/* <Route path="/" element={ <Main />}/> */}

              {/* 인덱스로 설정해두면 위의 설정(루트 요청)과 동일하다. */}
              <Route index element={ <Main />} />
              <Route path="calendar">          
                {/* <Route index /> */}
                <Route path="management" element={<CalendarManegeLayout/>}>
                  <Route index element={<MyCalendar />}/> 
                  <Route path="myPage" element={<MyCalendar />}/> 
                  <Route path="favorite" element={<FavoriteCalendarLayout />}>
                    <Route index element={<FavoriteCalendarFollowing />} />
                    <Route path="following" element={<FavoriteCalendarFollowing />} />
                    <Route path="follower" element={<FavoriteCalendarFollower />} />
                  </Route>
                </Route>
                <Route path="test1" element={<ScheduleSummaryCreate/>} />  {/* 제작 테스트 */}
                <Route path="test2" element={<ScheduleDetailCreate/>} />  {/* 제작 테스트 */}
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
