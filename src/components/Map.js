import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

//const ClientID_FourSquare = "AZ30DSQHOMZTZLHWUD55U54GUUDWZRAQW0D2DLFWAEPPW51H"
//const ClientSecret_FourSquare = "3H0LURYGH1EB1WTIO3WSN4M5YF35ZCGEKSEEQ2KTU5FV1RYS"
const Google_API_Key = "AIzaSyDnhUagyTDjkYrn1LE_He1k_33eOjBOA-g"
//const Version_FourSquare = 20181101

const MapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 35.499302, lng: -80.848686 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 35.499302, lng: -80.848686 }} />}
  </GoogleMap>
))

export default class Map extends Component {
  render() {
    return (
      <MapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDnhUagyTDjkYrn1LE_He1k_33eOjBOA-g"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )}
  }
