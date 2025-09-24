// src/services/authService.js
import api from "../../services/api/index";
import { loginSuccess } from "../../stores/auth/slices/authSlice";
import { store } from "../../stores/auth/index";

const authService = {
  login: async (username, password) => {
    try {
      const response = await api.getInstance().post("/login", { username, password });

      if (response.data) {
        store.dispatch(loginSuccess(response.data));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erro ao fazer login" };
    }
  },
};

export default authService;
