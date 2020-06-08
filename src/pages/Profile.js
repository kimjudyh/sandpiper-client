import React, { useState, useEffect } from 'react';
import BirdingSessionModel from '../models/BirdingSessionModel';

const Profile = (props) => {
  const [birdingSessions, setBirdingSessions] = useState([]);

  useEffect(() => {
    BirdingSessionModel.all()
      .then(res => {
        console.log(res.data.allBirdingSessions);
        if (birdingSessions !== res.data.allBirdingSessions) {
          setBirdingSessions(res.data.allBirdingSessions);
        }
      })
      .catch(err => console.log(err))
      // TODO: fix infinite update loop when running effect on birdingSessions change
      // reload when user logs out
  }, []);

  const birdingSessionLocations = birdingSessions.map((element, index) => (
    <h2 key={index}>{element.location}</h2>
  ))

  return (
    <div>
      Profile
      {birdingSessionLocations}
    </div>
  )
}

export default Profile;