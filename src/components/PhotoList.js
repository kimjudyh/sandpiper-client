import React, { useState, useEffect } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';
import PhotoModel, { openUploadWidget } from '../models/PhotoModel';
import BirdModel from '../models/BirdModel';
import Photo from '../components/Photo';

const PhotoList = (props) => {
  const [images, setImages] = useState([]);
  const [mappedImages, setMappedImages] = useState([]);
  const [didDataChange, setDidDataChange] = useState(false);
  const sort = useFormInput('date created');
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
        mapImages(res.data.foundPhotos);
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

  // something that sorts photo based on sort.value
  // sets images state
  // do this on button click - Sort onClick
  const sortPhotos = (sortCategory) => {
    function compare(a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      // a must be equal to b
      return 0;
    }
    if (sortCategory === 'date created') {
      getAllPhotos();
    } else if (sortCategory === 'birding session') {
      // images.sort(compare(a.birdingSession, b.birdingSession))
      images.sort((a, b) => {
        if (a.birdingSession < b.birdingSession) return -1;
        if (a.birdingSession > b.birdingSession) return 1;
        return 0;
      })
      console.log('sorted by session', images);

    } else if (sortCategory === 'bird') {
      // images.sort(compare(a.bird, b.bird))
      images.sort((a, b) => {
        if (a.bird < b.bird) return -1;
        if (a.bird > b.bird) return 1;
        return 0;
      })
      console.log(images);

    } else if (sortCategory === 'behavior') {

    }
    setImages(images);
    mapImages(images);
  }

  const mapImages = (images) => {
    const mappedImagesArray = images.map((image, index) => {
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
    setMappedImages(mappedImagesArray);
    // return mappedImagesArray;
  }

  // let mappedImages = images.map((image, index) => {
  //   return (
  //     <>
  //     <Image
  //       data-toggle="modal" data-focus="true" data-target={`#bird${image._id}`}
  //       className="thumbnail"
  //       src={image.url} alt="bird image" 
  //       key={image._id}
  //       publicId={image.cloudinaryPublicId}
  //     />
  //     <Photo 
  //       key={index}
  //       birdData={{
  //         name: '',
  //         birdingSession: image.birdingSession,
  //       }}
  //       deletePhoto={deletePhoto}
  //       imageId={image._id}
  //       birdId={image.bird}
  //       image={
  //         <Image 
  //           className="img-fluid"
  //           src={image.url} alt="bird image"
  //           key={image._id}
  //           publicId={image.cloudinaryPublicId}
  //         />}
  //     />
  //     </>
  //   )
  // })

  useEffect(() => {
    getAllPhotos();
    sort.setValue('date created');
  }, [didDataChange])


  return (
    <div>
      <div>
        <label>Sort By: </label>
        <select defaultValue="date created" onChange={sort.handleChange}>
          <option id="date created" name="date created" value="date created">date created</option>
          <option id="birding session" name="birding session" value="birding session">Birding Session</option>
          <option id="bird" name="bird" value="bird">Bird</option>
          <option id="behavior" name="behavior" value="behavior">Behavior</option>
        </select>
        <button onClick={() => sortPhotos(sort.value)}>Sort</button>
      </div>
      <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}>
        <div>
          {mappedImages}
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