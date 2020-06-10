import React, { useState, useEffect } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';
import PhotoModel, { openUploadWidget } from '../models/PhotoModel';

const PhotoContainer = (props) => {
  const [images, setImages] = useState([]);
  const [didDataChange, setDidDataChange] = useState(false);

  // API call to save photo to backend
  const savePhotoToBackend = (birdingSessionId, birdId, data) => {
    PhotoModel.create(birdingSessionId, birdId, data)
      .then(res => {
        console.log('saved', res);
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

  // API call to get photos of bird from birding session
  const getBirdPhotos = (birdingSessionId, birdId) => {
    PhotoModel.getBirdPhotos(birdingSessionId, birdId)
      .then(res => {
        console.log('got from db', res.data);
        // set state
        setImages(res.data.foundPhotos);
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

  // use Cloudinary upload widget
  const beginUpload = () => {
    const uploadOptions = {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      uploadPreset: "final-project"
    };

    openUploadWidget(uploadOptions, (err, photos) => {
      if (!err) {
        console.log('photos', photos.info);
        if (photos.event === 'success') {
          savePhotoToBackend(props.birdingSessionId, props.birdId, 
            {
              url: photos.info.secure_url,
              cloudinaryPublicId: photos.info.public_id
            })
          // setImages([...images, photos.info.public_id])
          // info.public_id
          // info.secure_url
        }
      } else {
        if (err.response) {
          console.log(err.response.data);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log(err.message);
        }
      }
    })
  }

  useEffect(() => {
    getBirdPhotos(props.birdingSessionId, props.birdId);
  }, [didDataChange])

  const mappedImages = images.map((image, index) => (
    <Image
      className="thumbnail"
      src={image.url} alt="bird image" 
      key={image._id}
      publicId={image.cloudinaryPublicId}
    />
  ))

  return (
    <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}>
      <div>
        {mappedImages}
        <div className="clickable-icon">
          <i className="fa fa-camera fa-2x" aria-hidden="true" onClick={beginUpload}></i> New 
        </div>
      </div>
    </CloudinaryContext>
  )
}

export default PhotoContainer;