import {BrowserRouter, Route, Routes} from "react-router-dom";

function Main() {
    return null;
}

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            {/* 루트 요청 시 Main으로 이동하도록 설정 */}
            {/* <Route path="/" element={ <Main />}/> */}

            {/* 인덱스로 설정해두면 위의 설정(루트 요청)과 동일하다. */}
            <Route index element={ <Main />}/>

          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
