import React, { Component } from 'react';
// import './components/Geonames.css';
import Geonames from './components/Geonames';

class App extends Component {
  render() {
    return (
      <div id="Container">
          <div id="TopBar">
            <Geonames />
          </div>
      </div>
    );
  }
}

export default App;
