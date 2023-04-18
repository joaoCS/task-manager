import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageTask from "./pages/ManageTask";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ManageTask/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
