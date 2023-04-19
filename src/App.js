import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageTasks from "./pages/ManageTasks";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ManageTasks/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
