import React from 'react'
import PropTypes from 'prop-types'

import WhiskerPlot from './Charts/WhiskerPlot'

const Indicator = ({
    label, mean, domain, onClick
}) => {
    const bgColor = 'rgba(204, 204, 199, 0.2)'
    const color = '#777'

    return (
        <section className="indicator" style={{ backgroundColor: bgColor }} onClick={onClick}>
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
