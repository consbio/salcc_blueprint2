import React, { Component } from 'react';
//import { LabelCheckbox } from 'material-ui/Checkbox';
import Whisker from './Charts/WhiskerPlot.js';
import SwipeableViews from 'react-swipeable-views';
//import PropTypes from 'prop-types';

//The number of slides has to change depending on how many Ecosystems are tied to a specific watershed.
//Odd slides background color #FFFFFF
//Even slides background color #EFF3F4
const styles = {
  slide: {
    padding: 0,
    minHeight: 425,
    color: '#fff',
  },
  slide1: {
    backgroundColor: '#Ffffff',
  },
  slide2: {
    backgroundColor: '#eff3f4',
  },
  slide3: {
    backgroundColor: '#ffffFF',
  },
};

class IndicaTabs extends Component {
  state = {
    index: 0,
  };

  handleChangeTabs = (event, value) => {
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = (index) => {
    this.setState({
      index,
    });
  };

  render() {
    const {
      index,
    } = this.state;

    return (
              <div id = "Content">
                  <h2>Watershed name</h2>
          <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
            <div style={Object.assign({}, styles.slide, styles.slide1)}>
               <div className="flex-container2">
                  <div className="flex-item2"> <img src={'/SALCC_icons/Icon-Beachanddune.svg'} height={30} alt=""/></div>
                  <div className="flex-item"> <h4>Beach and Dune</h4></div>
               </div>
               <Whisker/>
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
              <div className="flex-container2">
                  <div className="flex-item2"> <img src={'/SALCC_icons/Icon-Estuarine.svg'} height={30} alt=""/></div>
                  <div className="flex-item"> <h4>Estuarine</h4></div>
               </div>
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide3)}>
              <div className="flex-container2">
                  <div className="flex-item2"> <img src={'/SALCC_icons/Icon-Forestedwetland.svg'} height={30} alt=""/></div>
                  <div className="flex-item"> <h4>Forested Wetland</h4></div>
               </div>
            </div>
          </SwipeableViews>
                  <div id ="Footer2">
            <div className="flex-container">
              <div className={this.state.index === 0 ? 'flex-item2 active' : 'flex-item2'} onClick={()=>this.handleChangeIndex(0)}> <img src={'/SALCC_icons/Icon-Beachanddune.svg'} height={30} alt=""/></div>
              <div className={this.state.index === 1 ? 'flex-item2 active' : 'flex-item2'} onClick={()=>this.handleChangeIndex(1)}> <img src={'/SALCC_icons/Icon-Estuarine.svg'} height={30} alt=""/></div>
              <div className={this.state.index === 2 ? 'flex-item2 active' : 'flex-item2'} onClick={()=>this.handleChangeIndex(2)}> <img src={'/SALCC_icons/Icon-Forestedwetland.svg'} height={30} alt=""/></div>
            </div>
          </div>
              </div>

    );
  }
}

export default IndicaTabs;
