import React, {Component} from 'react';
// import PropTypes from 'prop-types';

import WhiskerPlot from './Charts/WhiskerPlot.js';


class Indicator extends Component {
    render() {
        const {label, mean, domain, goodConditionThreshold} = this.props;

        // Color is gray if no threshold, blue if over threshold, orange otherwise
        let bgColor = 'rgba(204, 204, 199, 0.2)';
        let color = '#777';
        if (goodConditionThreshold !== null && goodConditionThreshold !== undefined) {
            if (mean >= goodConditionThreshold) {
                bgColor = 'rgba(12, 93, 165, 0.1)';
                color = '#0C5DA5';
            }
            else {
                bgColor = 'rgba(255, 133, 27, 0.1)';
                color = '#ff9500'
            }
        }

        return (
            <section className="indicator" style={{backgroundColor: bgColor}} onClick={this.props.onClick}>
                <h4>
                    {/*only if not mobile version*/}
                    {/*<a href={`https://salcc.databasin.org/datasets/${datasetID}`} target="_blank" title="View this indicator in the Conservation Planning Atlas">*/}
                        {/*{label}*/}
                    {/*</a>*/}
                    {label}
                </h4>
                <WhiskerPlot value={mean} domain={domain} color={color} goodConditionThreshold={goodConditionThreshold}/>
            </section>
        );
    }
}

// Indicator.propTypes = {};
// Indicator.defaultProps = {};

export default Indicator;
