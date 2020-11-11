import axios from "axios";
import { API_URL } from "../components/constant/Constants"

class AuthService {
  
  login(userInfo) {
    return axios.post(API_URL + "logIn",userInfo)
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        console.log(response.data);
        return response.data;
      });
  }

  logout() {
   const logout = localStorage.removeItem("user");
   return logout;
  }

 /*  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  } */

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  isLogin = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return true;
    }
    return false;
  }
}

export default new AuthService();
