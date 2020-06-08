import axios from 'axios';

const birdingSessionEndpoint = 'http://localhost:4000/api/v1/birdingSession/';
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

  // get one birding session
  // GET '/:id'
  static getOne = (birdingSessionId) => {
    const request = cookieAxios.get(`${birdingSessionEndpoint}/${birdingSessionId}`);
    return request;
  }

  // update birding session
  // PUT '/:id'

  // delete birding session
  // DELETE '/:id'

  // share birding session
  // PUT '/share/:id'

  // unshare birding session
  // PUT '/unshare/:id'
}
