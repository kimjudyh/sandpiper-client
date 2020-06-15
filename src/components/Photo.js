import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BirdModel from '../models/BirdModel';

const Photo = (props) => {
  /** Direct child of PhotoContainer and PhotoList
   *  Parent of cloudinary Image
   */

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

  // remove modal backdrop
  const closeModal = () => {
    let body = document.querySelector('body');
    let modalDiv = document.querySelector('.modal-backdrop');
    body.classList.remove('modal-open');
    body.removeChild(modalDiv);
  }

  // useEffect(() => {
  //   let modalElement = document.getElementById(`bird${props.imageId}`);
  //   const handleKeyEvent = (event) => {
  //     if (event.key === 'ArrowRight') {
  //       closeModal();
  //       modalElement.setAttribute('style', 'display: none');
  //       modalElement.classList.remove('show');
  //     }
  //   }
  //   modalElement.addEventListener('keyup', handleKeyEvent); 
  //   return (() => {
  //     modalElement.removeEventListener('keyup', handleKeyEvent);
  //   })
  // })

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
              {/* Bird Name and Link to Birding Session */}
              <h5>{props.birdData.name} | <Link onClick={closeModal}  to={`/birdingSession/${props.birdData.birdingSession._id}`}>{props.birdData.birdingSession.location}</Link></h5>
            </div>
            {/* Delete Icon */}
            <div className="clickable-icon">
              {/* Close photo modal and open the delete confirmation modal */}
              <i className="fa fa-trash fa-lg" aria-hidden="true" 
              data-toggle="modal" data-focus="true" data-target={`#modal${props.imageId}`}
              data-dismiss="modal" 
              ></i>
            </div>
            {/* Close Modal button */}
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"><i className="fa fa-times fa-lg"></i></span>
            </button>
          </div>
          <div className="row">
            <div className="col">
              {/* Previous Image */}
              <div className="clickable-icon">
                <i className="fa fa-chevron-left fa-lg" aria-hidden="true"
                  data-toggle="modal" data-dismiss="modal" data-focus="true"
                  data-target={`#bird${props.previousImageId}`}
                ></i>
              </div>
            </div>
            <div className="col">
              {/* Next Image */}
              <div className="clickable-icon">
                <i className="fa fa-chevron-right fa-lg" aria-hidden="true"
                  data-toggle="modal" data-focus="true" data-dismiss="modal"
                  data-target={`#bird${props.nextImageId}`}
                ></i>
              </div>
            </div>
          </div>
          {/* Image */}
          {props.image}
        </div>
      </div>
    </div>
  )
}

export default Photo;