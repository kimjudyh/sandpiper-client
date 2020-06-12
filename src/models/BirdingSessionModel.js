import axios from 'axios';

const birdingSessionEndpoint = `${process.env.REACT_APP_API_URL}/api/v1/birdingSession` ||'http://localhost:4000/api/v1/birdingSession';
// make an instance of axios that enables passing of cookies
const cookieAxios = axios.create({
  withCredentials: true
})

export default class BirdingSessionModel {
  // index route
  // GET '/'
  static all = () => {
    const request = cookieAxios.get(birdingSessionEndpoint);
    return request;
  }

  // create new birding session
  // POST '/'
  static create = (data) => {
    const request = cookieAxios.post(`${birdingSessionEndpoint}`, data);
    return request;
  }

  // get one birding session
  // GET '/:id'
  static getOne = (birdingSessionId) => {
    const request = cookieAxios.get(`${birdingSessionEndpoint}/${birdingSessionId}`);
    return request;
  }

  // update birding session
  // PUT '/:id'
  static update = (birdingSessionId, data) => {
    const request = cookieAxios.put(`${birdingSessionEndpoint}/${birdingSessionId}`, data);
    return request;
  }

  // delete birding session
  // DELETE '/:id'
  static delete = (birdingSessionId) => {
    const request = cookieAxios.delete(`${birdingSessionEndpoint}/${birdingSessionId}`);
    return request;
  }

  // share birding session
  // PUT '/share/:id'
  static share = (birdingSessionId, data) => {
    const request = cookieAxios.put(`${birdingSessionEndpoint}/share/${birdingSessionId}`, data);
    return request;
  }

  // unshare birding session
  // PUT '/unshare/:id'
  static unshare = (birdingSessionId, data) => {
    const request = cookieAxios.put(`${birdingSessionEndpoint}/unshare/${birdingSessionId}`, data);
    return request;
  }
}
