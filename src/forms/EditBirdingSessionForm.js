import React, { useState, useEffect } from 'react';
import BirdingSessionModel from '../models/BirdingSessionModel';
import Error from '../components/Error';

const EditBirdingSessionForm = (props) => {
  const [birdingSessionData, setBirdingSessionData] = useState({
    location: props.birdingSessionHeader.location,
    date: props.birdingSessionHeader.date.slice(0, 10),
    notes: props.birdingSessionHeader.notes
  });
  const [error, setError] = useState('');

  // API call to update birding session
  const updateBirdingSession = async (birdingSessionId, data) => {
    await BirdingSessionModel.update(birdingSessionId, data)
      .then(res => {
        console.log('updated birding session', res.data);
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
          if (typeof err.response.data.message === 'string'){
            setError(err.response.data.message);
          }
        } else if (err.request) {
          console.log(err.request);
          setError('Something went wrong...');
        } else {
          console.log(err.message);
          setError('Something went wrong...');
        }
      })
  }

  const handleChange = (event) => {
    // setBirdingSessionData overwrites the state, instead of merging
    // so save the current state to an object and change one field
    // let newState = Object.assign({}, birdingSessionData);
    // newState[event.target.name] = event.target.value;
    // setBirdingSessionData(newState);
    // use spread syntax to add changed field to existing state
    setBirdingSessionData({
      ...birdingSessionData, 
      [event.target.name]: event.target.value
    })
  }

  // on form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // add time zone difference to UTC date
    let utcDate = new Date(new Date(birdingSessionData.date).getTime() + (new Date().getTimezoneOffset() * 60000));
    updateBirdingSession(props.birdingSessionHeader._id, 
      {...birdingSessionData, date: utcDate});
    props.setDidDataChange(!props.didDataChange);
  }

  // if there is birding session data, load the form, else say Loading
  if (birdingSessionData.date) {
    return (
      <div>
      <Error error={error} />
        <form  onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Location</label>
            <input 
              // autofocus this field
              className="form-control"
              onChange={handleChange}
              type="text"
              id="location"
              name="location"
              value={birdingSessionData.location}
              required
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input 
              className="form-control"
              onChange={handleChange}
              type="date"
              id="date"
              name="date"
              value={birdingSessionData.date}
              required
            />
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea 
              className="form-control"
              onChange={handleChange}
              type="text"
              id="notes"
              name="notes"
              rows="5"
              cols="30"
              value={birdingSessionData.notes}
            />
          </div>
          <button className="btn btn-success" type="submit">Save</button>
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
