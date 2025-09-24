import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../stores/auth/slices/authSlice";

function Perfil() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h1>Perfil do Usuário</h1>
      <p><b>Usuário:</b> {user.username}</p>
      <p><b>Email:</b> {user.email}</p>

      <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        Sair
      </button>
    </div>
  );
}

export default Perfil;
