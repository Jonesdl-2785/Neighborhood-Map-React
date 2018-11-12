// import React from 'react';
// import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
// import NoMapDisplay from './NoMapDisplay';
//
// const MAP_KEY = "AIzaSyDnhUagyTDjkYrn1LE_He1k_33eOjBOA-g";
//
// const bounds = new google.maps.LatLngBounds();
//   for (let i = 0; i < locations.length; i++) {
//     let position = locations[i].locations;
//     let name = locations[i].name;
//   }
// ]
//
// export class MapContainer extends Component {
//   render() {
//     const style = {
//       height: '100vh',
//       width: '100vw'
//     }
//     return (
//       <Map
//         google={this.props.google}
//         zoom={12}
//         style={style}
//         initialCenter={{
//           lat: 35.499302,
//           lng: -80.848686
//         }}
//         bounds={bounds}
//         onClick={this.onMapClicked}
//         >
//         <Marker
//           onClick={this.onMarkerClick}
//           name={'locations'}/>
//         <InfoWindow
//           onClose={this.oninfoWindowClose}>
//             <div>
//               <h1>{this.state.selectedLocation.name}</h1>
//             </div>
//           </InfoWindow>
//         </Map>
//     )
//   }
// }
//
// export default GoogleApiWrapper({
//   apiKey: MAP_KEY
// })(MapContainer)
