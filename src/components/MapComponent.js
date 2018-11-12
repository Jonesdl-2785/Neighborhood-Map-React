import React, { Component } from 'react';
import { Map, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import NoMapDisplay from './NoMapDisplay';

const MAP_KEY = "AIzaSyDnhUagyTDjkYrn1LE_He1k_33eOjBOA-g";
const CLIENT_ID = "AZ30DSQHOMZTZLHWUD55U54GUUDWZRAQW0D2DLFWAEPPW51H";
const CLIENT_SECRET = "3H0LURYGH1EB1WTIO3WSN4M5YF35ZCGEKSEEQ2KTU5FV1RYS";
const VERSION = "20181103";
const errorMsg = "";
// const endPoint = "https://api.foursquare.com/v2/venues/explore?"

class MapComponent extends Component {
  state = {
    // Create a map variable
    map: null,
    // Create a new blank array for all the listing markers.
    markers: [],
    markerProps: [],
    activeMarker: null,
    activeMarkerProps: null,
    showingInfoWindow: false
  };



  componentDidMount = () => {
    fetch('"https://maps.googleapis.com/maps/api/js?key=AIzaSyDnhUagyTDjkYrn1LE_He1k_33eOjBOA-g&v=3&callback=initMap')
  }

  componentWillReceiveProps(props) {
    this.setState({ firstDrop: false });

    // Do not update input if it's not dynamic
    if (this.state.markers.length !== props.locations.length) {
        this.closeInfoWindow();
        this.updateMarkers(props.locations);
        this.setState({activeMarker: null});
        return;
    }

    //  Get options to compare
    // const prevOptions = this.state.options;
    // const options = typeof input === 'function' ? input(props) : input;

    // Ignore when options are not changed
    if (!props.selectedLocation || (this.state.activeMarker &&
        (this.state.markers[props.selectedLocation] !== this.state.activeMarker))) {
        this.closeInfoWindow();
    }

    if (props.selectedLocation === null || typeof(props.selectedLocation) === 'undefined') {
      return;
    }

    // Initialize with new options
    this.onMarkerClick(this.state.markerProps[props.selectedLocation], this.state.markers[props.selectedLocation]);
  }

  mapReady = (props, map) => {
    this.setState({map});
    this.updateMarkers(this.props.locations);
  }

  closeInfoWindow = () => {
    this.state.activeMarker && this
        .state
        .activeMarker
        .setAnimation(null);
    this.setState({showingInfoWindow: false,
                  activeMarker: null,
                  activeMarkerProps: null});
  }

  getBusinessData = (props, data) => {
    return data
        .response
        .venues
        .filter(item => item.name.includes(props.name) || props.name.includes(item.name));
  }

  addInfoWindow(props, marker, infowindow) {
    if (infowindow.marker !== marker) {
        this.setState.infowindow.marker = marker;
        this.setState.infowindow.setContent('<div>' + marker.name + '</div>');
        this.setState.infowindow.open(this.map, marker);
        this.setState.infowindow.addListener('closeInfoWindow', function(){
        this.setState.infowindow.setMarker= null;
      })
    }
  }

  onMarkerClick = (props, marker, event) => {
    // this.closeInfoWindow();
    if (this.state.activeMarker) {
      this.state.activeMarker.setAnimation(null);
    }

    if (marker) {
      marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
      const activeMarkerProps = this.state.markerProps[props.i];
      this.setState({
        showingInfoWindow: true,
        activeMarker: marker,
        activeMarkerProps: activeMarkerProps
      });
    }
  }

  onMarkerClick2 = (props, marker, event) => {
    this.closeInfoWindow();

    let url = `https://api.foursquare.com/v2/venues/explore?cat=restaurant&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}&radius=100&ll=${props.position.lat},${props.position.lng}&llAcc=100`;
    let headers = new Headers();
    let request = new Request(url, {
      method: 'GET',
      headers
    });

    let activeMarkerProps;
    fetch(request)
        .then(res => res.json())
        .then(result => {
          let restaurant = this.getBusinessData(props, result);
          activeMarkerProps = {
              ...props,
              foursquare: restaurant[0],
          };

          if (activeMarkerProps.foursquare) {
            let url = `https://api.foursquare.com/v2/venues/explore?${restaurant[0].id}/photos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}`;
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    activeMarkerProps = {
                      ...activeMarkerProps,
                      images: result.response.photos
                  };
                  if (this.state.activeMarker)
                      this.state.activeMarker.setAnimation(null);
                  marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
                  this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps});
                })
        } else {
            marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
            this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps});
        }
    }).catch((error) => {
        alert('Failed to fetch URL')
    })

  }

  updateMarkers = (locations) => {
    if (!locations)
        return;

    this.state.markers.forEach(marker => marker.setMap(null));

    let markerProps = [];
    let markers = locations.map((location, i) => {
      let mProps = {
        key: i,
        i,
        name: location.name,
        position: location.pos,
        url: location.url
      };
      markerProps.push(mProps);
      let animation = this.state.firstDrop ? this.props.google.maps.Animation.DROP : null;
      let marker = new this //{google.maps.Marker}
          .props
          .google
          .maps
          .Marker({position: location.pos,
                   map: this.state.map,
                   animation,
                   draggable: true});
        marker.addListener('click', () => {
          this.onMarkerClick(mProps, marker, null);
        });
        return marker;
    })

    this.setState({markers, markerProps});
  }

  render = () => {
    const style = {
      height: '100vh',
      width: '100vw'
    }
    const center = {
      lat: this.props.lat,
      lng: this.props.lng
    }

    let amProps = this.state.activeMarkerProps;

    return (
      <Map
        aria-label='map'
        google={this.props.google}
        onReady={this.mapReady}
        style={style}
        initialCenter={center}
        zoom={this.props.zoom}
        onClick={this.closeInfoWindow}>

        <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onInfoWindowClose}>
        <div>
            <h3>{amProps && amProps.name}</h3>
            {amProps && amProps.url ? (
              <a href={amProps.url}>To Site</a>
            ) : ""}
            {amProps && amProps.images ? (
              <div>
                <img
                  alt={amProps.name + ' photo'}
                  src={amProps.images.items[0].prefix + '100x100' + amProps.images.items[0].suffix}/>
                  <p>Courtesy of Foursquare</p>
              </div>
            ) : ""
          }
          {/* If an error occurs */}
          {errorMsg !== "" ? <p>Oops, that wasn't expected. Please try again.</p> : <p></p>}
        </div>
      </InfoWindow>
      <NoMapDisplay></NoMapDisplay>
    </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: MAP_KEY
})(MapComponent)
