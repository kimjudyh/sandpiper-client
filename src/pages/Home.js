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
      <div className="home-links">
        <Link to={'/register'}><h3>Sign Up</h3></Link>
        <Link to={'/login'}><h3>Login</h3></Link>
      </div>
      <div className="home-info">
        <p>
          Sandpiper is an app where you can keep track of the birds you saw and the photos you took of them. You can share entries, or birding sessions, with other users that went birding with you. Compile the photos that might have otherwise lived on separate devices in the same spot. 
        </p>
        <Link to={'/about'}><h4>About</h4></Link>
      </div>
      <div className="home-info">
        <p>Share a birding session with registered users</p>
        <p>Add photos to a specific bird in a birding session</p>
        <p>View all photos you've added, and that have been shared with you, and sort them by date uploaded, birding session, bird, or behavior</p>
        <Link to={'/register'}><h3>Sign Up</h3></Link>
      </div>
      <div className="home-info">
        <p>
        Sandpiper is responsive to mobile device screens. Sign up to add birding sessions that contain birds you've seen and the photos you've taken of them.
        </p>
        <span>
          <img src={process.env.PUBLIC_URL + '/readme_images/mobile-profile.png'} height='500' alt="screenshot of mobile profile" className="lazyload"/>   <img src={process.env.PUBLIC_URL + '/readme_images/mobile-birding-session.png'} height='500' alt="screenshot of mobile birding session" className="lazyload"/>
        </span>
        <Link to={'/register'}><h3>Sign Up</h3></Link>
      </div>
      <div className="home-info">
        <p>
          Any session can be shared with a user that has signed up for Sandpiper. The birding session contains a map. In future work, the user will be able to drop pins and utilize photo metadata.
        </p>
        <span>
          <img src={process.env.PUBLIC_URL + '/readme_images/mobile-birding-session-share.png'} height='500' alt="screenshot of mobile birding session share" className="lazyload"/>   <img src={process.env.PUBLIC_URL + '/readme_images/mobile-birding-session-map.png'} height='500' alt="screenshot of mobile birding session map" className="lazyload"/>
        </span>
        <Link to={'/register'}><h3>Sign Up</h3></Link>
      </div>
      <div className="home-info">
        <p>
          Photos and field notes can be added to each bird in a birding session. All photos can be viewed and sorted on a separate page.
        </p>
        <span>
          <img src={process.env.PUBLIC_URL + '/readme_images/mobile-bird.png'} height='500' alt="screenshot of mobile bird page" className="lazyload"/>   <img src={process.env.PUBLIC_URL + '/readme_images/mobile-photos-sorted-bird.png'} height='500' alt="screenshot of mobile sorted bird photos" className="lazyload"></img>
        </span>
        <Link to={'/register'}><h3>Sign Up</h3></Link>
      </div>
      <div className="home-info">
        <p>
          Sandpiper works best in Chrome, Firefox, Edge, and currently doesn't work in Safari for some reason.
        </p>
      </div>
    </div>
  )
}

export default Home;