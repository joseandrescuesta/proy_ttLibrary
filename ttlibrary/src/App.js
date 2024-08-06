
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Createbook from "./components/Createbook";
import Main from "./components/Main";
import PagNF from "./components/PagNF";
import Updatebook from "./components/Updatebook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/main' element={<Main />} />
        <Route path='/newbook' element={<Createbook />} />
        <Route path='/updatebook' element={<Updatebook />} />
        <Route path='*' element={<PagNF />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
