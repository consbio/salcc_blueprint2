import React from 'react'
import PropTypes from 'prop-types'

const PercentBar = ({
    backgroundColor, color, height, percent
}) => {
    const remainder = 100 - percent
    const radius = Math.round(height / 2)

    return (
        <div
            className="chart-percentbar"
            style={{
                display: 'flex',
                flexDirection: 'row',
                height,
                backgroundColor,
                border: `1px solid ${backgroundColor}`,
                borderRadius: height
            }}
        >
            <div
                style={{
                    backgroundColor: color,
                    flexGrow: percent,
                    borderRadius: radius
                }}
            />

            {remainder > 0 && <div style={{ flexGrow: remainder }} />}
        </div>
    )
}

PercentBar.propTypes = {
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    height: PropTypes.number,
    percent: PropTypes.number
}

PercentBar.defaultProps = {
    backgroundColor: '#EEE',
    color: '#0892D0',
    height: 10,
    percent: 50 // the glass is neither half full nor half empty, but both simultaneously
}

export default PercentBar
