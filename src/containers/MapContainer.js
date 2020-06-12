import React, { useState } from 'react';
import { ReactBingmaps } from 'react-bingmaps';

const MapContainer = (props) => {
  const map = useFormDisplay();
  return (
    <div >
      <div className="map-header">
        <h2>Map</h2>
        {map.formDisplay.display === 'none' ?
          <div className="clickable-icon">
            {/* Show More */}
            <i className="fa fa-chevron-up fa-lg" aria-hidden="true" onClick={map.toggleFormDisplay}></i>
          </div>
          :  
          <div className="clickable-icon">
            {/* Hide */}
            <i className="fa fa-chevron-down fa-lg" aria-hidden="true" onClick={map.toggleFormDisplay}></i> 
          </div>
        } 
      </div>
      <div className="map-container" style={map.formDisplay}>
        <ReactBingmaps 
          bingmapKey = {`${process.env.REACT_APP_BING_MAPS_KEY}`} 
          center = {[37.4216408920133, -122.18513723405881]}
          // mapTypeId={'aerial'}
          > 
        </ReactBingmaps>
      </div>

    </div>
  )
}

export default MapContainer;

export const useFormDisplay = () => {
  const [formDisplay, setFormDisplay] = useState({display: 'none'})
  const toggleFormDisplay = () => {
    // toggle show form state
    if (formDisplay.display === 'none') {
      setFormDisplay({display: 'block'})
    } else {
      setFormDisplay({display: 'none'})
    }
  }
  return ({
    formDisplay,
    toggleFormDisplay
  })
}