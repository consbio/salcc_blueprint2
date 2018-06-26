import React from 'react'
import PropTypes from 'prop-types'

import LabeledPercentBar from './Charts/LabeledPercentBar'

const IndicatorDetails = ({
    label, description, valueLabels, percent, ecosystemLabel, ecosystemIcon, onClick
}) => {
    const handleBackClick = (event) => {
        event.preventDefault()
        onClick()
    }

    const percents = Object.keys(valueLabels).map((value, i) => ({
        value,
        label: valueLabels[value],
        percent: percent[i]
    }))
    percents.reverse()

    return (
        <div id="IndicatorDetails">
            <div
                className="ecosystem-header flex-container flex-justify-start flex-align-center"
                onClick={handleBackClick}
            >
                <a href="">&lt;&lt;</a>
                <img src={ecosystemIcon} alt="" />
                <h3>{ecosystemLabel}</h3>
            </div>

            <h3 style={{ marginTop: 10 }}>{label}</h3>
            <p>{description}</p>
            <div style={{ marginTop: 30 }}>
                {percents.map(entry => (
                    <LabeledPercentBar className="text-quiet" key={entry.value} {...entry} height={6} />
                ))}
            </div>
        </div>
    )
}

IndicatorDetails.propTypes = {
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    valueLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    percent: PropTypes.number.isRequired,
    ecosystemLabel: PropTypes.string.isRequired,
    ecosystemIcon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default IndicatorDetails
