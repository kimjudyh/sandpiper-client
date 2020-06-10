import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BirdingSessionModel from '../models/BirdingSessionModel';
import EditBirdingSessionForm from '../forms/EditBirdingSessionForm';
import ShareContainer from '../containers/ShareContainer';

const BirdingSessionHeader = (props) => {
  const [birdingSessionHeader, setBirdingSessionHeader] = useState({...props.data});
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
          // send back to profile
          props.history.push('/profile');
          // dispay some error message
          console.log(err.response.data);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log(err.message);
        }
      })
  }

  // API call to delete birding session
  const deleteBirdingSession = (birdingSessionId) => {
    BirdingSessionModel.delete(birdingSessionId)
      .then(res => {
        console.log('deleted birding session', res.data);
        if (props.didDataChange !== undefined) {
          console.log('changing data')
          // delete request coming from profile page
          props.setDidDataChange(!props.didDataChange);
        }
        props.history.push('/profile');
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
    fetchBirdingSession(props.data._id);
    // fetchBirdingSession(props.key);
    // fetchBirdingSession(birdingSessionHeader._id);
    // setDidDataChange(false);
  }, [didDataChange]);

  // get all users that birding session is shared with
  const users = birdingSessionHeader.users.map((user, index) => {
    return (
      <span key={user._id}>{user.name} </span>
    )
  })

  if (birdingSessionHeader.location) {
    return (
      <div className="birdingSessionHeader">
        {/* make birding session location a link to the show page  */}
        <Link to={`/birdingSession/${props.data._id}`}>
          <h3>{birdingSessionHeader.location}</h3>
        </Link>
        {/* list users */}
        <div>
          Users: {users}
          <ShareContainer 
            birdingSessionId={props.data._id}
            birdingSessionUsers={birdingSessionHeader.users}
            didDataChange={didDataChange}
            setDidDataChange={setDidDataChange}
          />
        </div>
        {/* Delete Icon */}
        <div className="clickable-icon">
          <i className="fa fa-trash fa-lg" aria-hidden="true" onClick={() => deleteBirdingSession(props.data._id) }></i>
        </div>
        {/* Edit Icon */}
        <div className="clickable-icon">
          <i className="fa fa-pencil fa-lg" aria-hidden="true" onClick={form.toggleFormDisplay} ></i>
        </div>
        {/* delete birding session */}
        {/* <button className="btn btn-danger" onClick={() => deleteBirdingSession(props.data._id)}>Delete</button> */}
        {/* edit birding session form */}
        {/* <button className="btn btn-warning" onClick={form.toggleFormDisplay} >Edit</button> */}
        <div style={form.formDisplay}>
          <EditBirdingSessionForm 
            toggleFormDisplay={form.toggleFormDisplay}
            didDataChange={didDataChange}
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