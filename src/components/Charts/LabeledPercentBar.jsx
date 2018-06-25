import React from 'react'
import PropTypes from 'prop-types'

import PercentBar from './PercentBar'
import { formatPercent } from '../../utils'

const LabeledPercentBar = ({ label, percent }) => {
    const percentLabel = formatPercent(percent)

    return (
        <div className="chart-labeledpercentbar">
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                }}
            >
                <div>{label}</div>
                <label>{percentLabel}%</label>
            </div>
            <PercentBar {...this.props} />
        </div>
    )
}

LabeledPercentBar.propTypes = {
    label: PropTypes.string.isRequired,
    percent: PropTypes.number.isRequired
}

export default LabeledPercentBar
