import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BirdingSessionModel from '../models/BirdingSessionModel';

const BirdingSessionHeader = (props) => {
  const [birdingSessionHeader, setBirdingSessionHeader] = useState({...props});

  const fetchBirdingSession = (birdingSessionId) => {
    BirdingSessionModel.getOne(birdingSessionId)
      .then(res => {
        console.log(res.data);
        // todo: set state
        setBirdingSessionHeader(res.data.foundBirdingSession);
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
    fetchBirdingSession(props._id);
  }, []);

  const users = birdingSessionHeader.users.map((user, index) => {
    return (
      <span>{user.name} </span>
    )
  })

  return (
    <div className="birdingSessionHeader">
      <Link to={`/birdingSession/${props._id}`}>
        <h3>{birdingSessionHeader.location}</h3>
      </Link>
      Users: {users}
    </div>
  )
}

export default BirdingSessionHeader;