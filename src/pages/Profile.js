import React from 'react';
import BirdingSessionContainer from '../containers/BirdingSessionContainer';

const Profile = (props) => {

  if (props.currentUser !== null) {
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
  } else {
    return (
      <h1>Not Logged In</h1>
    )
  }
}

export default Profile;
