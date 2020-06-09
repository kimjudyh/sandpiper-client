import React, { useState, useEffect } from 'react';
import BirdingSessionModel from '../models/BirdingSessionModel';

const EditBirdingSessionForm = (props) => {
  const [birdingSessionData, setBirdingSessionData] = useState({
    location: props.birdingSessionHeader.location,
    date: props.birdingSessionHeader.date.slice(0, 10),
    notes: props.birdingSessionHeader.notes
  });

  // API call to update birding session
  const updateBirdingSession = (birdingSessionId, data) => {
    BirdingSessionModel.update(birdingSessionId, data)
      .then(res => {
        console.log(res.data);
        // if success, hide form 
        if (res.status === 200) {
          props.toggleFormDisplay();
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
    // setState({...data, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    updateBirdingSession(props.birdingSessionHeader._id, birdingSessionData);
  }

  if (birdingSessionData.date) {
    return (
      <div>
        {birdingSessionData.location}
        Form
        <form className="form-group" onSubmit={handleSubmit}>
          <div>
            <label>Location</label>
            <input 
              // autofocus this field
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
  } else {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
}

export default EditBirdingSessionForm;