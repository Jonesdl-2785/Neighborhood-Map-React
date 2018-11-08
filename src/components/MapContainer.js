// import React, { Component } from 'react';
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
//
//
// const ClientID_FourSquare = "AZ30DSQHOMZTZLHWUD55U54GUUDWZRAQW0D2DLFWAEPPW51H"
// const ClientSecret_FourSquare = "3H0LURYGH1EB1WTIO3WSN4M5YF35ZCGEKSEEQ2KTU5FV1RYS"
// const Google_API_Key = "AIzaSyDnhUagyTDjkYrn1LE_He1k_33eOjBOA-g"
// const Version_FourSquare = 20181101
//
// class MapContainer extends Component {
//   sate = {
//     // TODO: Create a map variable
//     map: null,
//     // Create a new blank array for all the listing markers.
//     markers = []
//   }
//   render() {
//     return (
//       <Map google={this.props.google} zoom={14}>
//
//         <Marker onClick={this.onMarkerClick}
//                 name={'Current location'} />
//
//         <InfoWindow onClose={this.onInfoWindowClose}>
//             <div>
//               <h1>{this.state.selectedPlace.name}</h1>
//             </div>
//         </InfoWindow>
//       </Map>
//     );
//   }
// }
//
// export default GoogleApiWrapper({
//   apiKey: (Google_API_Key)
// })(MapContainer)
