import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageTasks from "./pages/ManageTasks";
import Navbar from "./components/navbar/Navbar";
import Cadastro from "./pages/Cadastro/Cadastro";
import Login from "./pages/Login/Login";


function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<ManageTasks/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
