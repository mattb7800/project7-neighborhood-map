import React, { Component } from 'react';
import './App.css';
import pois from './data/pois.json';
import MyMap from './components/MyMap';

// poi = point of interest //
class App extends Component {
  state = {
    lat: 34.101318,
    lon: -84.519379,
    zoom: 12,
    all: pois
  }

  render() {
    return (
      <div className="App">
        <div>
          <h1>Things To Do In Woodstock, GA</h1>
        </div>
        <MyMap
          lat={this.state.lat}
          lon={this.state.lon}
          zoom={this.state.zoom}
          pois={this.state.all}>
        </MyMap>
      </div>
    );
  }
}

export default App;
