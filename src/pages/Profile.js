import React, { useState, useEffect } from 'react';
import BirdingSessionModel from '../models/BirdingSessionModel';
import BirdingSessionContainer from '../containers/BirdingSessionContainer';
import NewBirdingSessionForm from '../forms/NewBirdingSessionForm';

const Profile = (props) => {

  return (
    <div>
      <h3>Profile</h3>
      <BirdingSessionContainer 
        {...props.routeComponentProps}
        currentUser={props.currentUser}
        storeUser={props.storeUser}
      />

    </div>
  )
}

export default Profile;

// export const useFormDisplay = () => {
//   const [formDisplay, setFormDisplay] = useState({display: 'none'})
//   const toggleFormDisplay = () => {
//     // toggle show form state
//     if (formDisplay.display === 'none') {
//       setFormDisplay({display: 'block'})
//     } else {
//       setFormDisplay({display: 'none'})
//     }
//   }
//   return ({
//     formDisplay,
//     toggleFormDisplay
//   })
// }