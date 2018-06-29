import React from 'react'
import PropTypes from 'prop-types'

import EcosystemHeader from './EcosystemHeader'

import IndicatorChart from './IndicatorChart'
import IndicatorDetails from './IndicatorDetails'
import { IndicatorPropType } from '../../CustomPropTypes'
import ECOSYSTEMS from '../../config/ecosystems.json'

const Ecosystem = ({
    ecosystemID,
    icon,
    selectedIndicator,
    showHeader,
    percent,
    indicators,
    onSelectIndicator,
    onDeselectIndicator
}) => {
    const ecosystemConfig = ECOSYSTEMS[ecosystemID]
    const { label } = ecosystemConfig

    if (selectedIndicator !== null) {
        return (
            <IndicatorDetails
                ecosystemLabel={label}
                ecosystemIcon={icon}
                {...selectedIndicator}
                onBackClick={onDeselectIndicator}
            />
        )
    }

    const indicatorsConfig = ecosystemConfig.indicators

    // Merge constants with dynamic data
    const mergedIndicators = Object.keys(indicators || {}).sort().map(indicator =>
        Object.assign({ id: indicator }, indicatorsConfig[indicator], indicators[indicator]))

    return (
        <div className="ecosystem">
            {showHeader && <EcosystemHeader icon={icon} label={label} percent={percent} />}

            <div className="indicators-container">
                {mergedIndicators.length > 0 ? (
                    mergedIndicators.map(indicator => (
                        <IndicatorChart
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
    icon: PropTypes.string.isRequired,

    indicators: PropTypes.objectOf(IndicatorPropType),
    showHeader: PropTypes.bool,
    percent: PropTypes.number,
    selectedIndicator: IndicatorPropType,
    onSelectIndicator: PropTypes.func,
    onDeselectIndicator: PropTypes.func
}

Ecosystem.defaultProps = {
    percent: null, // some ecosystems don't have a percent
    selectedIndicator: null,
    indicators: null,
    showHeader: true,
    /* eslint-disable-next-line no-console */
    onSelectIndicator: (ecosystem, indicator) => console.log('onSelectIndicator', ecosystem, indicator),
    onDeselectIndicator: () => console.log('onDeselectIndicator')
}

export default Ecosystem
