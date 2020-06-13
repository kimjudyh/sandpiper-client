import React, { useState, useEffect } from 'react';
import ShareForm from '../forms/ShareForm';
import BirdingSessionModel from '../models/BirdingSessionModel';

const ShareContainer = (props) => {
  const form = useFormDisplay();
  // props:
  // birdingSessionId={props.data._id}
  // birdingSessionUsers={birdingSessionHeader.users}
  // didDataChange={didDataChange}
  // setDidDataChange={setDidDataChange}
  // need users shared with
  // updates header about changes to users

  // API call to unshare session
  const unshare = (birdingSessionId, data) => {
    BirdingSessionModel.unshare(birdingSessionId, data)
      .then(res => {
        console.log('unshared', res.data);
        // set users
        props.setDidDataChange(!props.didDataChange);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          if (typeof err.response.data.message === 'string'){
            // setError(err.response.data.message);
          }
        } else if (err.request) {
          console.log(err.request);
          // setError('Something went wrong...');
        } else {
          console.log(err.message);
          // setError('Something went wrong...');
        }
      })
  }

  useEffect(() => {

  })
  const users = props.birdingSessionUsers.map((user, index) => {
    if (user._id === localStorage.getItem('_id')) {
      return (
        <div className="row">
          <div className="col">
            {user.name}
          </div>
        </div>
      )
    }
    return (
      <div className="row  align-items-center">
        <div className="col">
          {user.name}
        </div>
        <div className="col">
          <div className="clickable-icon" onClick={() => unshare(props.birdingSessionId, {_id: user._id})}>
            <i className="fa fa-user-times fa-lg" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    )
  })

  return (
    <>
      <div style={props.shareForm.formDisplay} className="share-container">
        <div className="share-info">
          <h5>Share this birding session</h5>
          <p>
            Invite other users by email to collaborate on this birding session.
          </p>
          <p>
            A collaborator has <strong>read, write, delete, and edit</strong> permissions on all components of this birding session.
          </p>
          <p>
            If a user is not registered, they must create an account. Please invite them after they have registered!
          </p>
        </div>
        <div>
          <h6>Users</h6> 
          {users}
        </div>
        <ShareForm 
          birdingSessionId={props.birdingSessionId}
          didDataChange={props.didDataChange}
          setDidDataChange={props.setDidDataChange}
        />
      </div>
    </>
  )
}

export default ShareContainer;

export const useFormDisplay = () => {
  const [formDisplay, setFormDisplay] = useState({display: 'none'})
  const toggleFormDisplay = () => {
    // toggle show form state
    if (formDisplay.display === 'none') {
      setFormDisplay({display: 'flex'})
    } else {
      setFormDisplay({display: 'none'})
    }
  }
  return ({
    formDisplay,
    toggleFormDisplay
  })
}