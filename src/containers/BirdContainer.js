import React, { useState, useEffect } from 'react';
import BirdModel from '../models/BirdModel';
import Bird from '../components/Bird';
import NewBirdForm from '../forms/NewBirdForm';
import { useFormDisplay } from '../pages/Profile';

const BirdContainer = (props) => {
  const [didBirdsChange, setDidBirdsChange] = useState(false);
  const [birds, setBirds] = useState([]);
  const form = useFormDisplay();

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
  }, [didBirdsChange]);

  const birdComponents = birds.map((element, index) => (
    <Bird key={element._id} {...element} />
  ))

  return (
    <div>
      <button onClick={form.toggleFormDisplay}>New Bird</button>
      <div style={form.formDisplay}>
        <NewBirdForm 
          _id={props._id} 
          setDidBirdsChange={setDidBirdsChange}
          toggleFormDisplay={form.toggleFormDisplay}
        />
      </div>

      <div>
        {birdComponents}
      </div>

    </div>
  )
}

export default BirdContainer;