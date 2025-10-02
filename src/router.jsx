import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Perfil from "./views/Perfil.jsx";
import Login from './views/Login.jsx';
import CrohnCDAIForm from "./views/Cdai.jsx";
import { useSelector } from "react-redux";
import PacientesView from "./views/Patients.jsx";

const PrivateRoute = ({ children }) => {
  const loggedIn = useSelector((s) => s.auth.loggedIn); // 👈 pega do Redux
  return loggedIn ? children : <Navigate to="/" replace />;
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
        <Route
          path="/pacientes"
          element={
            <PrivateRoute>
              <PacientesView />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
