import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./layouts/Layout";
import Board from "./pages/board/Board";
import SecheduleCreate from './pages/calendar/ScheduleCreate';
import BoardMain from "./pages/board/BoardMain";
import './components/common/nav.css';
import './components/common/main.css';
import './components/common/default.css';
import './components/common/component.css';


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
              </Route>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
