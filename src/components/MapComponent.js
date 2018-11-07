import React, {Component} from 'react';
// import GoogleMapReact from 'google-map-react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const ID_CLIENT = "AZ30DSQHOMZTZLHWUD55U54GUUDWZRAQW0D2DLFWAEPPW51H"
const SECRET_CLIENT = "3H0LURYGH1EB1WTIO3WSN4M5YF35ZCGEKSEEQ2KTU5FV1RYS"
const GOOGLE_MAP_API_KEY = "AIzaSyDnhUagyTDjkYrn1LE_He1k_33eOjBOA-g"
const VERSION = "20181103"

class MapComponent extends Component {
  state = {
    // TODO: Create a map variable
    map: null,
    // Create a new blank array for all the listing markers.
    markers: [],
    markerProps: [],
    currentMarker: null,
    currentMarkerProps: null,
    openInfoWindow: false
  };

  componentDidMount = () => {}

  componentWillReceiveProps(props) {
    this.setState({firstDrop: false});

    // Do not update input if it's not dynamic
    if (this.state.markers.length !== props.venues.length) {
      this.closeInfoWindow();
      this.updateMarkers(props.venues);
      this.setState({currentMarker: null});
      return;
    }

    //  Get options to compare
    // const prevOptions = this.state.options;
    // const options = typeof input === 'function' ? input(props) : input;

    // Ignore when options are not changed
    if (!props.selectedIndex || (this.state.currentMarker && (this.state.markers[props.selectedIndex] !== this.state.currentMarker))) {
      this.closeInfoWindow();
    }

    if (props.selectedIndex === null || typeof(props.selectedIndex) === 'undefined') {
      return;
    };

    // Initialize with new options
    this.onHandleMarkerClick(this.state.markerProps[props.selectedIndex], this.state.markers[props.selectedIndex]);
  }

  mapPrep = (props, map) => {
    this.setState({map});
    this.updateMarkers(this.props.venues);
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
        .res
        .venues
        .filter(item => item.name.includes(props.name) || props.name.includes(item.name));
  }

  onHandleMarkerClick = (props, marker, event) => {
    this.closeInfoWindow();

    let baseURL = `https://api.foursquare.com/v2/venues/search?client_id=${ID_CLIENT}&client_secret=${SECRET_CLIENT}&v=${VERSION}&radius=50&ll=${props.position.lat},${props.position.lng}&llAcc=50`;
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
            let baseURL = `https://api.foursquare.com/v2/venues/${shops[0].id}/photos?client_id=${ID_CLIENT}&client_secret=${SECRET_CLIENT}&v=${VERSION}`;
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

  updateMarkers = (venues) => {
    if (!venues)
        return;

    this.state.markers.forEach(marker.setMap(null));

    let markerProps = [];
    let markers = venues.map((venues, i) => {
      let mProps = {
        key: i,
        i,
        name: venue.name,
        position: venue.pos,
        url: venue.url,
      };
      markerProps.push(mProps);

      let animation = this.state.firstDrop ? this.props.google.maps.Animation.DROP : null;
      let marker = new this //{google.maps.Marker}
          .maps
          .google
          .props
          .Marker({position: venue.pos,
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
      // margin: '0',
      // padding: '0'
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
        initCenter={center}
        zoom={this.props.zoom}
        onClick={this.closeInfoWindow}>

      <Marker onClick={this.onMarkerClick} name={'Current location'}/>

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
//correct issue 
export default GoogleApiWrapper({
  apiKey: GOOGLE_MAP_API_KEY
})(MapComponent)
