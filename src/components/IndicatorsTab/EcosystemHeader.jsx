import React from 'react'
import PropTypes from 'prop-types'

import { formatPercent } from '../../utils'

const EcosystemHeader = ({ icon, label, percent }) => (
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

EcosystemHeader.propTypes = {
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    percent: PropTypes.number
}

EcosystemHeader.defaultProps = {
    percent: null // some ecosystems don't have a percent
}

export default EcosystemHeader
