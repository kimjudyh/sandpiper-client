// Communicate with API 
import axios from 'axios';

const authEndpoint = 'http://localhost:4000/api/v1/auth';

export default class UserModel {
  // register user
  // POST '/register'
  static register = (data) => {
    const request = axios.post(`${authEndpoint}/register`, data);
    return request;
  }

  // login user
  // POST '/login'

  // logout user
  // DELETE '/logout'
}