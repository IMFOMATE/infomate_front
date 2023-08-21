import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./layouts/Layout";
import Board from "./pages/board/Board";
import SecheduleCreate from './pages/calendar/ScheduleCreate';
import BoardMain from "./pages/board/BoardMain";
import './components/common/nav.css';
import './components/common/main.css';
import './components/common/default.css';
import './components/common/component.css';
import Work from "./pages/work/Work";
import WkAdmin from "./pages/work/WkAdmin";
import WorkSide from "./pages/work/WorkSide";
import MyWork from "./pages/work/MyWork";
import MyDept from "./pages/work/MyDept";
import Dept from "./pages/work/Dept";
import Notice from "./pages/board/Notice";
import Report from "./pages/board/Report";
import Menu from "./pages/board/Menu";
import Common from "./pages/board/Common";
import BrdDept from "./pages/board/BrdDept";
import BrdAdmin from "./pages/board/BrdAdmin";
import Anony from "./pages/board/Anony";
import ApprovalMain from "./pages/approval/ApprovalMain";
import MyDocList from "./pages/approval/MyDocList";
function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route path="calendar">
                      <Route index element={<SecheduleCreate/>}/>
                  </Route>
                  <Route path="/work" element={ <Work /> }/>
                  <Route path="/work/admin" element={ <WkAdmin /> }/>
                  <Route path="/work/workside" element={ <WorkSide /> }/>
                  <Route path="/work/mywork" element={ <MyWork /> }/>
                  <Route path="/work/mydept" element={ <MyDept />}/>
                  <Route path="/work/dept" element={ <Dept />}/>
                  <Route path="/board" element={<BoardMain/>}/>
                  <Route path="/board/notice" element={ <Notice />}/>
                  <Route path="/board/report" element={ <Report />}/>
                  <Route path="/board/menu" element={ <Menu />}/>
                  <Route path="/board/common" element={ <Common />}/>
                  <Route path="/board/brddept" element={ <BrdDept />}/>
                  <Route path="/board/brdadmin" element={ <BrdAdmin />}/>
                  <Route path="/board/anony" element={ <Anony />}/>
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
