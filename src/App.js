import React, { Component } from 'react';
// import MapComponent from './components/Map';
import MapComponent from './components/MapComponent';
import FourSquareAPI from './API/venue';
import venues from './data/venues.json';
//import VenueDrawer from './components/VenueDrawer';

import './App.css';

class App extends Component {
  state = {
    lat: 35.499302,
    lng: -80.848686,
      //venue: [],
      //markers: [],
      zoom: 12,
      //center: [],
      all: venues,
      filtered: null,
      open: false
    };

  styles = {

  }
    componentDidMount = () => {
    // this.setState({
    //   ...this.state,
    //   filtered: this.filterVenues(this.state.all, "")
    // });
  }



   render = () => {
     return (
       <div className="App" role="main">
         <div>
           <h1>Davidson, NC - Ice Cream Shops</h1>
         </div>
         <MapComponent
           aria-label="Map"
           lat={this.state.lat}
           lng={this.state.lng}
           zoom={this.state.zoom}
           venues={this.state.selectedIndex}
           handleMarkerClick={this.handleMarkerClick}
        />
       </div>
     );
   }
}
 export default App;
