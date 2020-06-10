import React from 'react';
import BirdingSessionContainer from '../containers/BirdingSessionContainer';

const Profile = (props) => {

  return (
    <div className="container">
      <h3>{props.currentUser.name}'s Profile</h3>
      <BirdingSessionContainer 
        {...props.routeComponentProps}
        currentUser={props.currentUser}
        storeUser={props.storeUser}
      />

    </div>
  )
}

export default Profile;
