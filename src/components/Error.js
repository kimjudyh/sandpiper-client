import React from 'react';

const Error = (props) => {
  return (
    <div className="error-message">
      <h4>{props.error}</h4>
    </div>
  )
}

export default Error;