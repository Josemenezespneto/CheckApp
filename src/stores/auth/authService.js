// src/services/authService.js
import api from "../../services/api/index";
import { loginSuccess } from "../../stores/auth/slices/authSlice";
import { store } from "../../stores/auth/index";

const apiService = api.getInstance()

const authService = {
  login: async (username, password) => {
    try {
      const { data } = await apiService.post("/login", { username, password });

      if (data) {
        store.dispatch(loginSuccess(data));
      }

      return data;
    } catch (error) {
      throw error ;
    }
  },
  cpflogin: async (cpf) => {
    try {
      const { data } = await apiService.post("/cpf-login", {cpf})
      if (data) {
          store.dispatch(loginSuccess(data));
        }
        return data;
    } 
    catch (error) {
      throw error;
    }
  }
  ,
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
