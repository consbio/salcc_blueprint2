import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Whisker from './Charts/WhiskerPlot.js';
import WhiskerDes from './Charts/WhiskerDescription';




class Indicator extends Component {

    renderIndicatorDescription(indicatordes, name){
        return <WhiskerDes indicatordes = {this.props.data} name = {name}/>
    }


    render() {
        console.log('Indicator props:', this.props)

        return (
            <div className="indicator">




            </div>
        );
    }
}

Indicator.propTypes = {};
Indicator.defaultProps = {};

export default Indicator;
