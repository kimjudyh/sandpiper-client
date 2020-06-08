import axios from 'axios';

const birdEndpoint = 'http://localhost:4000/api/v1/bird/';

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

  // update a bird
  // PUT '/:birdingSessionId/bird/:id'

  // delete a bird
  // DELETE '/:birdingSessionId/bird/:id'

}