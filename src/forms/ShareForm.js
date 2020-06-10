import React, { useState, useEffect } from 'react';
import BirdingSessionModel from '../models/BirdingSessionModel';

const ShareForm = (props) => {
  const [userEmail, setUserEmail] = useState('');
  // API call to share birding session
  const share = (birdingSessionId, data) => {
    BirdingSessionModel.share(birdingSessionId, data)
      .then(res => {
        console.log('shared', res.data);
        // set did data change
        props.setDidDataChange(!props.didDataChange);
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
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input 
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            value={userEmail}
          />
        </div>
        <button type="submit">Share</button>
      </form>
    </div>
  )
}

export default ShareForm;