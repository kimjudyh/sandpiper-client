import React, { useState, useEffect } from 'react';
import BirdModel from '../models/BirdModel';
import EditBirdForm from '../forms/EditBirdForm';

const Bird = (props) => {
  const [birdData, setBirdData] = useState({...props});
  const [didBirdChange, setDidBirdChange] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const form = useFormDisplay();
  
  // API call to get one bird
  const getOne = (birdingSessionId, birdId) => {
    BirdModel.getOne(birdingSessionId, birdId)
      .then(res => {
        console.log(res.data);
        setBirdData(res.data.foundBird);
      })
  }

  // edit bird function
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
      <h4>{birdData.name}</h4>
      <button className="btn btn-warning" onClick={form.toggleFormDisplay} >Edit</button>
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
        {birdData.number} |
        {birdData.behavior.name} |
        {birdData.unconfirmed ? 'Unconfirmed' : ''} |
        {birdData.fieldNotes}
      </div>
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