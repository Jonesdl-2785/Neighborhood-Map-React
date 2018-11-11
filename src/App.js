import React, { Component } from 'react';
import MapComponent from './components/MapComponent';
import locations from './data/locations';
import ListDrawer from './components/ListDrawer';
import './App.css';

class App extends Component {
      state = {
        lat: 	35.499302,
        lng: 	-80.848686,
        markers: [],
        zoom: 12,
        selectedIndex: null,
        all: locations,
        filtered: null,
        open: false,
        query: "",
      };

      styles = {
        menu: {
          background: "F0DE92"
        },
        menuButton: {
           marginLeft: 10,
           marginRight: 20,
           position: "absolute",
           left: 10,
           top: 20,
           background: "#48546D",
           padding: 10
         },
         hide: {
           display: 'none'
         },
         header: {
           marginTop: "0px",
           background: "F0DE92"
         }
       };

       componentDidMount = () => {
        this.setState({
          ...this.state,
          filtered: this.filterLocations(this.state.all, ""),
        });
      }
      // Error Handling
      // https://medium.com/@sgroff04/2-minutes-to-learn-react-16s-componentdidcatch-lifecycle-method-d1a69a1f753
      componentDidCatch(error, errorInfo) {
        alert('Google maps could not be loaded. Please, try again.')
        console.log(error)
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
         <div className="App" id="main">
           <div id="map" role="application">
           <div style={{height: '100%'}}></div>
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
