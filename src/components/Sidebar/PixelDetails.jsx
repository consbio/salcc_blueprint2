import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as actions from '../../Actions/actions'

import EcosystemHeader from '../IndicatorsTab/EcosystemHeader'
// import Ecosystem from '../IndicatorsTab/Ecosystem'
import { formatNumber } from '../../utils'

import PRIORITIES from '../../config/priorities.json'
import ECOSYSTEMS from '../../config/ecosystems.json'
import ECOSYSTEM_CODES from '../../config/ecosystemCodes.json'

const getIcon = ecosystem => `/icons/${ecosystem}.svg`

const PixelDetails = ({ location, values }) => {
    if (location === null) {
        return <div>Loading...</div>
    }
    if (values === null || Object.keys(values).length === 0) {
        return <div>No data available</div>
    }

    const { latitude, longitude } = location

    // extract out indicators and split out keys
    // only keep the non-null indicators
    const indicatorData = {}
    Object.entries(values)
        .filter(([key, value]) => key.indexOf('_') !== -1 && value !== null)
        .forEach(([key, value]) => {
            const [ecosystem, indicator] = key.split('_')
            if (!indicatorData[ecosystem]) {
                indicatorData[ecosystem] = []
            }
            indicatorData[ecosystem].push({
                id: indicator,
                value
            })
        })

    console.log('indicator data', indicatorData)
    // const indicators = Object.keys(values).filter(k => k.indexOf('_') !== -1)
    // TODO: good threshold

    const blueprint = values.Blueprint || 0 // default to not a priority
    const { label: blueprintLabel, color, textColor } = PRIORITIES[blueprint]

    const ecosystemID = values.Ecosystem !== null ? ECOSYSTEM_CODES[values.Ecosystem] : null
    const ecosystemConfig = ECOSYSTEMS[ecosystemID] // TODO: cleanup
    const { label: ecosystemLabel } = ecosystemConfig
    // TODO: cross system ecosystems

    // const indicatorsConfig = ecosystemConfig.indicators

    // // Merge constants with dynamic data
    // const mergedIndicators = Object.keys(indicators || {}).sort().map(indicator =>
    //     Object.assign({ id: indicator }, indicatorsConfig[indicator], indicators[indicator]))

    return (
        <div>
            <div id="SidebarHeader">
                <div className="text-quiet text-smaller">
                    Pixel values for latitude: {formatNumber(latitude, 5)}&deg;, longitude: {formatNumber(longitude, 5)}&deg;
                </div>
                <div id="SidebarHeaderInner" className="flex-container flex-justify-center flex-align-start">
                    <div className="flex-grow">
                        <div className="priorityColorPatch" style={{ backgroundColor: color, color: textColor }}>
                            <b>{blueprintLabel}</b>
                        </div>
                    </div>
                </div>
            </div>

            {ecosystemID !== null && (
                <React.Fragment>
                    <EcosystemHeader icon={getIcon(ecosystemID)} label={ecosystemLabel} />
                </React.Fragment>
                // <Ecosystem
                //     ecosystemID={ecosystemID}
                //     showHeader
                //     icon={getIcon(ecosystemID)}
                //     // indicators={indicators}
                //     percent={null}
                //     isMobile={false}
                //     // onSelectIndicator={selectedIndicator => this.handleSelectIndicator(id, selectedIndicator)}
                //     // onDeselectIndicator={this.handleDeselectIndicator}
                // />
            )}

            {Object.entries(values).map(([k, v]) => (
                <div key={`${k}_${v}`}>
                    {k}: {v}
                </div>
            ))}
        </div>
    )
}

PixelDetails.propTypes = {
    location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired
    }),
    values: PropTypes.object
}

PixelDetails.defaultProps = {
    location: null,
    values: null // for nodata pixels
}

const mapStateToProps = ({ app: { pixelLocation, pixelValues } }) => ({ location: pixelLocation, values: pixelValues })

export default connect(
    mapStateToProps,
    actions
)(PixelDetails)
