// Communicate with API 
import axios from 'axios';

const authEndpoint = 'http://localhost:4000/api/v1/auth';
// make an instance of axios that enables passing of cookies
const cookieAxios = axios.create({
  withCredentials: true
});

export default class UserModel {
  // register user
  // POST '/register'
  static register = (data) => {
    const request = axios.post(`${authEndpoint}/register`, data);
    return request;
  }

  // login user
  // POST '/login'
  static login = (data) => {
    const request = cookieAxios.post(`${authEndpoint}/login`, data);
    return request;
  }

  // logout user
  // DELETE '/logout'
  static logout = () => {
    const request = cookieAxios.delete(`${authEndpoint}/logout`)
    return request;
  }
}