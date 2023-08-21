import {BrowserRouter, Route, Routes} from "react-router-dom";
import SecheduleCreate from './pages/calendar/ScheduleCreate';
import Layout from './layouts/Layout';
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
                <Route index element={<SecheduleCreate/>}/>
              </Route>
            </Route>
            <Route path="/work" element={ <Work /> }/>
            <Route path="/work/admin" element={ <WkAdmin /> }/>
            <Route path="/work/workside" element={ <WorkSide /> }/>
            <Route path="/work/mywork" element={ <MyWork /> }/>
            <Route path="/work/mydept" element={ <MyDept />}/>
            <Route path="/work/dept" element={ <Dept />}/>
            <Route path="/board/notice" element={ <Notice />}/>
            <Route path="/board/report" element={ <Report />}/>
            <Route path="/board/menu" element={ <Menu />}/>
            <Route path="/board/common" element={ <Common />}/>
            <Route path="/board/brddept" element={ <BrdDept />}/>
            <Route path="/board/brdadmin" element={ <BrdAdmin />}/>
            <Route path="/board/anony" element={ <Anony />}/>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
