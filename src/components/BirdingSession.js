import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BirdingSessionModel from '../models/BirdingSessionModel';
import BirdContainer from '../containers/BirdContainer';
import BirdingSessionHeader from '../components/BirdingSessionHeader';
import BirdingSessionBody from '../components/BirdingSessionBody';

const BirdingSession = (props) => {
  const [birdingSession, setBirdingSession] = useState(props);

  const fetchBirdingSession = (birdingSessionId) => {
    BirdingSessionModel.getOne(birdingSessionId)
      .then(res => {
        console.log(res.data);
        // todo: set state
        setBirdingSession(res.data.foundBirdingSession);
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
    // fetchBirdingSession(props.match.params.id);
  }, []);

  return (
    <div>
      <BirdingSessionHeader _id={props.match.params.id} users={[]}/>
      <BirdingSessionBody _id={props.match.params.id} />
    </div>
  )
}

export default BirdingSession;