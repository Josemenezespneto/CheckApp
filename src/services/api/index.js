// src/services/api.js
import axios from "axios";

class ApiService {
  constructor(baseURL) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          window.alert("Sessão expirada. Redirecionando para login...");
          window.location.href = "/"; // não faz logout direto aqui
          localStorage.removeItem('persist:root')
        }

        return Promise.reject(error);
      }
    );
  }

  setAuthToken(token) {
    if (token) {
      this.axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    } else {
      delete this.axiosInstance.defaults.headers.common["Authorization"];
    }
  }

  getInstance() {
    return this.axiosInstance;
  }
}

const api = new ApiService("http://localhost:3000");
export default api;
