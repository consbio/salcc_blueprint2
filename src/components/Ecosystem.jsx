import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { range } from 'd3-array'

import { formatPercent } from '../utils'
import Indicator from './Indicator'
import IndicatorDetails from './IndicatorDetails'
import { IndicatorPropType } from '../CustomPropTypes'
import ECOSYSTEMS from '../config/ecosystems.json'


class Ecosystem extends Component {
    // handleIndicatorSelect = (indicator) => {
    //     // this.props.onSetIndicator(this.props.ecosystemID, indicator)
    //     this.props.onSelectIndicator(indicator)
    // }

    // handleIndicatorDeselect = () => {
    //     this.props.onSetIndicator(null, null)
    // }

    renderHeader = (icon, label, percent) => (
        <div className="ecosystem-header flex-container flex-justify-start flex-align-center">
            <img src={icon} alt="" />
            <h3>{label}</h3>
            {percent && (
                <div className="text-quieter text-right text-small">
                    {formatPercent(percent)}%
                    <br />
                    <span className="text-smaller">of area</span>
                </div>
            )}
        </div>
    )

    renderIndicators(indicators) {
        if (indicators.length === 0) return <div className="no-indicators">Ecosystem does not have any indicators</div>

        const { onSelectIndicator } = this.props

        return indicators.map((indicator) => {
            const handleSelectIndicator = () => onSelectIndicator(indicator)
            return (
                <Indicator key={indicator.id} {...indicator} onClick={handleSelectIndicator} />
            )
        })
    }

    render() {
        const {
            ecosystemID, icon, selectedIndicator, onDeselectIndicator
        } = this.props

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

        const { percent, indicators } = this.props
        const indicatorsConfig = ecosystemConfig.indicators
        const indicatorKeys = Object.keys(indicators || {}) // some ecosystems are present but don't have indicators
        indicatorKeys.sort()

        // Merge constants with dynamic data
        const mergedIndicators = indicatorKeys.map(indicator =>
            Object.assign({ id: indicator }, indicatorsConfig[indicator], indicators[indicator]))

        return (
            <div className="ecosystem">
                {this.renderHeader(icon, label, percent)}

                {this.renderIndicators(mergedIndicators)}
            </div>
        )
    }
}

Ecosystem.propTypes = {
    ecosystemID: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,

    indicators: PropTypes.objectOf(IndicatorPropType),
    percent: PropTypes.number,
    selectedIndicator: IndicatorPropType,
    onSelectIndicator: PropTypes.func,
    onDeselectIndicator: PropTypes.func
}

Ecosystem.defaultProps = {
    percent: null,  // some ecosystems don't have a percent
    selectedIndicator: null,
    indicators: null,
    /* eslint-disable-next-line no-console */
    onSelectIndicator: (ecosystem, indicator) => console.log('onSelectIndicator', ecosystem, indicator),
    onDeselectIndicator: () => console.log('onDeselectIndicator')
}

export default Ecosystem
