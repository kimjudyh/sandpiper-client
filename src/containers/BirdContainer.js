import React, { useState, useEffect } from 'react';
import BirdModel from '../models/BirdModel';
import Bird from '../components/Bird';

const BirdContainer = (props) => {
  const [birds, setBirds] = useState([]);

  const fetchBirds = (birdingSessionId) => {
    // get all birds from birding session specified by _id
    BirdModel.all(birdingSessionId)
      .then(res => {
        console.log(res);
        setBirds(res.data.allBirds);
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
    fetchBirds(props._id);
  }, []);

  const birdComponents = birds.map((element, index) => (
    <Bird key={element._id} {...element} />
  ))

  return (
    <div>
      {birdComponents}
    </div>
  )
}

export default BirdContainer;