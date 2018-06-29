import React from 'react'
import PropTypes from 'prop-types'

const Indicator = ({
    label, mean, domain, onClick
}) => {
    // const color = '#ff9500'
    /* eslint-disable-next-line no-mixed-operators */
    const percent = (100 * (mean - domain[0])) / (domain[1] - domain[0])

    return (
        <div className="indicator" onClick={onClick}>
            <h4>
                {label}
            </h4>
            <div className="flex-container flex-align-center">
                <label>Low</label>
                <div className="domain">
                    <div className="domain-line" />
                    <div className="marker" style={{ left: `${percent}%` }} />
                </div>
                <label>High</label>
            </div>
        </div>
    )
}

Indicator.propTypes = {
    label: PropTypes.string.isRequired,
    mean: PropTypes.number.isRequired,
    domain: PropTypes.arrayOf(PropTypes.number).isRequired,
    onClick: PropTypes.func.isRequired
}

export default Indicator
