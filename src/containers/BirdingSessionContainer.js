import React, { useState, useEffect } from 'react';
import BirdingSessionModel from '../models/BirdingSessionModel';
import BirdingSession from '../components/BirdingSession';

const BirdingSessionContainer = (props) => {
  const [birdingSessions, setBirdingSessions] = useState([]);
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
  }, []);

  const birdingSessionComponents = birdingSessions.map((element, index) => (
    <BirdingSessionHeader key={element._id} {...element} />
  ))

  return (
    <div>
      birding session container
      {birdingSessionComponents}
    </div>
  )

}
 export default BirdingSessionContainer;