import React, { Component } from 'react';
// import MapComponent from './components/Map';
import MapComponent from './components/MapComponent';
// import FourSquareAPI from './API/venue';
import venues from './data/venues.json';
import VenueDrawer from './components/VenueDrawer';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import './App.css';

class App extends Component {
      state = {
        lat: 35.4993,
        lng: -80.8487,
          //venue: [],
          //markers: [],
          zoom: 12,
          //center: [],
          all: venues,
          filtered: null,
          open: false
        };

      styles = {
        menuButton: {
           marginLeft: 10,
           marginRight: 20,
           position: "absolute",
           left: 10,
           top: 20,
           background: "#ccc",
           padding: 10
         },
         hide: {
           display: 'none'
         },
         header: {
           marginTop: "0px"
         }
       }

        componentDidMount = () => {
        this.setState({
          ...this.state,
          filtered: this.filterVenues(this.state.all, "")
        });
      }

      toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
      };

      updateQuery = (query) => {
        this.setState({
          ...this.state,
          selectedIndex: null,
          filtered: this.filterVenues(this.state.all, query)
        });
      }

      filterVenues = (venues, query) => {
        return venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()));
      }

      clickListItem = (i) => {
        this.setState({ selectedIndex: i, open: !this.state.open })
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
             clickListItem={this.clickListItem}/>
           <VenueDrawer
             aria-label="List"
             venus={this.state.filtered}
             open={this.state.open}
             toggleDrawer={this.toggleDrawer}
             filterLocations={this.updateQuery}
             clickListItem={this.clickListItem}/>
         </div>
     );
   }
}
 export default App;
