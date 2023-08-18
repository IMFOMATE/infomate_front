import {BrowserRouter, Route, Routes} from "react-router-dom";
import SecheduleCreate from './pages/calendar/ScheduleCreate';
import Layout from './layouts/Layout';
import './components/common/nav.css';
import './components/common/main.css';
import './components/common/default.css';
import './components/common/component.css';



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
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
