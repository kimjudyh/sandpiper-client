import React, { useState, useEffect } from 'react';
import BirdModel from '../models/BirdModel';
import Bird from '../components/Bird';
import NewBirdForm from '../forms/NewBirdForm';

const BirdContainer = (props) => {
  const [didBirdsChange, setDidBirdsChange] = useState(false);
  const [birds, setBirds] = useState([]);
  const form = useFormDisplay();

  // API call to get all birds
  const fetchBirds = (birdingSessionId) => {
    // get all birds from birding session specified by _id
    BirdModel.all(birdingSessionId)
      .then(res => {
        console.log('all birds', res.data);
        setBirds(res.data.allBirds);
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
    fetchBirds(props._id);
  }, [didBirdsChange]);

  // map bird data to Bird components
  const birdComponents = birds.map((element, index) => (
    <>
    <Bird 
      key={element._id} 
      {...element} 
      birdingSessionId={props._id} 
      didDataChange={didBirdsChange}
      setDidDataChange={setDidBirdsChange}
    />
    {/* <button className="btn btn-danger" onClick={() => deleteBird(props._id, element._id)}>Delete</button> */}
    </>
  ))

  return (
    <div>
      {/* <button type="button" className="btn btn-info" data-toggle="modal" data-focus="true" data-target="#newBirdForm" >New Bird</button> */}
      {/* <button className="btn btn-info" onClick={form.toggleFormDisplay}>New Bird</button>
      <div style={form.formDisplay}> */}
      {/* <div  */}
      {/* id="newBirdForm" */}
      {/* tabindex="-1" */}
      {/* role="dialog" */}
      {/* className="modal" */}
      {/* aria-hidden="true" */}
      {/* > */}
        {/* <div className="modal-dialog modal-dialog-centered"> */}
        {/* <div className="modal-content"> */}
        {/* <NewBirdForm 
          _id={props._id} 
          didBirdsChange={didBirdsChange}
          setDidBirdsChange={setDidBirdsChange}
          toggleFormDisplay={form.toggleFormDisplay}
        /> */}
        {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
        {/* </div> */}
        {/* </div> */}
      {/* </div> */}

      <div>
        {birdComponents}
      </div>
      <div>
        <button className="btn btn-info" onClick={form.toggleFormDisplay}>New Bird</button>
        <div style={form.formDisplay}>
          <NewBirdForm 
            _id={props._id} 
            didBirdsChange={didBirdsChange}
            setDidBirdsChange={setDidBirdsChange}
            toggleFormDisplay={form.toggleFormDisplay}
          />
        </div>
      </div>

    </div>
  )
}

export default BirdContainer;

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