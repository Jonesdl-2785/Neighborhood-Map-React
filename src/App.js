import React, { Component } from 'react';
// import MapComponent from './components/Map';
import MapComponent from './components/MapComponent';
// import FourSquareAPI from './API/venue';
import locations from './data/locations.json';
import ListDrawer from './components/ListDrawer';
//import { withStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
import './App.css';

class App extends Component {
      state = {
        lat: 	35.499302,
        lng: 	-80.848686,
        // venue: [],
        markers: [],
        zoom: 8,
        // center: [],
        all: locations,
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
       };

       componentDidMount = () => {
        this.setState({
          ...this.state,
          filtered: this.filterLocations(this.state.all, ""),
          // near: 'Davidson, NC',
          // query: 'Ice Cream Shop',
          // limit: 25
        });
      }

      toggleDrawer = () => {
        this.setState({
          open: !this.state.open
        });
      }

      updateQuery = (query) => {
        this.setState({
          ...this.state,
          selectedIndex: null,
          filtered: this.filterLocations(this.state.all, query)
        });
      }

      filterLocations = (locations, query) => {
        return locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
      }

      clickListItem = (i) => {
        this.setState({ selectedIndex: i, open: !this.state.open })
      }

     render = () => {
       return (
         <div className="App" role="main">
           <div id="map">
             <button onClick={this.toggleDrawer} style={this.styles.menuButton}>
              <i className="fa fa-bars"></i>
             </button>
             <h2>Davidson, NC - Vegan Restaurants</h2>
           </div>
           <MapComponent
             aria-label="Map"
             lat={this.state.lat}
             lng={this.state.lng}
             zoom={this.state.zoom}
             locations={this.state.filtered}
             selectedIndex={this.state.selectedIndex}
             clickListItem={this.clickListItem}/>
           <ListDrawer
             aria-label="List"
             locations={this.state.filtered}
             open={this.state.open}
             toggleDrawer={this.toggleDrawer}
             filterLocations={this.updateQuery}
             selectedIndex={this.state.selectedIndex}
             clickListItem={this.clickListItem}/>

         </div>
     );
   }
}

 export default App;
