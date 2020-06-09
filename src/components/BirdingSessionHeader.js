import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BirdingSessionModel from '../models/BirdingSessionModel';
import EditBirdingSessionForm from '../forms/EditBirdingSessionForm';

const BirdingSessionHeader = (props) => {
  const [birdingSessionHeader, setBirdingSessionHeader] = useState({...props});
  const [didDataChange, setDidDataChange] = useState(false);
  const form = useFormDisplay();

  // API call to get one birding session
  const fetchBirdingSession = (birdingSessionId) => {
    BirdingSessionModel.getOne(birdingSessionId)
      .then(res => {
        console.log('birding session header', res.data);
        setBirdingSessionHeader(res.data.foundBirdingSession);
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

  // when component mounts
  useEffect(() => {
    // get birding session data
    fetchBirdingSession(props._id);
    // fetchBirdingSession(props.key);
    // fetchBirdingSession(birdingSessionHeader._id);
  }, [didDataChange]);

  // get all users that birding session is shared with
  const users = birdingSessionHeader.users.map((user, index) => {
    return (
      <span>{user.name} </span>
    )
  })

  if (birdingSessionHeader.location) {
    console.log('bsh', birdingSessionHeader);
  return (
    <div className="birdingSessionHeader">
      {/* make birding session location a link to the show page  */}
      <Link to={`/birdingSession/${props._id}`}>
        <h3>{birdingSessionHeader.location}</h3>
      </Link>
      {/* list users */}
      Users: {users}
      {/* edit birding session form */}
      <button className="btn btn-warning" onClick={form.toggleFormDisplay} >Edit</button>
      <div style={form.formDisplay}>
        <EditBirdingSessionForm 
          toggleFormDisplay={form.toggleFormDisplay}
          setDidDataChange={setDidDataChange}
          birdingSessionHeader={birdingSessionHeader}
          setBirdingSessionHeader={setBirdingSessionHeader}
        />
      </div>
    </div>
  )
  } else {
    return (
      <h1>Loading...</h1>
    )
  }
}

export default BirdingSessionHeader;

export const useFormDisplay = () => {
  const [formDisplay, setFormDisplay] = useState({display: 'none'})
  const toggleFormDisplay = () => {
    // toggle show form state
    if (formDisplay.display === 'none') {
      setFormDisplay({display: 'block'})
    } else {
      setFormDisplay({display: 'none'})
    }
  }
  return ({
    formDisplay,
    toggleFormDisplay
  })
}