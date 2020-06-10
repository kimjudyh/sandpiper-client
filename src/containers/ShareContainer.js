import React, { useState, useEffect } from 'react';
import ShareForm from '../forms/ShareForm';
import BirdingSessionModel from '../models/BirdingSessionModel';

const ShareContainer = (props) => {
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
      info about sharing
      who it's being shared with, ability to remove them
      (share)
      <ShareForm 
        birdingSessionId={props.birdingSessionId}
        didDataChange={props.didDataChange}
        setDidDataChange={props.setDidDataChange}
      />
    </div>
  )
}

export default ShareContainer;