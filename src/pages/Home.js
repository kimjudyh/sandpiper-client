import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container home-header">
      <h2>Welcome to Sandpiper!</h2>
      <Link to={'/register'}><h3>Sign Up</h3></Link>
      <Link to={'/about'}><h4>About</h4></Link>
    </div>
  )
}

export default Home;