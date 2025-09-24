import { BrowserRouter, Routes, Route } from "react-router-dom";
import Perfil from "./views/Perfil.jsx";
import './App.css'
import Login from './views/Login'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
