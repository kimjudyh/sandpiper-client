import React from 'react';

const Confirmation = (props) => {
  // unpack delete parameters

  return (
    <div className="modal" id={`modal${props.id}`} tabIndex="-1" role="dialog" aria-labelledby="warning-modal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Confirmation</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Delete this {props.componentName}?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button onClick={props.delete} type="button" className="btn btn-danger" data-dismiss="modal">Delete</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Confirmation;