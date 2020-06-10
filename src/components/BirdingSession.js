import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BirdingSessionModel from '../models/BirdingSessionModel';
import BirdContainer from '../containers/BirdContainer';
import BirdingSessionHeader from '../components/BirdingSessionHeader';
import BirdingSessionBody from '../components/BirdingSessionBody';

const BirdingSession = (props) => {
  // Shows birding session header and birding session body (show page)
  const [birdingSession, setBirdingSession] = useState({});

  // API call to get one birding session
  const fetchBirdingSession = (birdingSessionId) => {
    BirdingSessionModel.getOne(birdingSessionId)
      .then(res => {
        console.log('found', res.data.foundBirdingSession);
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

  // when component mounts, and data in array changes
  useEffect(() => {
    fetchBirdingSession(props.match.params.id);
  }, []);

  if (birdingSession.location) {
    return (
      <div>
        {/* Birding Session Header */}
        <BirdingSessionHeader 
          _id={props.match.params.id} 
          data={birdingSession} 
          users={[]}
          {...props}  // route component props: history, match, location
        />
        {/* Birding Session Body */}
        <BirdingSessionBody _id={props.match.params.id} />
      </div>
    )
  } else {
    return (
      <h1>Loading...</h1>
    )
  }
}

export default BirdingSession;