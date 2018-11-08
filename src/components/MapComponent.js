import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';
import { Map, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

const MAP_KEY = "AIzaSyDnhUagyTDjkYrn1LE_He1k_33eOjBOA-g";
const CLIENT_ID = "AZ30DSQHOMZTZLHWUD55U54GUUDWZRAQW0D2DLFWAEPPW51H";
const CLIENT_SECRET = "3H0LURYGH1EB1WTIO3WSN4M5YF35ZCGEKSEEQ2KTU5FV1RYS";
const VERSION = "20181103";

class MapComponent extends Component {
  state = {
    // Create a map variable
    map: null,
    // Create a new blank array for all the listing markers.
    markers: [],
    markerProps: [],
    places: [],
    currentMarker: null,
    currentMarkerProps: null,
    openInfoWindow: false
  };

  componentDidMount = () => {}

  componentWillReceiveProps = (props) => {
    this.setState({firstDrop: false});

    // Do not update input if it's not dynamic
    if (this.state.markers.length !== props.places.length) {
      this.closeInfoWindow();
      this.updateMarkers(props.places);
      this.setState({currentMarker: null});
      return;
    }

    //  Get options to compare
    // const prevOptions = this.state.options;
    // const options = typeof input === 'function' ? input(props) : input;

    // Ignore when options are not changed
    if (!props.selectedIndex || (this.state.currentMarker &&
        (this.state.markers[props.selectedIndex] !== this.state.currentMarker))) {
        this.closeInfoWindow();
    }

    if (props.selectedIndex === null || typeof(props.selectedIndex) === 'undefined') {
      return;
    };

    // Initialize with new options
    this.onMarkerClick(this.state.markerProps[props.selectedIndex], this.state.markers[props.selectedIndex]);
  }

  mapPrep = (props, map) => {
    this.setState({map});
    this.updateMarkers(this.props.places);
  }

  closeInfoWindow = () => {
    this.state.currentMarker && this
        .state
        .currentMarker
        .setAnimation(null);
    this.setState({openInfoWindow: false,
                  currentMarker: null,
                  currentMarkerProps: null});
  }

  getBusinessData = (props, data) => {
    return data
        .response
        .venues
        .filter(item => item.name.includes(props.name) || props.name.includes(item.name));
  }

  onMarkerClick = (props, marker, event) => {
    this.closeInfoWindow();

    let baseURL = `https://api.foursquare.com/v2/venues/search?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}&radius=100&11=${props.position.lat},${props.position.lng}&11Acc=100`;
    let headers = new Headers();
    let request = new Request(baseURL, {
      method: 'GET',
      headers
    });

    let currentMarkerProps;
    fetch(request)
        .then(res => res.json())
        .then(result => {
          let shops = this.getBusinessData(props, result);
          currentMarkerProps = {
              ...props,
              foursquare: shops[0]
          };

          if (currentMarkerProps.foursquare) {
            let baseURL = `https://api.foursquare.com/v2/venues/${shops[0].id}/photos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}`;
            fetch(baseURL)
                .then(res => res.json())
                .then(result => {
                    currentMarkerProps = {
                      ...currentMarkerProps,
                      images: result.res.photos
                  };

                  if (this.state.currentMarker)
                      this.state.currentMarker.setAnimation(null);
                  marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
                  this.setState({openInfoWindow: true, currentMarker: marker, currentMarkerProps});
                })
        } else {
            marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
            this.setState({openInfoWindow: true, currentMarker: marker, currentMarkerProps});
        }
    })

  }

  updateMarkers = (places) => {
    if (!places)
        return;

    this.state.markers.forEach(marker => marker.setMap(null));

    let markerProps = [];
    let markers = places.map((place, i) => {
      let mProps = {
        key: i,
        i,
        name: place.name,
        position: place.pos,
        url: place.url
      };
      markerProps.push(mProps);

      let animation = this.state.firstDrop ? this.props.google.maps.Animation.DROP : null;
      let marker = new this //{google.maps.Marker}
          .props
          .google
          .maps
          .Marker({position: place.pos,
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
      height: '100%',
      width: '100%',
      margin: '0',
      padding: '0'
    }
    const center = {
      lat: this.props.lat,
      lng: this.props.lng
    }

    let cmProps = this.state.currentMarkerProps;

    return (
      <Map
        role='application'
        aria-label='map'
        google={this.props.google}
        onReady={this.mapPrep}
        style={style}
        initialCenter={center}
        zoom={this.props.zoom}
        onClick={this.closeInfoWindow}>
      <InfoWindow
        marker={this.state.currentMarker}
        isVisible={this.state.openInfoWindow}
        onClose={this.onInfoWindowClose}>
        <div>
            <h3>{cmProps && cmProps.name}</h3>
            {cmProps && cmProps.url ? (
              <a href={cmProps.url}>Site</a>
            ) : ""}
            {cmProps && cmProps.images ? (
              <div>
                <img alt={cmProps.name + ' dessert photo'} src={cmProps.images[0].prefix + '150x150' + cmProps.images.items[0].suffix}/>
                <p>Courtesy of Foursquare</p>
              </div>
            ) : ""
          }
        </div>
      </InfoWindow>
    </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: MAP_KEY
})(MapComponent)
