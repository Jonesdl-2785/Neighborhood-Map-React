// import React, { Component } from 'react';
// import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
//
// //const ClientID_FourSquare = "AZ30DSQHOMZTZLHWUD55U54GUUDWZRAQW0D2DLFWAEPPW51H"
// //const ClientSecret_FourSquare = "3H0LURYGH1EB1WTIO3WSN4M5YF35ZCGEKSEEQ2KTU5FV1RYS"
// //const Google_API_Key = "AIzaSyDnhUagyTDjkYrn1LE_He1k_33eOjBOA-g"
// //const Version_FourSquare = 20181102
//
// const MapComponent = withScriptjs(withGoogleMap((props) =>
//   <GoogleMap
//     defaultZoom={8}
//     zoom={props.zoom}
//     defaultCenter={{ lat: 35.499302, lng: -80.848686 }}
//     center={props.center}
//   >
//     {props.markers &&
//       props.markers.filter(marker => marker.isVisible).map((marker, i) => {
//         let venueData = props.venues.find(venue => venue.id == marker.id)
//       return <Marker key={i} position={{ lat: marker.lat, lng: marker.lng }} onClick={() => props.handleMarkerClick(marker)}>
//           {marker.isOpen &&
//             venueData.bestPhoto && (
//              <InfoWindow>
//                <React.Fragment>
//                  <img src={`${venueData.bestPhoto.prefix}250x250${venueData.bestPhoto.suffix}`} alt='Venue Photo' />
//             <p>{venueData.name}</p>
//             </React.Fragment>
//         </InfoWindow>
//       )}
//       </Marker>
//   })}
//   </GoogleMap>
// ))
//
// export default class Map extends Component {
//   render() {
//     return (
//       <MapComponent
//         {...this.props}
//         isMarkerShown
//         googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDnhUagyTDjkYrn1LE_He1k_33eOjBOA-g"
//         loadingElement={<div style={{ height: `100%` }} />}
//         containerElement={<div style={{ height: `100%`, width: `75%` }} />}
//         mapElement={<div style={{ height: `100%` }} />}
//       />
//     )}
//   }
