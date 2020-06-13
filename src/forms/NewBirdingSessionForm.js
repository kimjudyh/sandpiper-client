import React, { useState, useEffect } from 'react';
import BirdingSessionModel from '../models/BirdingSessionModel';
import Error from '../components/Error';

const NewBirdingSessionForm = (props) => {
  const [birdingSessionData, setBirdingSessionData] = useState({
    location: '',
    date: new Date().toISOString().slice(0, 10),
    notes: ''
  });
  const [error, setError] = useState('');
  const fixedDate = useFixedDate();

  useEffect(() => {
    fixedDate.fixDate(new Date());
  }, [])

  const makeNewBirdingSession = (data) => {
    BirdingSessionModel.create(data)
      .then(res => {
        console.log(res.data);
        // if success, clear form inputs redirect to birding session's page
        if (res.status === 200) {
          setBirdingSessionData({
            location: '',
            date: fixedDate.fixedDateString,
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
    // setState({...data, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    makeNewBirdingSession(birdingSessionData);
  }

  return (
    <div>
      <Error error={error} />
      <form  onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Location</label>
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
          <label>Date</label>
          <input 
            className="form-control"
            onChange={handleChange}
            type="date"
            id="date"
            name="date"
            value={fixedDate.fixedDateString}
            required
          />
        </div>
        <div>
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
}

export default NewBirdingSessionForm;

// custom hook to adjust date from UTC to Local Timezone and make it a string that the date input accepts
const useFixedDate = () => {
  const [fixedDateString, setFixedDateString] = useState('');

  // adjust date for timezone
  const fixDate = (utcDateObject) => {
    // convert date string to Date object
    let date = utcDateObject;
    // convert date to ms
    // get timezone offset and convert from min to ms
    // convert ms to date
    date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    // format date to match input type="date": yyyy-mm-dd
    const dateString = date.toISOString().slice(0, 10);
    setFixedDateString(dateString)
  }
  return ({
    fixedDateString,
    fixDate
  })

}