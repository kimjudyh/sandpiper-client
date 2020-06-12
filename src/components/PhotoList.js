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
    if (sortCategory === 'date created') {
      getAllPhotos();
    } else if (sortCategory === 'birding session') {
      // images.sort(compare(a.birdingSession, b.birdingSession))
      images.sort((a, b) => {
        if (a.birdingSession.location.toLowerCase() < b.birdingSession.location.toLowerCase()) return -1;
        if (a.birdingSession.location.toLowerCase() > b.birdingSession.location.toLowerCase()) return 1;
        return 0;
      })
      console.log('sorted by session', images);

    } else if (sortCategory === 'bird') {
      images.sort((a, b) => {
        if (a.bird.name.toLowerCase() < b.bird.name.toLowerCase()) return -1;
        if (a.bird.name.toLowerCase() > b.bird.name.toLowerCase()) return 1;
        return 0;
      })
      console.log(images);

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

  const mapImages = (images) => {
    const mappedImagesArray = images.map((image, index) => {
      return (
        <>
          <Image
            data-toggle="modal" data-focus="true" data-target={`#bird${image._id}`}
            onClick={()=> {
              setModalId(`bird${image._id}`)
              setPhotoIndex(index);
            }}
            className="thumbnail"
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
            birdId={image.bird._id}
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

  // attach event listener, listen for keyup
  // useEffect(() => {
  //   let modalElement = document.getElementById(modalId);
  //   let body = document.querySelector('body');
  //   let div = document.createElement('div')
  //   div.classList.add('modal-backdrop', 'show')
  //   console.log(body)
    // if (modalElement) {
    //     modalElement.classList.add('show');
    //     modalElement.setAttribute('style', 'display: block')
    //     body.classList.add('modal-open');

    //     console.log(div)
    //     document.querySelector('body').appendChild(div)

    // }
    // window.addEventListener('click', (event) => {
    //   console.log(event.target.classList);
    // })
    // console.log(modalElement)
    
    // const handleKeyEvent = (event) => {
    //   console.log('key pressed', event.key)
    //   console.log('index of photo', photoIndex)
    //   let index = photoIndex;
    //   if (event.key === 'ArrowRight' && photoIndex !== mappedImages.length) {
        // go to next photo, if it exists
        // console.log('pressed right arrow')
        // index = photoIndex + 1;
        // setPhotoIndex(index)
        // setModalId(`bird${images[index]._id}`)
        // remove show class from current modal
        // add show class to next modal
        // modalElement.classList.remove('show')
        // modalElement.setAttribute('style', 'display: none')
        // modalElement = document.getElementById(`bird${images[index]._id}`)
        // modalElement.classList.add('show');
        // modalElement.setAttribute('style', 'display: block')

        // console.log(div)
        // document.querySelector('body').appendChild(div)


        
        // modalElement = document.getElementById(modalId);
      // } else if (event.key === 'ArrowLeft') {
      //   console.log('pressed left arrow')
      // }
      // console.log('photo index', photoIndex);
      // console.log('modal id', modalId)
      // ArrowRight
      // ArrowLeft
    // }

    // if modal is open, attach event listener to it
    // if (modalElement) {
    //   modalElement.addEventListener('keyup', handleKeyEvent)
    //   return () => modalElement.removeEventListener('keyup', handleKeyEvent);
    // }
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
