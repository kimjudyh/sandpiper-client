import React, { useState, useEffect } from 'react';
import BirdModel from '../models/BirdModel';

const Photo = (props) => {
  const [birdData, setBirdData] = useState(props.birdData);

  // API call to get one bird
  const getOne = (birdingSessionId, birdId) => {
    BirdModel.getOne(birdingSessionId, birdId)
      .then(res => {
        console.log('getting bird', birdId);
        console.log('bird data', res.data);
        setBirdData(res.data.foundBird);
      })
      .catch((err) => {
        console.log('axios error')
        if (err.response) {
          console.log(err.response.data);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log(err.message);
        }
      })
  }

  useEffect(() => {
    getOne(props.birdData.birdingSession._id, props.birdId);
  }, [])

  // make this a modal
  return (
    <div
      id={`bird${props.imageId}`}
      tabIndex="-1"
      role="dialog"
      className="modal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            {/* Bird name */}
            <div className="modal-title">
              {/* {props.birdData.name} */}
              {props.birdData.name} | {props.birdData.birdingSession.location}
            </div>
            {/* Delete Icon */}
            <div className="clickable-icon">
              <i className="fa fa-trash fa-lg" aria-hidden="true" data-dismiss="modal" onClick={() => props.deletePhoto(props.birdData.birdingSession._id, props.imageId)}></i>
            </div>
            {/* Close Modal button */}
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {/* Image */}
          {props.image}
        </div>
      </div>
    </div>
  )
}

export default Photo;