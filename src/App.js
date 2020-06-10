import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Routes from './config/routes';
import Navbar from './components/Navbar';
import UserModel from './models/UserModel';
import './App.css';

function App(props) {
  const [currentUser, setCurrentUser] = useState({
    uid: localStorage.getItem('uid'),
    email: localStorage.getItem('email'),
    name: localStorage.getItem('name')
  });

  // store the currently logged in user in local storage
  const storeUser = (user) => {
    setCurrentUser(user);
    localStorage.setItem('uid', user._id);
    localStorage.setItem('email', user.email);
    localStorage.setItem('name', user.name);
  }

  // logout
  const logout = (event) => {
    event.preventDefault();
    // remove user id from local storage
    localStorage.removeItem('uid');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    // api request for logout route
    UserModel.logout()
      .then(res => {
        console.log(res);
        setCurrentUser(null);
        props.history.push('/');
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

  return (
    <div className="App">
      <Navbar 
        currentUser={currentUser}
        logout={logout}
      />
      <Routes 
        currentUser={currentUser}
        storeUser={storeUser}
      />
    </div>
  );
}

// gives App access to history, match, other router props
export default withRouter(App);
