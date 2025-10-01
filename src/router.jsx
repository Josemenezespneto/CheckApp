import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Perfil from "./views/Perfil.jsx";
import Login from './views/Login.jsx';
import authService from "./stores/auth/authService.js";
import CrohnCDAIForm from "./views/Cdai.jsx";

const PrivateRoute = ({ children }) => {
  return authService.isAuthUser() ? children : <Navigate to="/" />;
};

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* rota pública */}
        <Route path="/" element={<Login />} />

        {/* rota protegida */}
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
        <Route
          path="/cdai"
          element={
            <PrivateRoute>
              <CrohnCDAIForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
