import React, { useState } from 'react';
import UserModel from '../models/UserModel';
import Error from '../components/Error';

const Login = (props) => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

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
        console.log('login', res.data);
        // reset form inputs
        setUserData({
          email: '',
          password: '',
        })
        if (res.status === 200) {
          // store user id in local storage
          props.storeUser({
            _id: res.data.id,
            name: res.data.name,
            email: res.data.email
          })
          // send to profile page
          props.history.push('/profile');
        } else {
          // say invalid credentials
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          if (typeof err.response.data.message === 'string'){
            setError(err.response.data.message);
          }
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log(err.message);
        }
      })
  }

  return (
    <div>
      Login Page
      <Error error={error} />
      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="email">Email</label>
          <input 
            // autofocus this field
            // ref={input => input && input.focus()}
            type="text"
            id="email"
            name="email"
            value={ userData.email }
            onChange={ handleChange }
            required
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
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}

export default Login;
