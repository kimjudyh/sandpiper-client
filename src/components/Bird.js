import React, { useState, useEffect } from 'react';
import BirdModel from '../models/BirdModel';
import EditBirdForm from '../forms/EditBirdForm';
import PhotoContainer from '../containers/PhotoContainer';

const Bird = (props) => {
  const [birdData, setBirdData] = useState({...props});
  const [didBirdChange, setDidBirdChange] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  // API call to delete bird
  const deleteBird = (birdingSessionId, birdId) => {
    BirdModel.delete(birdingSessionId, birdId)
      .then(res => {
        console.log('deleted bird', res.data);
        // trigger re-render
        props.setDidDataChange(!props.didDataChange);
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
  }

  useEffect(() => {
    setIsLoading(false);
    getOne(props.birdingSessionId, props._id)
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