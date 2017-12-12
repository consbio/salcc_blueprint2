import React, {Component} from 'react';
// import PropTypes from 'prop-types';

import WhiskerPlot from './Charts/WhiskerPlot.js';


class Indicator extends Component {
    render() {
        console.log('render', this.props)
        const {label, mean, domain} = this.props;

        let bgColor = 'rgba(204, 204, 199, 0.2)';
        let color = '#777';

        return (
            <section className="indicator" style={{backgroundColor: bgColor}} onClick={this.props.onClick}>
                <h4>
                    {/*only if not mobile version*/}
                    {/*<a href={`https://salcc.databasin.org/datasets/${datasetID}`} target="_blank" title="View this indicator in the Conservation Planning Atlas">*/}
                        {/*{label}*/}
                    {/*</a>*/}
                    {label}
                </h4>
                <WhiskerPlot value={mean} domain={domain} color={color}/>
            </section>
        );
    }
}

// Indicator.propTypes = {};
// Indicator.defaultProps = {};

export default Indicator;
