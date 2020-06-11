import React, { useState, useEffect } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';
import PhotoModel, { openUploadWidget } from '../models/PhotoModel';
import BirdModel from '../models/BirdModel';
import Photo from '../components/Photo';

const PhotoList = (props) => {
  const [images, setImages] = useState([]);
  const [didDataChange, setDidDataChange] = useState(false);
  // const [birdData, setBirdData] = useState({
  //   name: '',
  //   birdingSession: '',
  // });

  // API call to get all photos
  const getAllPhotos = () => {
    PhotoModel.all()
      .then(res => {
        console.log('got all photos', res.data);
        // set state
        setImages(res.data.foundPhotos);
        // also has foundBirdingSessions
      })
      .catch((err) => {
        console.log('axios error')
        if (err.response) {
          console.log(err.response.data);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log(err.message);
        }
      })
  }

  // API call to delete photo
  const deletePhoto = (birdingSessionId, imageId) => {
    PhotoModel.delete(birdingSessionId, imageId)
      .then(res => {
        console.log('deleted photo', res.data);
        setDidDataChange(!didDataChange);
      })
      .catch((err) => {
        console.log('axios error')
        if (err.response) {
          console.log(err.response.data);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log(err.message);
        }
      })
  }

  // // API call to get one bird
  // const getOne = (birdingSessionId, birdId) => {
  //   BirdModel.getOne(birdingSessionId, birdId)
  //     .then(res => {
  //       console.log('getting bird', birdId);
  //       console.log('bird data', res.data);
  //       setBirdData(res.data.foundBird);
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
  // }

  const mappedImages = images.map((image, index) => {
    return (
      <>
      <Image
        data-toggle="modal" data-focus="true" data-target={`#bird${image._id}`}
        className="thumbnail"
        src={image.url} alt="bird image" 
        key={image._id}
        publicId={image.cloudinaryPublicId}
      />
      <Photo 
        key={index}
        birdData={{
          name: '',
          birdingSession: image.birdingSession,
        }}
        deletePhoto={deletePhoto}
        imageId={image._id}
        birdId={image.bird}
        image={
          <Image 
            className="img-fluid"
            src={image.url} alt="bird image"
            key={image._id}
            publicId={image.cloudinaryPublicId}
          />}
      />
      </>
    )
  })

  useEffect(() => {
    getAllPhotos();
  }, [didDataChange])

  return (
    <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}>
      <div>
        {mappedImages}
      </div>
    </CloudinaryContext>
  )
}

export default PhotoList;