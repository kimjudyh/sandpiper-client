import React, { useState, useEffect } from 'react';
import BirdingSessionModel from '../models/BirdingSessionModel';
import BirdingSession from '../components/BirdingSession';
import BirdingSessionHeader from '../components/BirdingSessionHeader';
import NewBirdingSessionForm from '../forms/NewBirdingSessionForm';

const BirdingSessionContainer = (props) => {
  // Lists all birding session headers (index page)
  const [birdingSessions, setBirdingSessions] = useState([]);
  const [didBirdingSessionsChange, setDidBirdingSessionsChange] = useState(false);
  // const [birdingSessionComponents, setBirdingSessionComponents] = useState([]);
  const form = useFormDisplay();

// TODO: re-render when something deleted

  // API call to get all birding sessions
  const fetchBirdingSessions = () => {
    BirdingSessionModel.all()
      .then(res => {
        console.log('birding session container all', res.data.allBirdingSessions);
        setBirdingSessions(res.data.allBirdingSessions);
        // let mapped = mapBirdingSessionHeaders(res.data.allBirdingSessions);
        // setBirdingSessionComponents(mapped);
        // console.log('mapped comps', birdingSessionComponents)
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

  // when component mounts, and data in array changes
  useEffect(() => {
    fetchBirdingSessions();
  }, [didBirdingSessionsChange]);

  // const mapBirdingSessionHeaders = (birdingSessions) => {
  //   console.log('birding sess', birdingSessions)
  //   const birdingSessionComponents = birdingSessions.map((element, index) => (
  //     // make array of BirdingSessionHeader components with birding session data passed as props
  //     // location, users, _id, etc
  //     <BirdingSessionHeader 
  //       key={element._id} 
  //       data={element} 
  //       setDidDataChange={setDidBirdingSessionsChange}
  //       didDataChange={didBirdingSessionsChange}
  //       {...props} // route component props: history, match, location
  //     />
  //   ))
  //   console.log('comps', birdingSessionComponents)
  //   return birdingSessionComponents;
  // }
  const birdingSessionComponents = birdingSessions.map((element, index) => (
    // make array of BirdingSessionHeader components with birding session data passed as props
    // location, users, _id, etc
    <BirdingSessionHeader 
      key={element._id} 
      data={element} 
      setDidDataChange={setDidBirdingSessionsChange}
      didDataChange={didBirdingSessionsChange}
      {...props} // route component props: history, match, location
    />
  ))

  return (
    <div>
      {/* Button to show or hide New Birding Session Form */}
      <button className="btn btn-info" onClick={form.toggleFormDisplay}>New Birding Session</button>
      {/* New Birding Session Form */}
      <div style={form.formDisplay}>
        {/* pass route component props, currentUser, storeUser */}
        <NewBirdingSessionForm 
          {...props}
          setDidBirdingSessionsChange={setDidBirdingSessionsChange}
        />
      </div>
      {/* Array of Birding Session Headers */}
      {birdingSessionComponents ? birdingSessionComponents : "Loading"}
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