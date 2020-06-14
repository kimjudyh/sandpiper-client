import React from 'react';
import { Link } from 'react-router-dom';
import sandpiperImage from '../sandpiper-image.jpg';

const Home = () => {
  return (
    <div className="container home-header">
      <h2>Welcome to Sandpiper!</h2>
      <div className="home-image-frame">
        <img className="home-image" src={sandpiperImage} alt="sandpiper walking on beach"/>
      </div>
      <Link to={'/register'}><h3>Sign Up</h3></Link>
      <Link to={'/about'}><h4>About</h4></Link>
    </div>
  )
}

export default Home;