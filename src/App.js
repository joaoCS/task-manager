import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageTasks from "./pages/ManageTasks/ManageTasks";
import Navbar from "./components/navbar/Navbar";
import Cadastro from "./pages/Cadastro/Cadastro";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";


function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<ManageTasks/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
