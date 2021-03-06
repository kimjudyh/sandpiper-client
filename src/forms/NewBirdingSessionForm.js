import React, { useState, useEffect } from 'react';
import BirdingSessionModel from '../models/BirdingSessionModel';
import Error from '../components/Error';

const NewBirdingSessionForm = (props) => {
  const [birdingSessionData, setBirdingSessionData] = useState({
    location: '',
    // UTC is 7 hours ahead of PST, then format to yyyy-mm-dd string
    date: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 10),
    notes: ''
  });
  const [error, setError] = useState('');

  const makeNewBirdingSession = (data) => {
    BirdingSessionModel.create(data)
      .then(res => {
        console.log(res.data);
        // if success, clear form inputs redirect to birding session's page
        if (res.status === 200) {
          setBirdingSessionData({
            location: '',
            date: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 10),
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
          if (typeof err.response.data.message === 'string'){
            setError(err.response.data.message);
          }
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
    // convert date that user selected in their timezone to UTC
    let utcDate = new Date(new Date(birdingSessionData.date).getTime() + (new Date().getTimezoneOffset() * 60000))
    makeNewBirdingSession({...birdingSessionData, date: utcDate});
  }

  return (
    <div>
      <Error error={error} />
      <form  onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input 
            className="form-control"
            // autofocus this field
            onChange={handleChange}
            type="text"
            id="location"
            name="location"
            value={birdingSessionData.location}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
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
        <div>
          <label htmlFor="notes">Notes</label>
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
}

export default NewBirdingSessionForm;
