import React, {Component} from 'react';
import Drawer from '@material-ui/core/Drawer'
//found info on matrial-ui for react at:
//https://material-ui.com/demos/drawers/


class PoisList extends Component {
  state = {
    open: false,
    query: ''
  }
// Good info found on setting list styles:
//https://www.w3schools.com/jsref/prop_style_liststyle.asp
  styles = {
    list: {
      width: '275',
      padding: ' 0px 20px, 0,px'
    },
    bullets: {
      listStyleType: 'none',
      padding: 0
    },
    fullList: {
      width: 'auto'
    },
    listItems: {
      marginBottom: '15px'
    },
    listLink: {
      background: 'transparent',
      border: 'none',
      color: 'black'
    },
    filterEntry: {
      border: '1px solid gray',
      padding: '3px',
      margin: '30 px 0px 10px',
      width: '100%'
    }

  };

  updateQuery = (newQuery) => {
    this.setState({query: newQuery});
    this.props.filterPois(newQuery);
  }

  render = () => {
    return (
      <div>
        <Drawer open = {this.props.open} onClose={this.props.displayList}>
          <div style = {this.styles.list}>
            <input
              style={this.styles.filterEntry}
              type='text'
              placeholder='Filter List'
              name='filter'
              onChange={e => this
                .updateQuery(e.target.value)}
              value={this.state.query} />

            <ul style={this.styles.bullets}>
              {this.props.pois && this.props.pois.map((poi,index) => {
                return (
                  <li style={this.styles.listItem} key ={index}>
                  <button style={this.styles.listLink} key ={index}>{poi.name}</button>
                  </li>
                )
              })}
            </ul>
          </div>
        </Drawer>
      </div>
    )

  }

}
export default PoisList;
