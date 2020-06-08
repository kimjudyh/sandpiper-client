import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={'/login'}>Login</Link>
        </li>
        <li>
          <Link to={'/register'}>Register</Link>
        </li>
        <li>
          <Link to={'/logout'} onClick={props.logout}>Logout</Link>
        </li>
        <li>
          <Link to={'/profile'}>Profile</Link>
        </li>
        <li>
          <Link to={'/birdingSession/new'}>New Birding Session</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;