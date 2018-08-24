import React from 'react'
import PropTypes from 'prop-types'

const CategoricalIndicatorChart = ({
    label, value, categoricalValues, goodThreshold, valueLabel, onClick
}) => {
    // construct an array of bins from minCategory to maxCategory
    const [minCategory, maxCategory] = categoricalValues
    const bins = Array.from({ length: maxCategory - minCategory }, (_, i) => i + minCategory)
    console.log(label, value, 'bins', bins)

    // if there is a good condition, colorize bins below it one color, bins above it another color
    // and current value is an intense variant of that
    const hasGoodThreshold = goodThreshold !== null
    const getBinClass = (bin) => {
        let className = bin === value ? 'current ' : ''

        if (hasGoodThreshold) {
            className += bin >= goodThreshold ? 'condition-good' : 'condition-not-good'
        }

        return className
    }

    return (
        <div className="indicator" onClick={onClick}>
            <h4>{label}</h4>
            <div className="flex-container flex-align-center">
                <label>Low</label>
                <div className="domain">
                    <div className="domain-categories flex-container">
                        {bins.map(b => (
                            <div key={`${label}-${b}`} className={`category ${getBinClass(b)}`}>
                                {b === value && <div className="marker" />}
                                {hasGoodThreshold &&
                                    b === goodThreshold && (
                                    <div className="condition-good-label text-quieter">&rarr; good condition</div>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* <div className="marker-line" style={{ left: `${percent}%` }} />
                      <div className="marker-label text-quiet" style={{ left: `${percent}%` }}>
                          avg
                      </div> */}
                </div>
                <label>High</label>
            </div>
            {valueLabel && <label className="value">Value: {valueLabel}</label>}
        </div>
    )
}

CategoricalIndicatorChart.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    categoricalValues: PropTypes.arrayOf(PropTypes.number).isRequired, // [minCategory, maxCategory]

    goodThreshold: PropTypes.number,
    valueLabel: PropTypes.string,
    onClick: PropTypes.func
}

CategoricalIndicatorChart.defaultProps = {
    goodThreshold: null,
    valueLabel: null,
    onClick: () => {}
}

export default CategoricalIndicatorChart
