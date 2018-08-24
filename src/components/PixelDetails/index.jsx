import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as actions from '../../Actions/actions'

import Ecosystem from './Ecosystem'
import { formatNumber } from '../../utils'
import PRIORITIES from '../../config/priorities.json'

const CROSS_SYSTEM_ECOSYSTEMS = {
    FreshwaterAquatic: true,
    Landscapes: true,
    Waterscapes: true
}

const PixelDetails = ({ location, values }) => {
    if (location === null) {
        return <div className="no-indicators">Loading...</div>
    }
    if (values === null || Object.keys(values).length === 0) {
        return <div className="no-indicators">No data at this location</div>
    }

    const { latitude, longitude } = location

    // extract out indicators and split out keys
    // only keep the non-null indicators
    const indicatorData = {}
    Object.entries(values)
        .filter(([key, value]) => key.indexOf('_') !== -1 && value !== null)
        .forEach(([key, value]) => {
            const [ecosystem, indicator] = key.split('_')
            console.log('indicator', ecosystem, indicator)

            if (!indicatorData[ecosystem]) {
                indicatorData[ecosystem] = {}
            }
            indicatorData[ecosystem][indicator] = { value }
        })

    console.log('indicator data', indicatorData)

    let ecosystemIDs = Object.keys(indicatorData)
    ecosystemIDs.sort() // Sort alphabetically

    // move cross-system indicators to the end
    ecosystemIDs = ecosystemIDs
        .filter(e => !CROSS_SYSTEM_ECOSYSTEMS[e])
        .concat(ecosystemIDs.filter(e => CROSS_SYSTEM_ECOSYSTEMS[e]))

    console.log('ecosystems', ecosystemIDs)

    const blueprint = values.Blueprint || 0 // default to not a priority
    const { label: blueprintLabel, color, textColor } = PRIORITIES[blueprint]

    return (
        <div id="PixelDetails">
            <div id="SidebarHeader">
                <div className="text-quiet text-smaller text-center">
                    Details for latitude: {formatNumber(latitude, 5)}&deg;, longitude: {formatNumber(longitude, 5)}&deg;
                </div>
                <div id="SidebarHeaderInner">
                    <h2>Blueprint priority:</h2>
                    <div className="priorityColorPatch" style={{ backgroundColor: color, color: textColor }}>
                        <b>{blueprintLabel}</b>
                    </div>
                </div>
            </div>

            <div id="SidebarContent">
                <h2>Indicators</h2>
                {ecosystemIDs.length > 0 ? (
                    <div id="Ecosystems">
                        {ecosystemIDs.map(id => (
                            <Ecosystem
                                key={id}
                                ecosystemID={id}
                                indicators={indicatorData[id]}
                                onSelectIndicator={() => {}}
                                onDeselectIndicator={() => {}}
                                // onSelectIndicator={selectedIndicator => this.handleSelectIndicator(id, selectedIndicator)}
                                // onDeselectIndicator={this.handleDeselectIndicator}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="no-indicators">No indicators at this location</div>
                )}
            </div>
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

const mapStateToProps = ({ app: { pixelLocation, pixelValues } }) => ({
    location: pixelLocation,
    values: pixelValues
})

export default connect(
    mapStateToProps,
    actions
)(PixelDetails)
