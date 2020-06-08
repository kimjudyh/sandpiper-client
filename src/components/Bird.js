import React, { useState, useEffect } from 'react';
import BirdModel from '../models/BirdModel';

const Bird = (props) => {
  const [birdData, setBirdData] = useState({...props});

  // edit bird function

  return (
    <div>
      {/* if edit form chosen, show form */}
      {/* else show birdData */}
      <h4>{birdData.name}</h4>
      {birdData.fieldNotes}
    </div>
  )
}

export default Bird;