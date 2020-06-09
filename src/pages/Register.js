import React, { useState, useEffect } from 'react';
import UserModel from '../models/UserModel';

const Register = (props) => {
  const [userData, setUserData] = useState(
    {
      name: '',
      email: '',
      password: '',
      password2: ''
    }
  )

  // handle form input change
  const handleChange = (event) => {
    // setUserData overwrites the state, instead of merging
    // so save the current state to an object and change one field
    let newState = Object.assign({}, userData);
    newState[event.target.name] = event.target.value;
    setUserData(newState);
  }

  // handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // post data to auth route in API
    UserModel.register(userData)
      .then(data => {
        console.log('Registered', data);
        // reset the form inputs
        setUserData({
          name: '',
          email: '',
          password: '',
          password2: ''
        })
        props.history.push('/login');
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

  // need a form where the user can input name, email, passwords
  // when the form is submitted, we want to use UserModel register function to post the form data to our API
  // for now, console log that user was registered

  return (
    <div>
      Register Page
      <form onSubmit={ handleSubmit }>
        <div>
          <label>Name</label>
          <input 
            onChange={ handleChange }
            type="text"
            id="name"
            name="name"
            value={ userData.name }
          />
        </div> 
        <div>
          <label>Email</label>
          <input 
            onChange={ handleChange }
            type="text"
            id="email"
            name="email"
            value={ userData.email }
          />
        </div> 
        <div>
          <label>Password</label>
          <input 
            onChange={ handleChange }
            type="password"
            id="password"
            name="password"
            value={ userData.password }
          />
        </div> 
        <div>
          <label>Confirm Password</label>
          <input 
            onChange={ handleChange }
            type="password"
            id="password2"
            name="password2"
            value={ userData.password2 }
          />
        </div> 
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Register;