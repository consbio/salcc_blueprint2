import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as actions from '../../Actions/actions'

import Ecosystem from './Ecosystem'
import { formatNumber } from '../../utils'

import PRIORITIES from '../../config/priorities.json'
import ECOSYSTEMS from '../../config/ecosystems.json'

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
            console.log('indicator', ecosystem, indicator)

            // Create a percent array similar to that for watersheds, and fill the current value as 100% of area
            const indicatorConfig = ECOSYSTEMS[ecosystem].indicators[indicator]
            const { categoricalValues } = indicatorConfig
            const indicatorValues = Array.from({ length: categoricalValues[1] - 1 }, (_, i) => i + categoricalValues[0])
            const indicatorValueIndex = indicatorValues.indexOf(value)
            const percent = new Array(categoricalValues[1] - 1).fill(0)
            percent[indicatorValues.indexOf(value)] = 100
            console.log('value', value, 'categories', categoricalValues, indicatorValues, indicatorValueIndex)
            if (!indicatorData[ecosystem]) {
                indicatorData[ecosystem] = {}
            }
            indicatorData[ecosystem][indicator] = {
                mean: value,
                percent
            }
        })

    console.log('indicator data', indicatorData)

    const ecosystemIDs = Object.keys(indicatorData)
    ecosystemIDs.sort() // Sort alphabetically, no need to split cross system indicators into a separate group below
    console.log('ecosystems', ecosystemIDs)

    const blueprint = values.Blueprint || 0 // default to not a priority
    const { label: blueprintLabel, color, textColor } = PRIORITIES[blueprint]

    return (
        <div>
            <div id="SidebarHeader">
                <div className="text-quiet text-smaller text-center">
                    Details for latitude: {formatNumber(latitude, 5)}&deg;, longitude: {formatNumber(longitude, 5)}&deg;
                </div>
                <div id="SidebarHeaderInner" className="flex-container flex-justify-center flex-align-start">
                    <div className="flex-grow">
                        <div className="priorityColorPatch" style={{ backgroundColor: color, color: textColor }}>
                            <b>{blueprintLabel}</b>
                        </div>
                    </div>
                </div>
            </div>

            <div id="SidebarContent">
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
