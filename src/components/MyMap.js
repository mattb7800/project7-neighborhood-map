import React, {Component} from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
// info on version control for foursquare can be found at this URL
// https://developer.foursquare.com/docs/api/configuration/versioning
const MAP_KEY= 'AIzaSyBmySOqM-4Va1YaSNd-DBYy3fTdk6flm-A';
const FS_CLIENT= 'XALQZNP4VNPBEK1Q2O40S2TGFSUWSFYK4LD5GNYXQDRSYQ2S';
const FS_SECRET= 'MKI54KKLSFOSNWXWZ44JHWUDBI3CAFY2ZRBWEAKJ4S0MYZ0N';
const FS_VERSION= '20181130';

class MyMap extends Component {
  state = {
    map: null,
    markers: [],
    markerProps: [],
    activeMarker: null,
    activeMarkerProps: null,
    showInfoWindow: false
  };

  componentDidMount = () => {}

//changes number of visible markers on map once filter is applied.

  componentWillReceiveProps = (props) => {
    this.setState({firstDrop: false});

    if (this.state.markers.length !== props.pois.length) {
      this.closeInfoWindow();
      this.changeMarkersStatus(props.pois);
      this.setState({activeMarker: null});

      return;
    }

    if (!props.selectedIndex || (this.state.activeMarker &&
    (this.state.markers[props.selectedIndex] !== this.state.activeMarker))) {
      this.closeInfoWindow();
    }
    if (props.selectedIndex === null || typeof(props.selectedIndex) === 'undefined') {
      return;
    };

    this.onMarkerClick(this.state.markerProps[props.selectedIndex], this.state.markers[props.selectedIndex]);
  }

  mapReady = (props, map) => {
    this.setState({map});
    this.changeMarkersStatus(this.props.pois);
  }


// Used URL below for help setting up my markers
// https://developers.google.com/maps/documentation/javascript/markers

closeInfoWindow = () => {
  this.state.activeMarker && this.state.activeMarker.setAnimation(null);
  this.setState({showInfoWindow: false, activeMarker: null, activeMarkerProps: null});
}

getPoiInfo = (props, data) => {
  return data
  .response
  .venues
  .filter(item => item.name.includes(props.name) || props.name.includes(item.name));
}

onMarkerClick =(props, marker, e) => {
  this.closeInfoWindow();

//Good info on creating search in FourSquare api
//https://developer.foursquare.com/docs/api/venues/search

let url = `https://api.foursquare.com/v2/venues/search?client_id=${FS_CLIENT}&client_secret=${FS_SECRET}&v=${FS_VERSION}&radius=100&ll=${props.position.lat},${props.position.lng}&llAcc=100`;

  let headers = new Headers();
  let request = new Request(url, {
    method: 'GET',
    headers
  });

  //Set up Properties for the active marker

  let activeMarkerProps;
  fetch(request)
    .then(response => response.json())
    .then(result => {
      let place= this.getPoiInfo(props, result);
      activeMarkerProps = {
        ...props,
        foursquare: place[0]
    };

    //Check for Images in results from foursquare
    if (activeMarkerProps.foursquare) {
      let url = `https://api.foursquare.com/v2/venues/${place[0].id}/photos?client_id=${FS_CLIENT}&client_secret=${FS_SECRET}&v=${FS_VERSION}`;
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
        this.setState({showInfoWindow: true, activeMarker: marker, activeMarkerProps});
      })
    } else {
      marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
      this.setState({showInfoWindow: true, activeMarker: marker, activeMarkerProps: props});
    }
  })

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
            {this.state.activeMarkerProps && this.state.activeMarkerProps.images
              ? (
                <div><img
                alt={this.state.activeMarkerProps.name + "piture of building"}
                src={this.state.activeMarkerProps.images.items[0].prefix + "120x120" + this.state.activeMarkerProps.images.items[0].suffix}/>
                <p> Image Courtesy of FourSquare</p>
                </div>
              )
              :""
            }
          </div>
        </InfoWindow>
      </Map>
    )

  }

}

export default GoogleApiWrapper({apiKey: MAP_KEY})(MyMap)
