import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BirdingSessionModel from '../models/BirdingSessionModel';
import BirdContainer from '../containers/BirdContainer';

const BirdingSessionBody = (props) => {
  const [birdingSessionBody, setBirdingSessionBody] = useState({...props});

  const fetchBirdingSession = (birdingSessionId) => {
    BirdingSessionModel.getOne(birdingSessionId)
      .then(res => {
        console.log('birding session body', res.data);
        setBirdingSessionBody(res.data.foundBirdingSession);
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
    // fetchBirdingSession(props._id);
  }, []);

  return (
    <div>
      <BirdContainer _id={props._id} />
    </div>
  )
}

export default BirdingSessionBody;