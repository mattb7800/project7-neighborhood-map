
import React, {Component} from 'react';

class MapUnavailable extends Component {
  state = {
    show: false,
    timeout: null
  }
//good tutorial on setting timeouts in react
// https://medium.com/@DavideRama/testing-async-setstate-in-react-settimeout-in-componentdidmount-434602abd7db
//good page on explaining use of set and clear timeout
//https://developer.mozilla.org/en-US/docs/Archive/Add-ons/Code_snippets/Timers
  componentDidMount = () => {
    let timeout = window.setTimeout(this.displayMessage, 1000);
    this.setState({timeout});

  }
  componentWillUnmount = () => {
         window.clearTimeout(this.state.timeout);
 }
 
  displayMessage = () => {
    this.setState({show: true});
  }

   render = () => {
     return (
       <div>
          {this.state.show
            ?  (
              <div>
                <h1>Error! Map Unavailable at this time</h1>
                <p> Please try again later</p>
              </div>
            )
            : (
              <div>
              <h1>Loading</h1>
              </div>
            )
          }
        </div>
     )
   }
}
export default MapUnavailable;
