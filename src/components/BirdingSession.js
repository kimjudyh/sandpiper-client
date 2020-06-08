import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BirdingSessionModel from '../models/BirdingSessionModel';
import BirdContainer from '../containers/BirdContainer';
import BirdingSessionHeader from '../components/BirdingSessionHeader';
import BirdingSessionBody from '../components/BirdingSessionBody';

const BirdingSession = (props) => {
  const [birdingSession, setBirdingSession] = useState(props);

  return (
    <div>
      <BirdingSessionHeader/>
      <BirdingSessionBody />
    </div>
  )
}

export default BirdingSession;