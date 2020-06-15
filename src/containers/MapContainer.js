import React, { useState, useEffect } from 'react';
import { ReactBingmaps } from 'react-bingmaps';
import axios from 'axios';

const MapContainer = (props) => {
  /** Direct child of BirdingSession
   *  Parent of ReactBingMaps
   */
  const [pinsWithInfo, setPinsWithInfo] = useState([
    {
      "location": [37.4216408920133, -122.18513723405881],
      "addHandler": "mouseover", //on mouseover the pushpin, infobox shown
      "infoboxOption": { title: 'Stanford', description: 'Stanford University' },
      "pushPinOption": { title: 'Stanford', description: 'Pushpin' },
      // "infoboxAddHandler": { "type": "click", callback: this.callBackMethod },
      // "pushPinAddHandler": { "type": "click", callback: this.callBackMethod }

    }
  ]);
  const map = useFormDisplay();
  const [geocode, setGeocode] = useState([]);

  const GeocodeCallback = (res) => {
    console.log('in geocodecallback')
    console.log(res.resourceSets)
    if (res &&
      res.resourceSets &&
      res.resourceSets.length > 0 &&
      res.resourceSets[0].resources) {
        console.log('res resourcesets', res.resourceSets[0])

      setGeocode(res.resourceSets[0].resources);
    } else {
      console.log('no geocodes found')
    }
  }

  useEffect(() => {
    let geocodeRequest = "http://dev.virtualearth.net/REST/v1/Locations?query=" + encodeURIComponent("Stanford") + "&jsonp=GeocodeCallback&key=" + process.env.REACT_APP_BING_MAPS_KEY;

    // TODO: jsonp callback.. 

    // axios.get(geocodeRequest)
    //   .then((res) => GeocodeCallback(res))
    //   .catch(err => console.log('geocode error', err))

  }, [])


  return (
    <>
      <div className="map-header">
        <div className="row justify-content-center" onClick={map.toggleFormDisplay}>
          <div className="col col-6 offset-2">
            <h3 onClick={map.toggleFormDisplay}>Map</h3>
          </div>
          <div className="col col-1 offset-1 ">
            {map.formDisplay.display === 'none' ?
              <div className="clickable-icon ">
                {/* Show More */}
                <i className="fa fa-chevron-right fa-lg" aria-hidden="true" onClick={map.toggleFormDisplay}></i>
              </div>
              :  
              <div className="clickable-icon">
                {/* Hide */}
                <i className="fa fa-chevron-down fa-lg" aria-hidden="true" onClick={map.toggleFormDisplay}></i> 
              </div>
            } 
          </div>
        </div>
      </div>
      <div className="map-container" style={map.formDisplay}>
        <ReactBingmaps 
          bingmapKey = {`${process.env.REACT_APP_BING_MAPS_KEY}`} 
          center = {[37.4216408920133, -122.18513723405881]}
          // mapTypeId={'aerial'}
          infoboxesWithPushPins = {pinsWithInfo}
          zoom={12}
          > 
        </ReactBingmaps>
      </div>

    </>
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