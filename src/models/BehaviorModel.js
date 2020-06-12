import axios from 'axios';

const endPoint = `${process.env.REACT_APP_API_URL}/api/v1/behavior/` || 'http://localhost:4000/api/v1/behavior/';

export default class BehaviorModel {
  static all = () => {
    const request = axios.get(endPoint);
    return request;
  }
}