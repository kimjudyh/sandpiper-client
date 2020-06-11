import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container">
    <Link className="navbar-brand" to={'/'}>Sandpiper</Link>
    <Link className="navbar-brand" to={'/login'}>Login</Link>
    <Link className="navbar-brand" to={'/profile'}>Profile</Link>
    <Link className="navbar-brand" to={'/photos'}>Photos</Link>
    <Link className="navbar-brand" to={'/logout'} onClick={props.logout}>Logout</Link>
    {/* Hamburger Menu Button */}
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    {/* Links in dropdown */}
    <div className="collapse navbar-collapse" id="navbarsExample07">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link className="nav-link" to={'/birdingSession/new'}>New Birding Session</Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link" to={'/register'}>Register</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="dropdown07" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
          <div className="dropdown-menu" aria-labelledby="dropdown07">
            <a className="dropdown-item" href="#">Action</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</nav>

  )
}

export default Navbar;