import React from 'react'
import PropTypes from 'prop-types'

import EcosystemHeader from '../IndicatorsTab/EcosystemHeader'

// import IndicatorChart from '../IndicatorsTab/IndicatorChart'
import CategoricalIndicatorChart from './CategoricalIndicatorChart'
import IndicatorDetails from '../IndicatorsTab/IndicatorDetails'
import { IndicatorPropType } from '../../CustomPropTypes'
import ECOSYSTEMS from '../../config/ecosystems.json'

const getIcon = ecosystemID => `/icons/${ecosystemID}.svg`

const Ecosystem = ({
    ecosystemID, selectedIndicator, percent, indicators, onSelectIndicator, onDeselectIndicator
}) => {
    const ecosystemConfig = ECOSYSTEMS[ecosystemID]
    const { label } = ecosystemConfig

    if (selectedIndicator !== null) {
        return (
            <IndicatorDetails
                ecosystemLabel={label}
                ecosystemIcon={getIcon(ecosystemID)}
                {...selectedIndicator}
                isMobile={false}
                onBackClick={onDeselectIndicator}
            />
        )
    }

    const indicatorsConfig = ecosystemConfig.indicators

    // Merge constants with dynamic data
    const mergedIndicators = Object.keys(indicators || {})
        .sort()
        .map(indicator =>
            Object.assign(
                {
                    id: indicator,
                    valueLabel: indicatorsConfig[indicator].valueLabels[indicators[indicator].value]
                },
                indicatorsConfig[indicator],
                indicators[indicator]
            ))

    return (
        <div className="ecosystem">
            <EcosystemHeader icon={getIcon(ecosystemID)} label={label} percent={percent} />

            <div className="indicators-container">
                {mergedIndicators.length > 0 ? (
                    mergedIndicators.map(indicator => (
                        <CategoricalIndicatorChart
                            key={indicator.id}
                            {...indicator}
                            onClick={() => onSelectIndicator(indicator)}
                        />
                    ))
                ) : (
                    <div className="no-indicators">Ecosystem does not have any indicators</div>
                )}
            </div>
        </div>
    )
}

Ecosystem.propTypes = {
    ecosystemID: PropTypes.string.isRequired,
    onSelectIndicator: PropTypes.func.isRequired,
    onDeselectIndicator: PropTypes.func.isRequired,

    indicators: PropTypes.objectOf(PropTypes.objectOf(PropTypes.number)),
    percent: PropTypes.number,
    selectedIndicator: IndicatorPropType
}

Ecosystem.defaultProps = {
    percent: null, // some ecosystems don't have a percent
    selectedIndicator: null,
    indicators: null
}

export default Ecosystem
