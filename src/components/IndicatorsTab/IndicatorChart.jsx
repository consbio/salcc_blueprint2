import React from 'react'
import PropTypes from 'prop-types'

import WhiskerPlot from '../Charts/WhiskerPlot'

const Indicator = ({
    label, mean, domain, onClick
}) => {
    const color = '#ff9500'

    return (
        <section className="indicator" onClick={onClick}>
            <h4>
                {/* only if not mobile version */}
                {/* <a href={`https://salcc.databasin.org/datasets/${datasetID}`} target="_blank" title="View this indicator in the Conservation Planning Atlas"> */}
                {/* {label} */}
                {/* </a> */}
                {label}
            </h4>
            <WhiskerPlot value={mean} domain={domain} color={color} />
        </section>
    )
}

Indicator.propTypes = {
    label: PropTypes.string.isRequired,
    mean: PropTypes.number.isRequired,
    domain: PropTypes.arrayOf(PropTypes.number).isRequired,
    onClick: PropTypes.func.isRequired
}

export default Indicator
