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

  useEffect(() => {

  })
  const users = props.birdingSessionUsers.map((user, index) => {
    return (
      <span key={user._id}>{user.name} </span>
    )
  })

  return (
    <>
      <div className="clickable-icon">
        <i className="fa fa-share-alt fa-lg" aria-hidden="true" onClick={form.toggleFormDisplay}></i>
      </div>
      <div style={form.formDisplay}>
        <div>
          Users: {users}
        </div>
        info about sharing
        who it's being shared with, ability to remove them
        (share)
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