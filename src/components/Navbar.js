import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../sandpiper-logo.svg';
import circleLogo from '../sandpiper_circle.svg';

const Navbar = (props) => {
  return (
<nav className="navbar navbar-expand-lg navbar-dark ">
  <div className="container">
    <Link className="nav-link navbar-brand logo" to={"/"}><img src={circleLogo} alt="Sandpiper logo"/> Sandpiper</Link>
    {/* Hamburger Menu Button */}
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsDropdown" aria-controls="navbarsDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    {/* Links in dropdown */}
    <div className="collapse navbar-collapse ml-auto" id="navbarsDropdown">
      <ul className="navbar-nav ml-auto">
        {props.currentUser._id === null ?
        <>
        <li className="nav-item active" data-toggle="collapse" data-target="#navbarsDropdown">
          <Link className="nav-link" to={'/about'}>About</Link>
        </li>
        <li className="nav-item active" data-toggle="collapse" data-target="#navbarsDropdown">
          <Link className="nav-link" to={'/register'}>Register</Link>
        </li>
        <li className="nav-item active" data-toggle="collapse" data-target="#navbarsDropdown">
          <Link className="nav-link" to={'/login'}>Login</Link>
        </li>
        </>
        :
        <>
        <li className="nav-item active" >
          <Link className="nav-link" data-toggle="collapse" data-target="#navbarsDropdown" to={'/profile'}>Profile</Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link" data-toggle="collapse" data-target="#navbarsDropdown" to={'/photos'}>Photos</Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link" data-toggle="collapse" data-target="#navbarsDropdown" to={'/logout'} onClick={props.logout}>Logout</Link>
        </li>
        </>
        }
      </ul>
    </div>
  </div>
</nav>

  )
}

export default Navbar;