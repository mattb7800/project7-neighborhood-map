import React, {Component} from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const MAP_KEY= 'AIzaSyBmySOqM-4Va1YaSNd-DBYy3fTdk6flm-A';

class MyMap extends Component {
  state = {
    map: null

  }

  componentDidMount = () => {

  }

  mapReady = (props, map) => {
    this.setState({map});
  }

  render = () => {
    const style = {
      width: '100%',
      height: '100%'
    }

    const center = {
      lat: this.props.lat,
      lng: this.props.lon
    }

    return (
      <Map
        role = 'application'
        aria-label = 'map'
        onReady = {this.mapReady}
        google = {this.props.google}
        zoom = {this.props.zoom}
        style = {style}
        InitCenter = {center}
        onClick = {this.closeInfoWindow}>
      </Map>
    )

  }

}

export default GoogleApiWrapper({apiKey: MAP_KEY})(MyMap)
