import React, { useState, useEffect } from 'react';
import BirdModel from '../models/BirdModel';

const Bird = (props) => {
  return (
    <div>
      {props.name}
    </div>
  )
}

export default Bird;