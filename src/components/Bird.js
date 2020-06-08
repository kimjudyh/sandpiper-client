import React, { useState, useEffect } from 'react';
import BirdModel from '../models/BirdModel';

const Bird = (props) => {
  const [birdData, setBirdData] = useState({...props});
  const [isLoading, setIsLoading] = useState(true);

  // edit bird function
  useEffect(() => {
    setIsLoading(false);
  }, [birdData]);

  if (isLoading) {
    return (
      <div>
        loading...
      </div>
    )
  } else {
  return (
    <div>
      {/* if edit form chosen, show form */}
      {/* else show birdData */}
      <h4>{birdData.name}</h4>
      {birdData.number} |
      {birdData.behavior.name} |
      {birdData.unconfirmed ? 'Unconfirmed' : ''} |
      {birdData.fieldNotes}
    </div>
  )

  }
}

export default Bird;