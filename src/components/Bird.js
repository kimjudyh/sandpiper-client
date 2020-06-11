import React, { useState, useEffect } from 'react';
import BirdModel from '../models/BirdModel';
import EditBirdForm from '../forms/EditBirdForm';
import PhotoContainer from '../containers/PhotoContainer';
import PhotoModel from '../models/PhotoModel';

const Bird = (props) => {
  const [birdData, setBirdData] = useState({...props});
  const [didBirdChange, setDidBirdChange] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  // toggle display of form
  const form = useFormDisplay();
  // toggle display of bird details
  const info = useFormDisplay();
  
  // API call to get one bird
  const getOne = (birdingSessionId, birdId) => {
    BirdModel.getOne(birdingSessionId, birdId)
      .then(res => {
        console.log(res.data);
        setBirdData(res.data.foundBird);
      })
  }

  // API call to get photos of bird from birding session
  const getBirdPhotos = (birdingSessionId, birdId) => {
    console.log('inside bird')
    PhotoModel.getBirdPhotos(birdingSessionId, birdId)
      .then(res => {
        console.log('bird got from db', res.data);
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

  // API call to delete photo
  const deletePhoto = (birdingSessionId, imageId) => {
    PhotoModel.delete(birdingSessionId, imageId)
      .then(res => {
        console.log('deleted photo', res.data);
        // setDidDataChange(!didDataChange);
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

  // API call to delete bird
  const deleteBird = async (birdingSessionId, birdId) => {
    await BirdModel.delete(birdingSessionId, birdId)
      .then(res => {
        console.log('deleted bird', res.data);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log(err.message);
        }
      })
    // find photos associated with deleted bird
    console.log('in get bird photos')
    console.log('in delete photos then');
    console.log(images)
    // loop through list of photos to delete and delete them
    await images.forEach((element) => {
      console.log('element', element._id)
      deletePhoto(birdingSessionId, element._id);
    })
    // trigger re-render
    props.setDidDataChange(!props.didDataChange);
  }

  useEffect(() => {
    setIsLoading(false);
    getOne(props.birdingSessionId, props._id);
    getBirdPhotos(props.birdingSessionId, props._id);
    // let parent component know something changed
    props.setDidDataChange(!props.didDataChange);
  }, [didBirdChange]);

  if (isLoading) {
    return (
      <h1>Loading...</h1>
    )
  } else {
  return (
    <div>
      {/* if edit form chosen, show form */}
      {/* else show birdData */}
      <h4 onClick={info.toggleFormDisplay}>{birdData.name}</h4>
      {/* Show / Hide Info Icon */}
      {info.formDisplay.display === 'none' ?
        <div className="clickable-icon">
          {/* Show More */}
          <i className="fa fa-chevron-up fa-lg" aria-hidden="true" onClick={info.toggleFormDisplay}></i>
        </div>
        :  
        <div className="clickable-icon">
          {/* Hide */}
          <i className="fa fa-chevron-down fa-lg" aria-hidden="true" onClick={info.toggleFormDisplay}></i> 
        </div>
      } 
      <div style={info.formDisplay} >
        {/* Delete Icon */}
        <div className="clickable-icon">
          <i className="fa fa-trash fa-lg" aria-hidden="true" onClick={() => deleteBird(props.birdingSessionId, props._id)}></i>
        </div>
        {/* Edit Icon */}
        <div className="clickable-icon">
          <i className="fa fa-pencil fa-lg" aria-hidden="true" onClick={form.toggleFormDisplay}></i>
        </div>
        <div style={form.formDisplay}>
          <EditBirdForm 
            toggleFormDisplay={form.toggleFormDisplay}
            birdingSessionId={props.birdingSessionId} 
            setBirdData={setBirdData} 
            didBirdChange={didBirdChange}
            setDidBirdChange={setDidBirdChange}
            birdData={birdData} />
        </div>
        <div>
          <p><strong>Number: </strong> {birdData.number !== null ? birdData.number : ''}</p>
          <p><strong>Behavior: </strong> {birdData.behavior.name}</p>
          <p><strong>Unconfirmed ID?</strong> {birdData.unconfirmed ? 'Unconfirmed' : ''} </p> 
          <p><strong>Field Notes: </strong> {birdData.fieldNotes}</p>
        </div>
        <div>
          <PhotoContainer 
            birdData={birdData}
            birdingSessionId={props.birdingSessionId}
            birdId={props._id}
            didBirdChange={didBirdChange}
            setDidBirdChange={setDidBirdChange}
          />
        </div>
      </div>
      <hr/>
    </div>
  )

  }
}

export default Bird;

export const useFormDisplay = () => {
  const [formDisplay, setFormDisplay] = useState({display: 'none'})
  const toggleFormDisplay = () => {
    // toggle show form state
    if (formDisplay.display === 'none') {
      setFormDisplay({display: 'block'})
    } else {
      setFormDisplay({display: 'none'})
    }
  }
  return ({
    formDisplay,
    toggleFormDisplay
  })
}