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

  return (
    <div>
      <div className="clickable-icon">
        <i className="fa fa-share-alt fa-lg" aria-hidden="true" onClick={form.toggleFormDisplay}></i>
      </div>
      <div style={form.formDisplay}>
        info about sharing
        who it's being shared with, ability to remove them
        (share)
        <ShareForm 
          birdingSessionId={props.birdingSessionId}
          didDataChange={props.didDataChange}
          setDidDataChange={props.setDidDataChange}
        />
      </div>
    </div>
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