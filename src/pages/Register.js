import React, { useState } from 'react';
import UserModel from '../models/UserModel';
import Error from '../components/Error';

const Register = (props) => {
  const [userData, setUserData] = useState(
    {
      name: '',
      email: '',
      password: '',
      password2: ''
    }
  )
  const [error, setError] = useState('');

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
          if (typeof err.response.data.message === 'string'){
            setError(err.response.data.message);
          }
        } else if (err.request) {
          console.log(err.request);
          setError('Something went wrong...');
        } else {
          console.log(err.message);
          setError('Something went wrong...');
        }
      })
  }

  // need a form where the user can input name, email, passwords
  // when the form is submitted, we want to use UserModel register function to post the form data to our API
  // for now, console log that user was registered

  return (
    <div className="register-container">
      <div className=" register">
        <h3>Register New User</h3>
        <Error error={error} />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              onChange={handleChange}
              type="text"
              id="name"
              name="name"
              value={userData.name}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              onChange={handleChange}
              type="text"
              id="email"
              name="email"
              value={userData.email}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              value={userData.password}
              required
            />
          </div>
          <div>
            <label htmlFor="password2">Confirm Password</label>
            <input
              className="form-control"
              onChange={handleChange}
              type="password"
              id="password2"
              name="password2"
              value={userData.password2}
              required
            />
          </div>
          <button className="btn btn-info" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Register;