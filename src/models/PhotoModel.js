import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core';
import axios from 'axios';

const photoEndpoint = 'http://localhost:4000/api/v1/photo';
// make an instance of axios that enables passing of cookies
const cookieAxios = axios.create({
  withCredentials: true
})

export default class PhotoModel {
  // index route
  // GET '/'
  static all = () => {
    const request = cookieAxios.get(photoEndpoint);
    return request;
  }

  // get photos from a birding session
  // GET '/:birdingSessionId'
  static getBirdingSessionPhotos = (birdingSessionId) => {
    const request = cookieAxios.get(`${photoEndpoint}/${birdingSessionId}`);
    return request;
  }

  // get photos of one bird from birding session
  // GET '/:birdingSessionId/bird/:birdId
  static getBirdPhotos = (birdingSessionId, birdId) => {
    const request = cookieAxios.get(`${photoEndpoint}/${birdingSessionId}/bird/${birdId}`);
    return request;
  }

  // create new photo
  // POST '/:birdingSessionId/bird/:birdId'
  static create = (birdingSessionId, birdId, data) => {
    const request = cookieAxios.post(`${photoEndpoint}/${birdingSessionId}/bird/${birdId}`, data);
    return request;
  }

  // get one photo
  // update photo
  // delete photo
  // DELETE '/:birdingSessionId/:id'
  static delete = (birdingSessionId, id) => {
    const request = cookieAxios.delete(`${photoEndpoint}/${birdingSessionId}/${id}`);
    return request;
  }

}


// ==== CLOUDINARY

// export const url = (publicId, options) => {
//   const scOptions = Util.withSnakeCaseKeys(options);
//   const cl = CoreCloudinary.new();
//   return cl.url(publicId, scOptions);
// };

export const openUploadWidget = (options, callback) => {
  const scOptions = Util.withSnakeCaseKeys(options);
  window.cloudinary.openUploadWidget(scOptions, callback);
};

// export async function  fetchPhotos  (imageTag, setter)  {
//   const options = {
//   cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
//   folder: 'final-project',
//   format: 'json',
//   type: 'list',
//   version: Math.ceil(new Date().getTime() / 1000),
// };

//   const urlPath = url(imageTag.toString(), options);
//   console.log('image tag', imageTag.toString())
//   console.log(urlPath);

//   axios.get(urlPath)
//     .then(res => {
//       console.log('axios fetch', res)
//     })
//     .catch((err) => {
//       console.log('axios error')
//       if (err.response) {
//         console.log(err.response.data);
//       } else if (err.request) {
//         console.log(err.request);
//       } else {
//         console.log(err.message);
//       }
//     })


  // fetch(urlPath)
  // .then(res => res.text())
  // .then(text => (text ? setter(JSON.parse(text).resources.map(image => image.public_id)) : []))
  // .catch((err) => {
  //   if (err.response) {
  //     console.log(err.response.data);
  //   } else if (err.request) {
  //     console.log(err.request);
  //   } else {
  //     console.log(err.message);
  //   }
  // })
// };