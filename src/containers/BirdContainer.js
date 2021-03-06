import React, { useState, useEffect } from 'react';
import BirdModel from '../models/BirdModel';
import Bird from '../components/Bird';
import NewBirdForm from '../forms/NewBirdForm';

const BirdContainer = (props) => {
  /** Direct child of BirdingSessionBody
   *  Parent of Bird
   */

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
    // let parent component know something changed
    props.setDidDataChange(!props.didDataChange);
  }, [didBirdsChange]);

  // map bird data to Bird components
  const birdComponents = birds.map((element, index) => (
    <React.Fragment key={element._id}>
      <Bird 
        // key={element._id} 
        {...element} 
        birdingSessionId={props._id} 
        didDataChange={didBirdsChange}
        setDidDataChange={setDidBirdsChange}
      />
    </React.Fragment>
  ))

  return (
    <div>
      <div>
        {birdComponents}
      </div>
      <div>
        {/* Toggle new bird form display */}
        <div className="clickable-icon">
          <i className="fa fa-feather fa-2x" aria-hidden="true" onClick={form.toggleFormDisplay}></i>
            New
          </div>
        <div className="bird" style={form.formDisplay}>
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

// custom hook to toggle element display between flex and none
export const useFormDisplay = () => {
  const [formDisplay, setFormDisplay] = useState({display: 'none'})
  const toggleFormDisplay = () => {
    // toggle show form state
    if (formDisplay.display === 'none') {
      setFormDisplay({display: 'flex'})
    } else {
      setFormDisplay({display: 'none'})
    }
  }
  return ({
    formDisplay,
    toggleFormDisplay
  })
}