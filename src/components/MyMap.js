import React, {Component} from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

const MAP_KEY= 'KEY;

class MyMap extends Component {
  state = {
    map: null,
    markers: [],
    markerProps: [],
    activeMarker: null,
    activeMarkerProps: null,
    showInfoWindow: false
  };

  componentDidMount = () => {
  }

  mapReady = (props, map) => {
    this.setState({map});
    this.changeMarkersStatus(this.props.pois);
  }


// Used URL below to make my markers
// https://developers.google.com/maps/documentation/javascript/markers

closeInfoWindow = () => {
  this.state.activeMarker && this.state.activeMarker.setAnimation(null);
  this.setState({showInfoWindow: false, activeMarker: null, activeMarkerProps: null});
}

onMarkerClick =(props, marker, e) => {
  this.closeInfoWindow();

  this.setState({showInfoWindow: true, activeMarker: marker, activeMarkerProps: props});
}

changeMarkersStatus = (pois) => {
    if (!pois)
      return;
    this.state.markers.forEach(marker => marker.setMap(null));


    let markerProps = [];
    let markers = pois.map((poi, index) => {
      let markProps = {
        key: index,
        index,
        name: poi.name,
        position: poi.pos,
        url: poi.url
      };

    markerProps.push(markProps);

    let animation = this.props.google.maps.Animation.DROP;
    let marker = new this.props.google.maps.Marker ({
      position:poi.pos,
      map: this.state.map,
      animation
    });
    marker.addListener('click', () => {
      this.onMarkerClick(markProps, marker, null);
    });
    return marker;

    })
    this.setState({markers, markerProps});
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


// Good info on setting up InfoWindow:
// https://github.com/fullstackreact/google-maps-react/blob/master/README.md

    return (
      <Map
        role = 'application'
        aria-label = 'map'
        onReady = {this.mapReady}
        google = {this.props.google}
        zoom = {this.props.zoom}
        style = {style}
        initialCenter = {center}
        onClick = {this.closeInfoWindow}>
        <InfoWindow
          marker = {this.state.activeMarker}
          visible = {this.state.showInfoWindow}
          onClose= {this.closeInfoWindow}>
          <div>
            <h3>{this.state.activeMarkerProps && this.state.activeMarkerProps.name}</h3>
            {this.state.activeMarkerProps && this.state.activeMarkerProps.url
                    ? ( <a href ={this.state.activeMarkerProps.url}>Visit Website</a>
                    )
                    : ""}
          </div>
        </InfoWindow>
      </Map>
    )

  }

}

export default GoogleApiWrapper({apiKey: MAP_KEY})(MyMap)
