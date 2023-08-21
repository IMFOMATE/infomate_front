import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./layouts/Layout";
import Board from "./pages/board/Board";
import SecheduleCreate from './pages/calendar/ScheduleCreate';
import BoardMain from "./pages/board/BoardMain";
import './components/common/nav.css';
import './components/common/main.css';
import './components/common/default.css';
import './components/common/component.css';
import ApprovalMain from "./pages/approval/ApprovalMain";
import MyDocList from "./pages/approval/MyDocList";


function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route path="/board" element={<BoardMain/>}></Route>
                  <Route path="calendar">
                      <Route index element={<SecheduleCreate/>}/>
                  </Route>
                  <Route path="approval">
                    <Route index element={<ApprovalMain/>}/>
                    <Route path="mylist" element={<MyDocList/>}/> {/*내 기안 리스트*/}
                    <Route path="reflist"/> {/*참조문서리스트*/}
                    <Route path="temp"/> {/*임시저장문서리스트*/}
                    <Route path="approving"/> {/*결재 대기문서리스트*/}
                    <Route path="approved"/> {/*결재 대기완료 리스트*/}
                  </Route>
              </Route>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
