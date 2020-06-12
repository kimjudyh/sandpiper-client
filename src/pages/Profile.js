import React from 'react';
import { Link } from 'react-router-dom';
import BirdingSessionContainer from '../containers/BirdingSessionContainer';

const Profile = (props) => {

  if (props.currentUser._id !== null) {
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
      <div>
        <h1>Not Logged In</h1>
        <h3>Please log in or register to view your profile</h3>
        <Link className="nav-link" to={'/register'}>Register</Link>
        <Link className="nav-link" to={'/login'}>Login</Link>
      </div>
    )
  }
}

export default Profile;
