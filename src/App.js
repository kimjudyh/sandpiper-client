import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Routes from './config/routes';
import Navbar from './components/Navbar';
import UserModel from './models/UserModel';
import './App.css';

function App(props) {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('uid'));

  // store the currently logged in user in local storage
  const storeUser = (userId) => {
    setCurrentUser(userId);
    localStorage.setItem('uid', userId);
  }

  // logout
  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem('uid');
    UserModel.logout()
      .then(res => {
        console.log(res);
        setCurrentUser(null);
        props.history.push('/');
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <Navbar 
        currentUser={currentUser}
        logout={logout}
      />
      Hello
      <Routes 
        currentUser={currentUser}
        storeUser={storeUser}
      />
    </div>
  );
}

// gives App access to history, match, other router props
export default withRouter(App);
