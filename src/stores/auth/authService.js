// src/services/authService.js
import api from "../../services/api/index";
import { loginSuccess } from "../../stores/auth/slices/authSlice";
import { store } from "../../stores/auth/index";

const apiService = api.getInstance()

const authService = {
  login: async (username, password) => {
    try {
      const response = await apiService.post("/login", { username, password });

      if (response.data) {
        store.dispatch(loginSuccess(response.data));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erro ao fazer login" };
    }
  },
  
  isAuthUser: () => {
    try {    
      const response = localStorage.getItem('persist:root')
      const obj = JSON.parse(response);
      const { loggedIn } = obj;
      return loggedIn;
    } 
    catch (error) {
      return false;
    }
  }
};

export default authService;
