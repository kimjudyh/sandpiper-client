import axios from 'axios';

const endPoint = 'http://localhost:4000/api/v1/behavior/';

export default class BehaviorModel {
  static all = () => {
    const request = axios.get(endPoint);
    return request;
  }
}