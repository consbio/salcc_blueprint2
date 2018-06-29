import React from 'react'
import PropTypes from 'prop-types'

import LabeledPercentBar from '../Charts/LabeledPercentBar'

const IndicatorDetails = ({
    label, description, valueLabels, percent, ecosystemIcon, onBackClick
}) => {
    const handleBackClick = (event) => {
        event.preventDefault()
        onBackClick()
    }

    const percents = Object.keys(valueLabels).map((value, i) => ({
        value,
        label: valueLabels[value],
        percent: percent[i]
    }))
    percents.reverse()

    return (
        <React.Fragment>
            <div
                id="IndicatorDetailsHeader"
                className="ecosystem-header flex-container flex-justify-start flex-align-center"
                onClick={handleBackClick}
            >
                <a href="">&lt;&lt;</a>
                <img src={ecosystemIcon} alt="" />
                <h3>{label}</h3>
            </div>
            <div id="IndicatorDetails" className="flex-container-column">
                <p>{description}</p>
                <div style={{ marginTop: 30 }}>
                    {percents.map(entry => (
                        <LabeledPercentBar className="text-quiet" key={entry.value} {...entry} height={6} />
                    ))}
                </div>
            </div>
        </React.Fragment>
    )
}

IndicatorDetails.propTypes = {
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    valueLabels: PropTypes.objectOf(PropTypes.string).isRequired,
    percent: PropTypes.arrayOf(PropTypes.number).isRequired,
    ecosystemIcon: PropTypes.string.isRequired,
    onBackClick: PropTypes.func.isRequired
}

export default IndicatorDetails
