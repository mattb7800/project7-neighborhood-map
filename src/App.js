import React, { Component } from 'react';
import './App.css';
import pois from './data/pois.json';
import MyMap from './components/MyMap';
import PoisList from './components/PoisList';

// poi = point of interest //
class App extends Component {
  state = {
    lat: 34.101318,
    lon: -84.519379,
    zoom: 12,
    all: pois,
    filtered: null,
    open: false
  }

  componentDidMount = () => {
    this.setState({
      ...this.state,
      filtered: this.filterPois(this.state.all, '')
    });
  }

styles = {
  menuButton: {
    marginLeft: 5,
    marginRight: 20,
    position: 'absolute',
    left: 10,
    top: 10,
    background: 'white',
    padding: 10
  },
  hide: {
    display: 'none',
  },
  header: {
    marginTop: '5px'
  }
};



updateQuery = (query) => {
  this.setState({
    ...this.state,
    selectedIndex: null,
    filtered: this.filterPois(this.state.all, query)
  });
}

filterPois =(pois, query) => {
  return pois.filter(poi => poi.name.toLowerCase().includes(query.toLowerCase()));
}

selectPoi = (index) => {

  this.setState({selectedIndex: index, open: !this.state.open})
}

displayList = () => {
  this.setState({
    open: !this.state.open
  });
}
  render() {
    return (
      <div className="App">
        <div>
          <button onClick={this.displayList} style = {this.styles.menuButton}>
            <i className='fa fa-bars'></i>
          </button>
          <h1>Things To Do Near Woodstock, GA</h1>
        </div>
        <MyMap
          lat={this.state.lat}
          lon={this.state.lon}
          zoom={this.state.zoom}
          selectPoi={this.selectPoi}
          selectedIndex={this.state.selectedIndex}
          pois={this.state.filtered}/>
          <PoisList
          pois = {this.state.filtered}
          open =  {this.state.open}
          filterPois={this.updateQuery}
          selectPoi={this.selectPoi}
          displayList = {this.displayList}/>



      </div>
    );
  }
}

export default App;
