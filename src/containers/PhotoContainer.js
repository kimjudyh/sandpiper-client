import React, { useState, useEffect } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';
import PhotoModel, { openUploadWidget } from '../models/PhotoModel';
import Photo from '../components/Photo';
import Confirmation from '../components/Confirmation';

const PhotoContainer = (props) => {
  /** Direct child of Bird
   *  Parent of Photo, Confirmation
   */

  const [images, setImages] = useState([]);
  const [mappedImages, setMappedImages] = useState([]);
  const [didDataChange, setDidDataChange] = useState(false);

  // API call to save photo to backend
  const savePhotoToBackend = (birdingSessionId, birdId, data) => {
    PhotoModel.create(birdingSessionId, birdId, data)
      .then(res => {
        console.log('saved', res);
        setDidDataChange(!didDataChange);
        props.setDidBirdChange(!props.didBirdChange);
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
        mapImages(res.data.foundPhotos);
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

  const [modalId, setModalId] = useState('');
  const [photoIndex, setPhotoIndex] = useState(0);

  // map images
  const mapImages = (images) => {
    const mappedImagesArray = images.map((image, index, array) => {
      // for navigating between photos in the modal
      let nextId = '';
      let prevId='';
      if (index === 0) {
        // no previous photo, make prevId equal to current id
        prevId = image._id;
      } else {
        // make prevId equal to id of previous image in array
        prevId = array[index - 1]._id;
      }
      if (index === (array.length - 1)) {
        // no next photo, make nextId equal to current id
        nextId = image._id;
      } else {
        // make nextId equal to id of next image in array
        nextId = array[index + 1]._id;
      }
      return (
        <React.Fragment key={image._id}>
          <Confirmation
            componentName="photo"
            id={image._id}
            delete={() => deletePhoto(image.birdingSession._id, image._id)}
          />
          <Image
            data-toggle="modal" data-focus="true" data-target={`#bird${image._id}`}
            onClick={() => {
              setModalId(`bird${image._id}`)
              setPhotoIndex(index);
            }}
            className="thumbnail lazyload"
            src={image.url} alt="bird image"
            // key={image._id}
            publicId={image.cloudinaryPublicId}
          />
          <Photo
            // key={index} 
            // birdData={props.birdData}
            birdData={{
              name: image.bird.name,
              birdingSession: image.birdingSession,
            }}
            deletePhoto={deletePhoto}
            imageId={image._id}
            previousImageId={prevId}
            nextImageId={nextId}
            birdId={image.bird._id}
            image={
              <Image
                className="img-fluid lazyload"
                src={image.url} alt="bird image"
                // key={image._id}
                publicId={image.cloudinaryPublicId}
              />}
          />
        </React.Fragment>
      )
    })
    setMappedImages(mappedImagesArray);
  }

  useEffect(() => {
    getBirdPhotos(props.birdingSessionId, props.birdId);
  }, [didDataChange])

  return (
    <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}>
      <div>
        {mappedImages}
        <div className="clickable-icon" onClick={beginUpload}>
          <i className="fa fa-camera fa-2x" aria-hidden="true" ></i> New 
        </div>
      </div>
    </CloudinaryContext>
  )
}

export default PhotoContainer;