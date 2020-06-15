import React, { useState } from 'react';
import BirdingSessionModel from '../models/BirdingSessionModel';
import Error from '../components/Error';

const ShareForm = (props) => {
  /** Direct child of ShareContainer
   *  Parent of Error
   */

  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState('');

  // API call to share birding session
  const share = (birdingSessionId, data) => {
    BirdingSessionModel.share(birdingSessionId, data)
      .then(res => {
        console.log('shared', res.data);
        // set did data change
        props.setDidDataChange(!props.didDataChange);
        setUserEmail('');
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
  // birding session id, email 

  const handleChange = (event) => {
    setUserEmail(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    share(props.birdingSessionId, {email: userEmail});
  }

  return (
    <div>
      <Error error={error} />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email: </label>
          <input 
            className="form-control"
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            value={userEmail}
            required
          />
        </div>
        <button className="btn btn-secondary" type="submit">Share</button>
      </form>
    </div>
  )
}

export default ShareForm;