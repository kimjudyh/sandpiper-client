import React from 'react';
import PhotoModel from '../models/PhotoModel';

const Photo = (props) => {

  // make this a modal
  return (
    <div
      id={`bird${props.imageId}`}
      tabIndex="-1"
      role="dialog"
      className="modal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
              {props.birdData.name}
            {/* Delete Icon */}
            <div className="clickable-icon">
              <i className="fa fa-trash fa-lg" aria-hidden="true" data-dismiss="modal" onClick={() => props.deletePhoto(props.birdData.birdingSession, props.imageId)}></i>
            </div>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {props.image}
        </div>
      </div>
    </div>
  )
}

export default Photo;