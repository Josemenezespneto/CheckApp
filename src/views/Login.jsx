// src/views/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../stores/auth/authService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const ok = await authService.login(username, password);

      if (ok) navigate("/perfil");

    } catch (err) {
      console.error("Erro no login:", err);
      alert("Usuário ou senha inválidos");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Entrar</button>
    </form>
  );
}

export default Login;
