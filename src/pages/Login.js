import React, { useState } from 'react';
import UserModel from '../models/UserModel';

const Login = (props) => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });
  // render a form 
  // want to update the form inputs when changes are made to it
  const handleChange = (event) => {
    // setUserData overwrites the state, instead of merging
    // so save the current state to an object and change one field
    let newState = Object.assign({}, userData);
    newState[event.target.name] = event.target.value;
    setUserData(newState);
    // update the userData state
  }

  // send a login request to API when submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    // make API request
    UserModel.login(userData)
      .then(res => {
        console.log(res);
        // reset form inputs
        setUserData({
          email: '',
          password: '',
        })
        if (res.status === 200) {
          // store user id in local storage
          props.storeUser(res.data.id)
          // send to profile page
          props.history.push('/profile');
        } else {
          // say invalid credentials
        }
      })
  }

  return (
    <div>
      Login Page
      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="email">Email</label>
          <input 
            type="text"
            id="email"
            name="email"
            value={ userData.email }
            onChange={ handleChange }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            id="password"
            name="password"
            value={ userData.password } 
            onChange={ handleChange }
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}

export default Login;