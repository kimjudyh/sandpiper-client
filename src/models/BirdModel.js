import axios from 'axios';

const birdEndpoint = 'http://localhost:4000/api/v1/bird';

// make an instance of axios that enables passing of cookies
const cookieAxios = axios.create({
  withCredentials: true
})

export default class BirdModel {
  // index route
  // GET '/birdingSession/:birdingSessionId'
  static all = (birdingSessionId) => {
    const request = cookieAxios.get(`${birdEndpoint}/birdingSession/${birdingSessionId}`)
    return request;
  }
  
  // create new bird
  // POST '/birdingSession/:birdingSessionId
  static create = (birdingSessionId, data) => {
    const request = cookieAxios.post(`${birdEndpoint}/birdingSession/${birdingSessionId}`, data);
    return request;
  }

  // get one bird
  // GET '/:birdingSessionId/bird/:id'
  static getOne = (birdingSessionId, birdId) => {
    const request = cookieAxios.get(`${birdEndpoint}/${birdingSessionId}/bird/${birdId}`);
    return request;
  }

  // update a bird
  // PUT '/:birdingSessionId/bird/:id'
  static update = (birdingSessionId, birdId, data) => {
    const request = cookieAxios.put(`${birdEndpoint}/${birdingSessionId}/bird/${birdId}`, data);
    return request;
  }

  // delete a bird
  // DELETE '/:birdingSessionId/bird/:id'
  static delete = (birdingSessionId, birdId) => {
    const request = cookieAxios.delete(`${birdEndpoint}/${birdingSessionId}/bird/${birdId}`);
    return request;
  }

}