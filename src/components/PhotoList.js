import React, { useState, useEffect } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';
import PhotoModel, { openUploadWidget } from '../models/PhotoModel';
import BirdModel from '../models/BirdModel';
import Photo from '../components/Photo';
import Confirmation from '../components/Confirmation';

const PhotoList = (props) => {
  /** Direct child of routes
   *  Parent of Photo, Confirmation
   */
  const [images, setImages] = useState([]);
  const [mappedImages, setMappedImages] = useState([]);
  const [didDataChange, setDidDataChange] = useState(false);
  const sort = useFormInput('date created');
  const [isLoading, setIsLoading] = useState(true);

  // API call to get all photos
  const getAllPhotos = () => {
    PhotoModel.all()
      .then(res => {
        console.log('got all photos', res.data);
        // set state
        setImages(res.data.foundPhotos);
        mapImages(res.data.foundPhotos);
        // also has foundBirdingSessions
      })
      .then(() => {
        setIsLoading(false)
        console.log('setting is loading to false')
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

  // sorts photos based on sort category chosen in form
  const sortPhotos = (sortCategory) => {
    // default ordering of photos is date created
    if (sortCategory === 'date created') {
      getAllPhotos();
    // sort by birding session location
    } else if (sortCategory === 'birding session') {
      images.sort((a, b) => {
        if (a.birdingSession.location.toLowerCase() < b.birdingSession.location.toLowerCase()) return -1;
        if (a.birdingSession.location.toLowerCase() > b.birdingSession.location.toLowerCase()) return 1;
        return 0;
      })
      console.log('sorted by session', images);
    // sort by bird name
    } else if (sortCategory === 'bird') {
      images.sort((a, b) => {
        if (a.bird.name.toLowerCase() < b.bird.name.toLowerCase()) return -1;
        if (a.bird.name.toLowerCase() > b.bird.name.toLowerCase()) return 1;
        return 0;
      })
      console.log(images);
    // sort by bird behavior
    } else if (sortCategory === 'behavior') {
      images.sort((a, b) => {
        if (a.bird.behavior.toLowerCase() < b.bird.behavior.toLowerCase()) return -1;
        if (a.bird.behavior.toLowerCase() > b.bird.behavior.toLowerCase()) return 1;
        return 0;
      })

    }
    setImages(images);
    mapImages(images);
  }

  // for keyboard event listener
  const [modalId, setModalId] = useState('');
  const [photoIndex, setPhotoIndex] = useState(0);

  // map images to components
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
        <>
          <Confirmation
            componentName="photo"
            id={image._id}
            delete={() => deletePhoto(image.birdingSession._id, image._id)}
          />
          <Image
            data-toggle="modal" data-focus="true" data-target={`#bird${image._id}`}
            onClick={()=> {
              setModalId(`bird${image._id}`)
              setPhotoIndex(index);
            }}
            className="thumbnail lazyload"
            src={image.url} alt="bird image"
            // key={image._id}
            key={index}
            publicId={image.cloudinaryPublicId}
          />
          <Photo
            // key={index}
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
                key={image._id}
                publicId={image.cloudinaryPublicId}
              />}
          />
        </>
      )
    })
    setMappedImages(mappedImagesArray);
  }


  useEffect(() => {
    getAllPhotos();
    sort.setValue('date created');
  }, [didDataChange])


  return (
    <div className="container photo-list">
      <h3>Photos</h3>
      {/* Sort By input form */}
      <div className="form-row justify-content-center">
        <div className="col col-3 align-items-center">
            <label>Sort By: </label>
        </div>
        <div className="col col-5">
          {/* Dropdown menu of sort categories */}
          <div className="form-group">
            <select className="form-control" defaultValue="date created" onChange={sort.handleChange}>
              <option id="date created" name="date created" value="date created">date created</option>
              <option id="birding session" name="birding session" value="birding session">Birding Session</option>
              <option id="bird" name="bird" value="bird">Bird</option>
              <option id="behavior" name="behavior" value="behavior">Behavior</option>
            </select>
          </div>
        </div>
        {/* Sort button */}
        <div className="col col-3">
          <button onClick={() => sortPhotos(sort.value)} className="btn btn-info">Sort</button>
        </div>
      </div>
      {/* Thumbnails */}
      {isLoading ? <h2>Loading...</h2> : ''}
      <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}>
        <div>
          {mappedImages ? mappedImages : <h2>Loading...</h2>}
        </div>
      </CloudinaryContext>
    </div>
  )
}

export default PhotoList;

// custom hook for changing form inputs
const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (event) => {
    // special case for checkbox, since default value is on, off
    if (event.target.type === 'checkbox') {
      // want to set as true or false
      setValue(!value);
    } else if (event.target.type === 'select') {

    } 
    else {
      setValue(event.target.value);
      console.log('in form change', event.target.value)
    }
  }
  const resetField = () => {
    setValue('');
  }
  return ({
    value,
    setValue,
    resetField,
    handleChange
  })
}
