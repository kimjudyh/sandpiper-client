import React, { useState, useEffect } from 'react';
import BirdingSessionModel from '../models/BirdingSessionModel';
import BirdingSessionHeader from '../components/BirdingSessionHeader';
import BirdingSessionBody from '../components/BirdingSessionBody';
import MapContainer from '../containers/MapContainer';

const BirdingSession = (props) => {
  /** Direct child of routes
   *  Parent of BirdingSessionHeader, MapContainer, BirdingSessionBody
   */

  // Shows birding session header and birding session body (show page)
  const [birdingSession, setBirdingSession] = useState({});
  const [didDataChange, setDidDataChange] = useState(false);

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
    console.log('birding session re-rendered');
  }, [didDataChange]);

  if (birdingSession.location) {
    return (
      <div className="container">
        {/* Birding Session Header */}
        <BirdingSessionHeader 
          didDataChange={didDataChange}
          setDidDataChange={setDidDataChange}
          _id={props.match.params.id} 
          data={birdingSession} 
          users={[]}
          {...props}  // route component props: history, match, location
        />
        {/* Map */}
        <MapContainer />
        {/* Birding Session Body */}
        <BirdingSessionBody 
          _id={props.match.params.id} 
          didDataChange={didDataChange}
          setDidDataChange={setDidDataChange}
        />
      </div>
    )
  } else {
    return (
      <h1>Loading...</h1>
    )
  }
}

export default BirdingSession;