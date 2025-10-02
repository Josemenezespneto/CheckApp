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

    this.axiosInstance.interceptors.request.use(config => {
      const auth = localStorage.getItem('persist:root')
      let authObj 
      if (auth) authObj = JSON.parse(auth)

      config.headers.Authorization = `Bearer ${authObj.token.replace(/"/g, '')}`
      config.headers['clinic_id'] = 1

      return config
    }, error => {
      return error
    })

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          window.alert("Sessão expirada. Redirecionando para login...");
          // window.location.href = "/"; 
          //localStorage.removeItem('persist:root')
        }

        return Promise.reject(error);
      }
    );
  }

  getInstance() {
    return this.axiosInstance;
  }
}

const api = new ApiService("http://localhost:3000");
export default api;
