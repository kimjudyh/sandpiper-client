import React from 'react';

const Error = (props) => {
  return (
    <div className="error-message">
      <h6>{props.error}</h6>
    </div>
  )
}

export default Error;