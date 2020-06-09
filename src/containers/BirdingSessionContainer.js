import React, { useState, useEffect } from 'react';
import BirdingSessionModel from '../models/BirdingSessionModel';
import BirdingSession from '../components/BirdingSession';
import BirdingSessionHeader from '../components/BirdingSessionHeader';
import NewBirdingSessionForm from '../forms/NewBirdingSessionForm';

const BirdingSessionContainer = (props) => {
  const [birdingSessions, setBirdingSessions] = useState([]);
  const [didBirdingSessionsChange, setDidBirdingSessionsChange] = useState(false);
  const form = useFormDisplay();
  // did state update on client side variable
  // use that in use effect to determine when to reload
  // pass setBirdingSessions to form

  const fetchBirdingSessions = () => {
    BirdingSessionModel.all()
      .then(res => {
        console.log(res.data.allBirdingSessions);
        setBirdingSessions(res.data.allBirdingSessions);
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
    fetchBirdingSessions();
      // TODO: fix infinite update loop when running effect on birdingSessions change
  }, [didBirdingSessionsChange]);

  const birdingSessionComponents = birdingSessions.map((element, index) => (
    <BirdingSessionHeader key={element._id} {...element} />
  ))

  return (
    <div>
      <button onClick={form.toggleFormDisplay}>New Birding Session</button>
      <div style={form.formDisplay}>
        <NewBirdingSessionForm 
          {...props}
          setDidBirdingSessionsChange={setDidBirdingSessionsChange}
        />
      </div>
      {birdingSessionComponents}
    </div>
  )

}
export default BirdingSessionContainer;

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