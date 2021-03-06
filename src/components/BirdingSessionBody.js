import React, { useState, useEffect } from 'react';
import BirdingSessionModel from '../models/BirdingSessionModel';
import BirdContainer from '../containers/BirdContainer';

const BirdingSessionBody = (props) => {
  /** Direct child of BirdingSession
   *  Parent of BirdContainer
   */

  const [birdingSessionBody, setBirdingSessionBody] = useState({...props});

  // API call to fetch birding session
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
    <div className="birdingSessionBody">
      <BirdContainer 
        _id={props._id} 
        didDataChange={props.didDataChange}
        setDidDataChange={props.setDidDataChange}
      />
    </div>
  )
}

export default BirdingSessionBody;