import { BrowserRouter, Route, Routes } from "react-router-dom";
import SecheduleCreate from './pages/calendar/ScheduleCreate';
import Layout from './layouts/Layout';
import './components/common/nav.css';
import './components/common/main.css';
import './components/common/default.css';
import './components/common/component.css';

import Mail from "./pages/mail/Mail";
import AddressBook from "./pages/addressBook/AddressBook";
import AddContact from "./pages/addressBook/AddContact";
import MailWrite from "./pages/addressBook/MailWrite";

import ApprovalMain from "./pages/approval/ApprovalMain";
import MyDocList from "./pages/approval/MyDocList";




function App() {
  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            {/* 루트 요청 시 Main으로 이동하도록 설정 */}
            {/* <Route path="/" element={ <Main />}/> */}

            <Route path="/addressBook" element={<AddressBook />} />
            <Route path="/addContact" element={<AddContact />} />
            <Route path="/mailWrite" element={<MailWrite />} />
            <Route path="/mail" element={<Mail />} />

            {/* 인덱스로 설정해두면 위의 설정(루트 요청)과 동일하다. */}
            {/* <Route index element={<Main />} /> */}
            <Route path="calendar">
              <Route index element={<SecheduleCreate />} />
            </Route>
          </Route>

          <Route path="/" element={<Layout/>}>
                  {/* <Route path="/board" element={<BoardMain />}></Route> */}
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
