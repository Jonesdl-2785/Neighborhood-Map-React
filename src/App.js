import React, { Component } from 'react';
import MapComponent from './components/Map';
import FourSquareAPI from './api/venue'
import Places from './data/places.json';
import PlaceDrawer from './components/PlaceDrawer';

import './App.css';

class App extends Component {
  componentDidMount() {
    FourSquareAPI.search({
      near: 'Davidson, NC',
      query: "ice cream",
      limit: 25
    }).then(results => console.log(results));
  }
   render = () => {
     return (
       <div className="App">

         <MapComponent />
       </div>
     );
   }
 }

 export default App;
