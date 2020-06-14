import React from 'react';
import threeBirders from '../three-birders.jpg';

const About = () => {
  return (
    <div className="container about-header">
      <h2>About Sandpiper</h2>
      <div className="about-image-frame">
        <img className=" about-image" src={threeBirders} alt="three birders on the beach"/>
      </div>
      <div className="about-info">
        <h4>What bird is that?</h4>
        <p>
          I think it's some type of sandpiper... in the fall and winter, they don't have that brown back that Merlin Bird ID is showing as their main picture. Is it a Semipalmated Sandpiper? Based on the range, it could be, but don't you think it looks more like the Western Sandpiper? 
        </p>
        <p>
          It might not even be a sandpiper - it could be a sanderling! Take a ton of pictures and we'll try to get a positive identification when we get home.
        </p>
        <p>
          We can also compile our field notes later, somewhere...
        </p>
        <h4>6 months later...</h4>
        <p>
          Remember that birding trip we did to Grand Isle? Didn't we see some type of shorebird, maybe a sandpiper? We've taken hundreds of bird photos since then, it's going to take some time to dig up the Grand Isle pictures. And there were some other shorebirds on that beach - what did we decide their names were? Ruddy Plover? Ruddy Turnstone? I wish we had compiled our field notes and pictures in one place!
        </p>
        <h4>The birdwatching trip that inspired this app</h4>
        <p>
          The dialog above represents what happened at Grand Isle, Louisiana, and what has continued to happen. I went birdwatching around New Orleans with my sister and my boyfriend, Jeff. Jeff was manned with the camera, my sister carried around <u>The Sibley Guide to Birds</u>, and I had the Merlin Bird ID app open. Between the three of us, we should have been able to identify any bird! But our mental field notes, identification guesses, and photos stayed separate, and the lone shorebird walking along the beach remained unidentified.
        </p>
        <p>
          Sandpiper is where we can store that collective knowledge. I hope it can help me become a better birder, and that you enjoy using the app.
        </p>
        <p>
          Happy birding! Judy
        </p>
      </div>
    </div>

  )
}

export default About;