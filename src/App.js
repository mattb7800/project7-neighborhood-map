import React, { Component } from 'react';
import './App.css';
import poi from './data/poi.json';
import MyMap from './components/MyMap';


class App extends Component {
  state = {
    lat: 34.1015,
    lon: -84.5194,
    zoom: 12,
    all: poi
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
          poi={this.state.all}>
        </MyMap>
      </div>
    );
  }
}

export default App;
