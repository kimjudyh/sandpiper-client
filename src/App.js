import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Routes from './config/routes';
import Navbar from './components/Navbar';
import UserModel from './models/UserModel';
import './App.css';

function App(props) {
  // function to save user data to browser local storage
  const [currentUser, setCurrentUser] = useState({
    _id: localStorage.getItem('_id'),
    email: localStorage.getItem('email'),
    name: localStorage.getItem('name')
  });

  // store the currently logged in user in local storage
  const storeUser = (user) => {
    setCurrentUser(user);
    localStorage.setItem('_id', user._id);
    localStorage.setItem('email', user.email);
    localStorage.setItem('name', user.name);
  }

  // logout
  const logout = (event) => {
    event.preventDefault();
    // remove user id from local storage
    // localStorage.setItem('_id', null);
    // localStorage.setItem('email', null);
    // localStorage.setItem('name', null);
    localStorage.removeItem('_id');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    // api request for logout route
    UserModel.logout()
      .then(res => {
        console.log(res);
        setCurrentUser({
          _id: localStorage.getItem('_id'),
          email: localStorage.getItem('email'),
          name: localStorage.getItem('name')
        });
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
