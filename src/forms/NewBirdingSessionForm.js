import React, { useState } from 'react';
import BirdingSessionModel from '../models/BirdingSessionModel';

const NewBirdingSessionForm = (props) => {
  const [birdingSessionData, setBirdingSessionData] = useState({
    location: '',
    date: '',
    notes: ''
  });

  const makeNewBirdingSession = (data) => {
    BirdingSessionModel.create(data)
      .then(res => {
        console.log(res.data);
        // if success, clear form inputs redirect to birding session's page
        if (res.status === 200) {
          setBirdingSessionData({
            location: '',
            date: '',
            notes: ''
          })
          props.history.push(`/birdingSession/${res.data.newBirdingSession._id}`)
        } else {
          // provide message that something went wrong
        }
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

  const handleChange = (event) => {
    // setBirdingSessionData overwrites the state, instead of merging
    // so save the current state to an object and change one field
    let newState = Object.assign({}, birdingSessionData);
    newState[event.target.name] = event.target.value;
    setBirdingSessionData(newState);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    makeNewBirdingSession(birdingSessionData);
  }

  return (
    <div>
      Form
      <form onSubmit={handleSubmit}>
        <div>
          <label>Location</label>
          <input 
            onChange={handleChange}
            type="text"
            id="location"
            name="location"
            value={birdingSessionData.location}
          />
        </div>
        <div>
          <label>Date</label>
          <input 
            onChange={handleChange}
            type="date"
            id="date"
            name="date"
            value={birdingSessionData.date}
          />
        </div>
        <div>
          <label>Notes</label>
          <textarea 
            onChange={handleChange}
            type="text"
            id="notes"
            name="notes"
            value={birdingSessionData.notes}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default NewBirdingSessionForm;