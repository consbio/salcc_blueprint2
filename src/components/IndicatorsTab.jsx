import React, { Component } from 'react';
import Whisker from './Charts/WhiskerPlot.js';
import WhiskerDes from './Charts/WhiskerDescription';
import Ecosystem from './Ecosystem';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';

//The number of slides has to change depending on how many Ecosystems are tied to a specific watershed.
//Odd slides background color #FFFFFF
//Even slides background color #EFF3F4
const styles = {
    slide: {
        padding: 0,
        minHeight: 410,
        color: '#fff',
    },
    slide1: {
        backgroundColor: '#Ffffff',
    },
    slide2: {
        backgroundColor: '#eff3f4',
    }
};


/* Notes on how this component should work:
- props contain the ecosystems and indicators, their percents, and other dynamic data.

- this component has all the global data for indicators and ecosystems, this.
can be passed down to components using props

- this component is responsible for fusing together dynamic data and global data
for each indicator and ecosystem.

- this component is responsible for managing state of which

- this view is composed of a swipeable container of ecosystems that are present

- each ecosystem has one or more indicators

- each indicator is clickable to show the description.  When the description
is shown, the indicator takes over the full view underneath the ecosystem name
(all other indicators are hidden).

- tapping the indicator description reverts back to the regular view.

 */


class IndicatorsTab extends Component {

    state = {
        index: 0,
    };

    // handleChangeTabs = (event, value) => {
    //     this.setState({
    //         index: value,
    //     });
    // };

    handleChangeIndex = (index) => {
        this.setState({
            index,
        });
    };

    handleNavClick = (e, index) => {
        console.log('Nav click')
        console.log(e)
        e.stopPropagation();
        this.handleChangeIndex(index);
    };


    renderNav(){
        return Object.keys(this.props.data.ecosystems).map((ecosystemID, index)=>
            <div className={this.state.index === index ? 'flex-item2 active' : 'flex-item2'}
                 onClick={(e) => {this.handleNavClick(e, index)}}>
                <img src={'/SALCC_icons/Icon-' + ecosystemID + '.svg'} height={30} alt=""/>
            </div>
        );
    }

    renderEcosystems(){
        console.log('IndicatorsTab props:', this.props)
        return Object.keys(this.props.data.ecosystems).map((ecosystemID, index)=>
            <Ecosystem id={ecosystemID} percent={this.props.data.ecosytems[ecosystemID]}/>
        );
    }


    render(){
        const {
            index,
        } = this.state;

        return (
            <div id ="Content">
                <h2>{this.props.data.name}</h2>
                <SwipeableViews index = {index} onChangeIndex={this.handleChangeIndex}>
                   { this.renderEcosystems() }
                </SwipeableViews>
                <div id="EcosystemsNav">
                    <div className="flex-container">
                        { this.renderNav() }
                    </div>
                </div>
            </div>
        );
    }
}

IndicatorsTab.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string
    })
};

export default IndicatorsTab;
