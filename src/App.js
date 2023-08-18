import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./layouts/Layout";
import Board from "./pages/board/Board";
import BoardMain from "./pages/board/BoardMain";



function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route path="/board" element={<BoardMain/>}></Route>
              </Route>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
